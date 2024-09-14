import {
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  createDefaultAsset,
  createDefaultCollection,
  fetchPluginRegistryV1,
} from '../src';

test('it can mint a basic Asset', async (t) => {
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

test.only('it can mint a basic Collection', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;
  const owner = (await generateKeyPairSignerWithSol(client)).address;

  const collection = await createDefaultCollection({
    client,
    payer,
    updateAuthority,
    owner,
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
  // const royalties = await fetchPluginHeaderV1(client.rpc, collection.address);
  const k = await fetchPluginRegistryV1(client.rpc, collection.address);
  // console.log(royalties);
  console.log(k);
});

// test('it can mint a basic Asset with a Collection', async (t) => {
//   const client = createDefaultSolanaClient();
//   const payer = await generateKeyPairSignerWithSol(client);
//   const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;
//   const owner = (await generateKeyPairSignerWithSol(client)).address;

//   const [asset, collection] = await createDefaultAssetWithCollection(
//     client,
//     payer,
//     updateAuthority,
//     owner
//   );

//   t.like(await fetchAssetV1(client.rpc, asset.address), <AssetV1>(<unknown>{
//     address: asset.address,
//     data: {
//       owner,
//       updateAuthority: {
//         __kind: 'Address',
//         fields: [updateAuthority],
//       },
//       name: asset.data.name,
//       uri: asset.data.uri,
//     },
//   }));

//   t.like(await fetchCollectionV1(client.rpc, collection.address), <
//     CollectionV1
//   >(<unknown>{
//     address: collection.address,
//     data: {
//       name: collection.data.name,
//       uri: collection.data.uri,
//     },
//   }));
// });
