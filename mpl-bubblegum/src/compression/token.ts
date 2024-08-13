import {
  Address,
  KeyPairSigner,
  appendTransactionMessageInstruction,
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  unwrapOption,
} from '@solana/web3.js';
import {
  ProgramDerivedAddress,
  getAddressEncoder,
  getProgramDerivedAddress,
  getU64Encoder,
  getUtf8Encoder,
} from '@solana/web3.js';
import {
  MetadataArgs,
  getMintToCollectionV1Instruction,
  getMintV1Instruction,
} from '../generated';
import { findTreeAuthorityPda } from './helpers';
import {
  ACCOUNT_COMPRESSION_PROGRAM_ID,
  Client,
  MPL_BUBBLEGUM_PROGRAM_ID,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  NOOP_PROGRAM_ID,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import { computeCompressedNFTHash } from './hashing';

export const makeLeaf = async ({
  index,
  owner,
  delegate,
  merkleTree,
  metadata,
}: {
  index: number;
  owner: Address;
  delegate?: Address;
  merkleTree: Address;
  metadata: MetadataArgs;
}) => {
  const nonce = BigInt(index);
  const [assetId] = await findAssetIdPda({ merkleTree, leafIndex: nonce });
  const leaf = computeCompressedNFTHash(
    assetId,
    owner,
    delegate ?? owner,
    nonce,
    metadata
  );
  return {
    leaf,
    assetId,
  };
};

export type AssetIdSeeds = {
  merkleTree: Address;
  leafIndex: number | bigint;
};

export async function findAssetIdPda(
  seeds: AssetIdSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY' as Address<'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('asset'),
      getAddressEncoder().encode(seeds.merkleTree),
      getU64Encoder().encode(seeds.leafIndex),
    ],
  });
}

export const mintCNft = async ({
  client,
  treeOwner,
  receiver,
  metadata,
  merkleTree,
  unverifiedCollection = false,
}: {
  client: Client;
  treeOwner: KeyPairSigner;
  receiver: Address;
  metadata: MetadataArgs;
  merkleTree: Address;
  unverifiedCollection?: boolean;
}) => {
  const [bgumSigner, __] = await getProgramDerivedAddress({
    programAddress: MPL_BUBBLEGUM_PROGRAM_ID,
    seeds: [Buffer.from('collection_cpi')],
  });
  const [treeAuthority] = await findTreeAuthorityPda({ merkleTree });
  const collectionKey = unwrapOption(metadata.collection)!.key;
  const mintIx =
    !!metadata.collection && !unverifiedCollection
      ? getMintToCollectionV1Instruction({
          merkleTree,
          treeAuthority,
          treeDelegate: treeOwner,
          payer: treeOwner,
          leafDelegate: receiver,
          leafOwner: receiver,
          compressionProgram: ACCOUNT_COMPRESSION_PROGRAM_ID,
          logWrapper: NOOP_PROGRAM_ID,
          bubblegumSigner: bgumSigner,
          collectionAuthority: treeOwner,
          collectionAuthorityRecordPda: MPL_BUBBLEGUM_PROGRAM_ID,
          collectionMetadata: await getMetadata(collectionKey).then(
            (resp) => resp[0]
          ),
          collectionMint: collectionKey,
          editionAccount: await getMasterEdition(collectionKey).then(
            (resp) => resp[0]
          ),
          tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
          metadataArgs: {
            ...metadata,
          },
        })
      : getMintV1Instruction({
          merkleTree,
          treeAuthority,
          treeDelegate: treeOwner,
          payer: treeOwner,
          leafDelegate: receiver,
          leafOwner: receiver,
          compressionProgram: ACCOUNT_COMPRESSION_PROGRAM_ID,
          logWrapper: NOOP_PROGRAM_ID,
          message: metadata,
        });
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  await pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(treeOwner, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => appendTransactionMessageInstruction(mintIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
};

async function getMetadata(mint: Address) {
  return await getProgramDerivedAddress({
    seeds: [
      Buffer.from('metadata'),
      getAddressEncoder().encode(MPL_TOKEN_METADATA_PROGRAM_ID),
      getAddressEncoder().encode(mint),
    ],
    programAddress: MPL_TOKEN_METADATA_PROGRAM_ID,
  });
}

async function getMasterEdition(mint: Address) {
  return await getProgramDerivedAddress({
    seeds: [
      Buffer.from('metadata'),
      getAddressEncoder().encode(MPL_TOKEN_METADATA_PROGRAM_ID),
      getAddressEncoder().encode(mint),
      Buffer.from('edition'),
    ],
    programAddress: MPL_TOKEN_METADATA_PROGRAM_ID,
  });
}
