import { Address, KeyPairSigner, appendTransactionMessageInstruction, createTransactionMessage, generateKeyPairSigner, pipe, setTransactionMessageFeePayerSigner, setTransactionMessageLifetimeUsingBlockhash } from '@solana/web3.js';
import { getCreateAccountInstruction } from '@solana-program/system';
import { findTreeAuthorityPda, getConcurrentMerkleTreeAccountSize } from './helpers';
import { ACCOUNT_COMPRESSION_PROGRAM_ID, NOOP_PROGRAM_ID, Client, signAndSendTransaction } from '@tensor-foundation/test-helpers';
import { getCreateTreeInstruction } from '../generated';

type DepthSizePair = {
    maxDepth: number,
    maxBufferSize: number,
}

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
        lamports: await client.rpc.getMinimumBalanceForRentExemption(BigInt(space)).send(),
        space: space,
        programAddress: ACCOUNT_COMPRESSION_PROGRAM_ID,
    });
    const [treeAuthority, _bump] = await findTreeAuthorityPda({ merkleTree });
    const createTreeIx = getCreateTreeInstruction(
        {
            merkleTree,
            treeAuthority,
            treeCreator: treeOwner,
            payer: treeOwner,
            logWrapper: NOOP_PROGRAM_ID,
            compressionProgram: ACCOUNT_COMPRESSION_PROGRAM_ID,
            maxBufferSize: depthSizePair.maxBufferSize,
            maxDepth: depthSizePair.maxDepth,
            public: false,
        }
    );
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
        (tx) => signAndSendTransaction(client, tx),
    );
    return merkleTree;
};