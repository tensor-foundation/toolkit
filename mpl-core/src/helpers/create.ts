import {
  Account,
  Address,
  appendTransactionMessageInstruction,
  generateKeyPairSigner,
  KeyPairSigner,
  pipe,
  Signature,
} from '@solana/web3.js';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import {
  AssetV1,
  CollectionV1,
  Creator,
  DataState,
  fetchAssetV1,
  fetchCollectionV1,
  getCreateCollectionV1Instruction,
  getCreateV2Instruction,
  PluginAuthorityPairArgs,
  RoyaltiesArgs,
} from '../generated';

export interface CreateAssetArgs {
  client: Client;
  payer: KeyPairSigner;
  authority?: KeyPairSigner; // Sign to add to a collection
  updateAuthority?: Address; // Set update authority when not minting to a collection
  owner: Address;
  name: string;
  uri: string;
  plugins: PluginAuthorityPairArgs[] | null;
  collection?: Address;
  asset_kp?: KeyPairSigner;
}

export interface CreateAssetResult {
  signature: Signature;
  address: Address;
}

export const createAsset = async (
  args: CreateAssetArgs
): Promise<CreateAssetResult> => {
  const {
    client,
    payer,
    authority,
    updateAuthority,
    owner,
    name,
    uri,
    plugins,
    collection,
    asset_kp = await generateKeyPairSigner(),
  } = args;

  if (collection && updateAuthority)
    throw new Error('Cannot specify both collection and updateAuthority');

  const ix = getCreateV2Instruction({
    asset: asset_kp,
    payer: payer,
    owner,
    authority,
    updateAuthority,
    collection,
    dataState: DataState.AccountState,
    name,
    uri,
    plugins,
    externalPluginAdapters: null,
  });

  const signature = await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(ix, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return { signature, address: asset_kp.address };
};

export interface CreateDefaultAssetArgs {
  client: Client;
  payer: KeyPairSigner;
  authority?: KeyPairSigner;
  updateAuthority?: Address;
  owner: Address;
  royalties?: {
    creators?: Creator[];
    basisPoints?: number;
  };
  collection?: Address;
}

// Create a default NFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the asset.
export const createDefaultAsset = async (
  args: CreateDefaultAssetArgs
): Promise<Account<AssetV1, Address>> => {
  const {
    client,
    payer,
    authority,
    updateAuthority,
    owner,
    royalties,
    collection,
  } = args;

  let plugins: PluginAuthorityPairArgs[] | null = null;

  if (royalties) {
    const royaltyPlugin: [RoyaltiesArgs] = [
      {
        basisPoints: royalties.basisPoints ?? 500,
        creators: royalties.creators ?? [],
        ruleSet: {
          __kind: 'None',
        },
      },
    ];

    plugins = [
      {
        plugin: {
          __kind: 'Royalties',
          fields: royaltyPlugin,
        },
        authority: { __kind: 'UpdateAuthority' },
      },
    ];
  }

  const { address } = await createAsset({
    client,
    payer,
    authority,
    updateAuthority,
    owner,
    name: 'TestAsset',
    uri: 'https://example.com/nft',
    plugins,
    collection,
  });

  return await fetchAssetV1(client.rpc, address);
};

export interface CreateCollectionArgs {
  client: Client;
  payer: KeyPairSigner;
  updateAuthority: Address;
  plugins: PluginAuthorityPairArgs[] | null;
  collection_kp?: KeyPairSigner;
}

export interface CreateCollectionResult {
  signature: Signature;
  address: Address;
}

export const createCollection = async (
  args: CreateCollectionArgs
): Promise<CreateCollectionResult> => {
  const {
    client,
    payer,
    updateAuthority,
    plugins,
    collection_kp = await generateKeyPairSigner(),
  } = args;
  const createCollectionIx = getCreateCollectionV1Instruction({
    collection: collection_kp,
    payer,
    updateAuthority,
    name: 'TestCollection',
    uri: 'https://example.com/collection',
    plugins,
  });

  const signature = await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(createCollectionIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return { signature, address: collection_kp.address };
};

export interface CreateDefaultCollectionArgs {
  client: Client;
  payer: KeyPairSigner;
  updateAuthority: Address;
  creators?: Creator[];
  basisPoints?: number;
}

export const createDefaultCollection = async (
  args: CreateDefaultCollectionArgs
): Promise<Account<CollectionV1, Address>> => {
  const {
    client,
    payer,
    updateAuthority,
    creators = [
      {
        address: updateAuthority,
        percentage: 100,
      },
    ],
    basisPoints = 500,
  } = args;

  const royalties: [RoyaltiesArgs] = [
    {
      basisPoints,
      creators,
      ruleSet: {
        __kind: 'None',
      },
    },
  ];

  // eslint-disable-next-line prefer-const
  const plugins: PluginAuthorityPairArgs[] = [
    {
      plugin: {
        __kind: 'Royalties',
        fields: royalties,
      },
      authority: { __kind: 'UpdateAuthority' },
    },
  ];

  const { address } = await createCollection({
    client,
    payer,
    updateAuthority,
    plugins,
  });

  return await fetchCollectionV1(client.rpc, address);
};

export interface CreateDefaultAssetWithCollectionArgs {
  client: Client;
  payer: KeyPairSigner;
  collectionAuthority: KeyPairSigner;
  owner: Address;
}

export const createDefaultAssetWithCollection = async (
  args: CreateDefaultAssetWithCollectionArgs
): Promise<[Account<AssetV1, Address>, Account<CollectionV1, Address>]> => {
  const { client, payer, collectionAuthority, owner } = args;

  const collection = await createDefaultCollection({
    client,
    payer,
    updateAuthority: collectionAuthority.address,
  });

  const asset = await createDefaultAsset({
    client,
    payer,
    owner,
    authority: collectionAuthority,
    collection: collection.address,
  });

  return [asset, collection];
};
