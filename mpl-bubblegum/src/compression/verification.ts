import {
  Address,
  KeyPairSigner,
  appendTransactionMessageInstruction,
  createTransactionMessage,
  getAddressEncoder,
  getU16Encoder,
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
import { MetadataArgs, getVerifyCreatorInstruction } from '../generated';
import { findTreeAuthorityPda } from './helpers';
import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system';
import { computeCreatorHash, computeDataHash } from './hashing';
import { getRootFromMerkleTreeAddress } from './tree';
import { makeLeaf } from '.';
import { getVerifyLeafInstruction } from '../account_compression';
import { getSetComputeUnitLimitInstruction } from '@solana-program/compute-budget';

export const verifyCNftCreator = async ({
  client,
  index,
  owner,
  payer,
  merkleTree,
  metadata,
  verifiedCreator,
  proof,
}: {
  client: Client;
  index: number;
  owner: Address;
  payer: KeyPairSigner;
  merkleTree: Address;
  metadata: MetadataArgs;
  verifiedCreator: KeyPairSigner;
  proof: Address[];
}) => {
  const root = new Uint8Array(
    getAddressEncoder().encode(
      await getRootFromMerkleTreeAddress(client, merkleTree)
    )
  );

  const [treeAuthority] = await findTreeAuthorityPda({ merkleTree });
  const verifyCreatorIx = getVerifyCreatorInstruction({
    merkleTree,
    treeAuthority,
    leafOwner: owner,
    leafDelegate: owner,
    payer: payer,
    creator: verifiedCreator,
    logWrapper: NOOP_PROGRAM_ID,
    compressionProgram: ACCOUNT_COMPRESSION_PROGRAM_ID,
    systemProgram: SYSTEM_PROGRAM_ADDRESS,
    root,
    creatorHash: computeCreatorHash(metadata.creators),
    dataHash: computeDataHash(
      metadata,
      new Uint8Array(getU16Encoder().encode(metadata.sellerFeeBasisPoints))
    ),
    index,
    message: metadata,
    nonce: index,
    proof,
  });

  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  await pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(verifiedCreator, tx),
    (tx) => setTransactionMessageFeePayerSigner(payer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstruction(verifyCreatorIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
  return;
};

export const verifyCNft = async ({
  client,
  index,
  owner,
  payer,
  delegate,
  merkleTree,
  metadata,
  proof,
}: {
  client: Client;
  index: number;
  owner: Address;
  payer: KeyPairSigner;
  delegate?: Address;
  merkleTree: Address;
  metadata: MetadataArgs;
  proof: Address[];
}) => {
  const root = new Uint8Array(
    getAddressEncoder().encode(
      await getRootFromMerkleTreeAddress(client, merkleTree)
    )
  );
  const { leaf, assetId } = await makeLeaf({
    index,
    owner,
    delegate,
    merkleTree,
    metadata,
  });
  const verifyLeafIx = getVerifyLeafInstruction({
    merkleTree,
    root,
    leaf: new Uint8Array(leaf),
    index,
    proof,
  });
  const cuLimitIx = getSetComputeUnitLimitInstruction({
    units: 400_000,
  });
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  await pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(payer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstruction(cuLimitIx, tx),
    (tx) => appendTransactionMessageInstruction(verifyLeafIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return { leaf, assetId };
};
