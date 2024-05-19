import test from 'ava';
import {
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
  TOKEN_PROGRAM_ID,
  TOKEN22_PROGRAM_ID,
} from '@tensor-foundation/test-helpers';
import {
  Metadata,
  TokenStandard,
  createDefaultNft,
  createDefaultToken22Nft,
  createDefaultToken22pNft,
  createDefaultpNft,
  fetchMetadata,
} from '../src/index.js';
import { none, some } from '@solana/codecs';

test('it can mint a NonFungible with createDefaultNft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const { mint, metadata } = await createDefaultNft(
    client,
    updateAuthority,
    payer,
    payer
  );

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: none(),
    },
  }));

  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);
});

test('it can mint a Token22 NonFungible with createDefaultToken22Nft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const { mint, metadata } = await createDefaultToken22Nft(
    client,
    updateAuthority,
    payer,
    payer
  );

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: none(),
    },
  }));

  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN22_PROGRAM_ID);
});

test('it can mint a ProgrammableNonFungible with createDefaultpNft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const { mint, metadata } = await createDefaultpNft(
    client,
    updateAuthority,
    payer,
    payer
  );

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: none(),
    },
  }));

  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);
});

test('it can mint a Token22 ProgrammableNonFungible with createDefaultToken22pNft', async (t) => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const updateAuthority = await generateKeyPairSignerWithSol(client);

  const { mint, metadata } = await createDefaultToken22pNft(
    client,
    updateAuthority,
    payer,
    payer
  );

  // Then a whitelist authority was created with the correct data.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: updateAuthority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: none(),
    },
  }));

  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN22_PROGRAM_ID);
});
