/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  AssetV1,
  CollectionV1,
  createDefaultAssetWithCollection,
  fetchAssetV1,
  fetchCollectionV1,
} from '../src';

// eslint-disable-next-line @typescript-eslint/require-await
test('it can mint a basic Asset with a Collection', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = (await generateKeyPairSignerWithSol(client)).address;
  const owner = (await generateKeyPairSignerWithSol(client)).address;

  const [asset, collection] = await createDefaultAssetWithCollection(
    client,
    payer,
    updateAuthority,
    owner
  );

  t.like(await fetchAssetV1(client.rpc, asset.address), <AssetV1>(<unknown>{
    address: asset.address,
    data: {
      owner,
      updateAuthority: {
        __kind: 'Address',
        fields: [updateAuthority],
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
});
