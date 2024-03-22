/* eslint-disable @typescript-eslint/no-unused-vars */
import test from 'ava';
import {
  Metadata,
  createDefaultNft,
  createDefaultSolanaClient,
  createDefaultToken22Nft,
  fetchMetadata,
  findMetadataPda,
  generateKeyPairSignerWithSol,
} from '../src/index.js';

test('it can mint a NonFungible with createDefaultNft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const mint = await createDefaultNft(client, updateAuthority, payer, payer);
  const [metadata] = await findMetadataPda({ mint });

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
    },
  }));
});

test('it can mint a NonFungible with createDefaultToken22Nft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const mint = await createDefaultToken22Nft(
    client,
    updateAuthority,
    payer,
    payer
  );
  const [metadata] = await findMetadataPda({ mint });

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
    },
  }));
});
