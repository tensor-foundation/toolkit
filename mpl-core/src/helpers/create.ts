/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/return-await */
import {
  Address,
  appendTransactionMessageInstruction,
  generateKeyPairSigner,
  KeyPairSigner,
  pipe,
} from '@solana/web3.js';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import {
  CreatorArgs,
  DataState,
  getCreateCollectionV1Instruction,
  getCreateV2Instruction,
  PluginAuthorityPairArgs,
  RoyaltiesArgs,
} from '../generated';

export interface AssetData {
  name: string;
  symbol: string;
  uri: string;
}

export interface CollectionData {
  name: string;
  uri: string;
}

export interface Asset {
  address: Address;
  data: AssetData;
}

export interface Collection {
  address: Address;
  data: CollectionData;
}

// Create a default NFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the asset.
export const createDefaultAsset = async (
  client: Client,
  payer: KeyPairSigner,
  updateAuthority: Address,
  owner: Address
): Promise<Asset> => {
  const asset_kp = await generateKeyPairSigner();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ix = getCreateV2Instruction({
    asset: asset_kp,
    payer: payer,
    owner,
    updateAuthority,
    dataState: DataState.AccountState,
    name: 'TestAsset',
    uri: 'https://example.com/nft',
    plugins: null,
    externalPluginAdapters: null,
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(ix, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  const asset: Asset = {
    address: asset_kp.address,
    data: { name: 'TestAsset', symbol: 'TA', uri: 'https://example.com/nft' },
  };

  return asset;
};

export const createDefaultCollection = async (
  client: Client,
  payer: KeyPairSigner,
  updateAuthority: Address
): Promise<Collection> => {
  const collection_kp = await generateKeyPairSigner();

  const creators: [CreatorArgs] = [
    {
      address: updateAuthority,
      percentage: 100,
    },
  ];

  const royalties: [RoyaltiesArgs] = [
    {
      basisPoints: 500,
      creators,
      ruleSet: {
        __kind: 'None',
      },
    },
  ];

  // eslint-disable-next-line prefer-const
  const plugins: PluginAuthorityPairArgs = {
    plugin: {
      __kind: 'Royalties',
      fields: royalties,
    },
    authority: { __kind: 'UpdateAuthority' },
  };

  const createCollectionIx = getCreateCollectionV1Instruction({
    collection: collection_kp,
    payer,
    name: 'TestCollection',
    uri: 'https://example.com/collection',
    plugins: [plugins],
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(createCollectionIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return {
    address: collection_kp.address,
    data: { name: 'TestCollection', uri: 'https://example.com/collection' },
  };
};

export const createDefaultAssetWithCollection = async (
  client: Client,
  payer: KeyPairSigner,
  updateAuthority: Address,
  owner: Address
): Promise<[Asset, Collection]> => {
  const collection = await createDefaultCollection(
    client,
    payer,
    updateAuthority
  );
  const asset = await createDefaultAsset(client, payer, updateAuthority, owner);

  return [asset, collection];
};
