/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCreateAccountInstruction } from '@solana-program/system';
import {
  Address,
  KeyPairSigner,
  appendTransactionMessageInstruction,
  createTransactionMessage,
  generateKeyPairSigner,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
} from '@solana/web3.js';
import {
  ACCOUNT_COMPRESSION_PROGRAM_ID,
  Client,
  NOOP_PROGRAM_ID,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import { getConcurrentMerkleTreeHeaderDecoder } from '../account_compression';
import { getConcurrentMerkleTreeDecoderFactory } from '../codecs';
import { getCreateTreeInstruction } from '../generated';
import {
  findTreeAuthorityPda,
  getConcurrentMerkleTreeAccountSize,
} from './helpers';

type DepthSizePair = {
  maxDepth: number;
  maxBufferSize: number;
};

const DEFAULT_DEPTH_SIZE: DepthSizePair = {
  maxDepth: 14,
  maxBufferSize: 64,
};

export const makeTree = async ({
  client,
  treeOwner,
  depthSizePair = DEFAULT_DEPTH_SIZE,
  canopyDepth = 0,
}: {
  client: Client;
  treeOwner: KeyPairSigner;
  depthSizePair?: DepthSizePair;
  canopyDepth?: number;
}): Promise<Address> => {
  const merkleTreeKeypair = await generateKeyPairSigner();
  const merkleTree = merkleTreeKeypair.address;
  const space = getConcurrentMerkleTreeAccountSize(
    depthSizePair.maxDepth,
    depthSizePair.maxBufferSize,
    canopyDepth
  );
  const allocTreeIx = getCreateAccountInstruction({
    payer: treeOwner,
    newAccount: merkleTreeKeypair,
    lamports: await client.rpc
      .getMinimumBalanceForRentExemption(BigInt(space))
      .send(),
    space: space,
    programAddress: ACCOUNT_COMPRESSION_PROGRAM_ID,
  });
  const [treeAuthority, _bump] = await findTreeAuthorityPda({ merkleTree });
  const createTreeIx = getCreateTreeInstruction({
    merkleTree,
    treeAuthority,
    treeCreator: treeOwner,
    payer: treeOwner,
    logWrapper: NOOP_PROGRAM_ID,
    compressionProgram: ACCOUNT_COMPRESSION_PROGRAM_ID,
    maxBufferSize: depthSizePair.maxBufferSize,
    maxDepth: depthSizePair.maxDepth,
    public: false,
  });
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  await pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(merkleTreeKeypair, tx),
    (tx) => setTransactionMessageFeePayerSigner(treeOwner, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstruction(allocTreeIx, tx),
    (tx) => appendTransactionMessageInstruction(createTreeIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
  return merkleTree;
};

export async function getRootFromMerkleTreeAddress(
  client: Client,
  merkleTree: Address
): Promise<Address> {
  const merkleTreeData = await client.rpc
    .getAccountInfo(merkleTree, { encoding: 'base64' })
    .send()
    .then((result: any) => result.value.data[0]);
  const merkleTreeDataBytes = Buffer.from(merkleTreeData, 'base64');
  let currOffset = 0;
  const [merkleTreeHeader, headerOffset] =
    getConcurrentMerkleTreeHeaderDecoder().read(
      merkleTreeDataBytes,
      currOffset
    );
  currOffset = headerOffset;
  const { fields } = merkleTreeHeader.header;
  const { maxDepth, maxBufferSize } = fields[0];
  const [treeBody] = getConcurrentMerkleTreeDecoderFactory(
    maxDepth,
    maxBufferSize
  ).read(merkleTreeDataBytes, currOffset);

  const activeIndex = Number(treeBody.activeIndex);
  return treeBody.changeLogs[activeIndex].root;
}
