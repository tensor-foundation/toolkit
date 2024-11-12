import {
  Address,
  KeyPairSigner,
  getAddressDecoder,
  none,
  some,
} from '@solana/web3.js';
import {
  Collection,
  Creator,
  MetadataArgs,
  TokenProgramVersion,
} from '../generated';
import { Client } from '@tensor-foundation/test-helpers';
import { initializeCollection } from '@tensor-foundation/mpl-token-metadata';
import {
  MerkleTree,
  makeLeaf,
  makeTree,
  mintCNft,
  sparseMerkleTreeFromLeaves,
  verifyCNft,
  verifyCNftCreator,
} from '.';

export type DepthSizePair = {
  maxDepth: number;
  maxBufferSize: number;
};
export type CompressedSetupReturn = {
  collectionMint: Address;
  merkleTree: Address;
  memTree: MerkleTree;
  root: Uint8Array;
  meta: MetadataArgs;
  leaf: Buffer;
  assetId: Address;
  proof: Address[];
};
const DEFAULT_DEPTH_SIZE = {
  maxDepth: 3,
  maxBufferSize: 8,
};
export async function setupSingleVerifiedCNFT({
  client,
  cNftOwner,
  payer,
  mintAuthority,
  collectionOwner,
  treeOwner,
  creatorKeypair,
  creator,
  treeDepthSize = DEFAULT_DEPTH_SIZE,
  canopyDepth = 0,
  leafIndex = 0,
}: {
  client: Client;
  cNftOwner: Address;
  payer?: KeyPairSigner;
  mintAuthority?: KeyPairSigner;
  collectionOwner?: KeyPairSigner;
  treeOwner?: KeyPairSigner;
  creatorKeypair: KeyPairSigner;
  creator: Creator;
  treeDepthSize?: DepthSizePair;
  canopyDepth?: number;
  leafIndex?: number;
}) {
  payer = payer ?? creatorKeypair;
  mintAuthority = mintAuthority ?? creatorKeypair;
  collectionOwner = collectionOwner ?? creatorKeypair;
  treeOwner = treeOwner ?? creatorKeypair;

  const index = leafIndex;
  const { collectionMint, metadata } = await initializeCollection({
    client,
    owner: collectionOwner.address,
    payer: payer,
    mintAuthority: mintAuthority,
    creators: [creator],
  });
  const merkleTree = await makeTree({
    client,
    treeOwner,
    canopyDepth: canopyDepth,
    depthSizePair: treeDepthSize,
  });
  const cnftMetadataArgs: MetadataArgs = {
    ...metadata,
    collection: some({
      key: collectionMint,
      verified: true,
    } as Collection),
    editionNonce: some(0),
    tokenStandard: some(0),
    uses: none(),
    creators: [{ ...creator, verified: false }],
    tokenProgramVersion: TokenProgramVersion.Original,
  };

  await mintCNft({
    client,
    merkleTree,
    metadata: cnftMetadataArgs,
    treeOwner: treeOwner,
    receiver: cNftOwner,
    unverifiedCollection: false,
  });

  const { leaf, assetId } = await makeLeaf({
    index: index,
    merkleTree,
    metadata: cnftMetadataArgs,
    owner: cNftOwner,
  });

  let memTree = sparseMerkleTreeFromLeaves([leaf], treeDepthSize.maxDepth);
  let proof = memTree.getProof(index, false, treeDepthSize.maxDepth, false);

  await verifyCNftCreator({
    client,
    index: index,
    merkleTree,
    metadata: cnftMetadataArgs,
    owner: cNftOwner,
    payer: payer,
    verifiedCreator: creatorKeypair,
    proof: proof.proof.map((proof) => {
      return getAddressDecoder().decode(new Uint8Array(proof));
    }),
  });

  const { leaf: leafWithVerifiedCreator } = await makeLeaf({
    index: index,
    merkleTree,
    metadata: {
      ...cnftMetadataArgs,
      creators: [{ ...creator, verified: true }],
    },
    owner: cNftOwner,
  });

  // Recalculate proof for leaf with verified creator
  memTree = sparseMerkleTreeFromLeaves(
    [leafWithVerifiedCreator],
    treeDepthSize.maxDepth
  );
  proof = memTree.getProof(index, false, treeDepthSize.maxDepth, false);

  await verifyCNft({
    client,
    index: index,
    merkleTree,
    metadata: {
      ...cnftMetadataArgs,
      creators: [{ ...creator, verified: true }],
    },
    owner: cNftOwner,
    payer: payer,
    proof: proof.proof.map((proof) => {
      return getAddressDecoder().decode(new Uint8Array(proof));
    }),
  });

  return {
    collectionMint,
    merkleTree,
    memTree,
    root: memTree.root,
    meta: { ...cnftMetadataArgs, creators: [{ ...creator, verified: true }] },
    leaf,
    assetId,
    proof: proof.proof.map((proof) => {
      return getAddressDecoder().decode(new Uint8Array(proof));
    }),
  };
}
