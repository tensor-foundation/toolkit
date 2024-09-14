import {
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  AssetV1,
  CollectionV1,
  createDefaultAsset,
  createDefaultAssetWithCollection,
  createDefaultCollection,
  fetchAssetPlugin,
  fetchAssetV1,
  fetchCollectionPlugin,
  fetchCollectionV1,
  PluginType,
} from '../src';

test('it can mint a basic asset', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;
  const owner = (await generateKeyPairSignerWithSol(client)).address;

  const asset = await createDefaultAsset({
    client,
    payer,
    updateAuthority,
    owner,
  });

  t.like(asset, {
    address: asset.address,
    data: {
      owner,
      updateAuthority: {
        __kind: 'Address',
        fields: [updateAuthority],
      },
    },
  });
});

test('it can mint an asset w/ royalties', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;
  const owner = (await generateKeyPairSignerWithSol(client)).address;

  const asset = await createDefaultAsset({
    client,
    payer,
    updateAuthority,
    owner,
    royalties: {
      basisPoints: 500,
      creators: [{ address: updateAuthority, percentage: 100 }],
    },
  });

  t.like(asset, {
    address: asset.address,
    data: {
      owner,
      updateAuthority: {
        __kind: 'Address',
        fields: [updateAuthority],
      },
    },
  });

  const royalties = await fetchAssetPlugin(
    client,
    asset.address,
    PluginType.Royalties
  );
  t.like(royalties, {
    __kind: 'Royalties',
    fields: [
      {
        basisPoints: 500,
        creators: [{ address: updateAuthority, percentage: 100 }],
      },
    ],
  });
});

test('it can mint a basic collection', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;

  const collection = await createDefaultCollection({
    client,
    payer,
    updateAuthority,
  });

  // Creates an empty collection.
  t.like(collection, {
    address: collection.address,
    data: {
      updateAuthority,
      numMinted: 0,
      currentSize: 0,
    },
  });

  // Has a default royalty plugin.
  const royalties = await fetchCollectionPlugin(
    client,
    collection.address,
    PluginType.Royalties
  );
  t.like(royalties, {
    __kind: 'Royalties',
    fields: [
      {
        basisPoints: 500,
        creators: [{ address: updateAuthority, percentage: 100 }],
      },
    ],
  });
});

test('it can mint a basic asset with a collection', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const collectionAuthority = await generateKeyPairSignerWithSol(client);
  const owner = (await generateKeyPairSignerWithSol(client)).address;

  const [asset, collection] = await createDefaultAssetWithCollection({
    client,
    payer,
    collectionAuthority,
    owner,
  });

  t.like(await fetchAssetV1(client.rpc, asset.address), <AssetV1>(<unknown>{
    address: asset.address,
    data: {
      owner,
      updateAuthority: {
        __kind: 'Collection',
        fields: [collection.address], // Collection is the update authority.
      },
      name: asset.data.name,
      uri: asset.data.uri,
    },
  }));

  t.like(await fetchCollectionV1(client.rpc, collection.address), <
    CollectionV1
  >(<unknown>{
    address: collection.address,
    data: {
      name: collection.data.name,
      uri: collection.data.uri,
    },
  }));

  // Has a default royalty plugin on the collection.
  const royalties = await fetchCollectionPlugin(
    client,
    collection.address,
    PluginType.Royalties
  );
  t.like(royalties, {
    __kind: 'Royalties',
    fields: [
      {
        basisPoints: 500,
        creators: [{ address: collectionAuthority.address, percentage: 100 }],
      },
    ],
  });
});
