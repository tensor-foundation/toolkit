import {
  Token,
  fetchToken,
  findAssociatedTokenPda,
} from '@solana-program/token';
import { Account, none, some } from '@solana/web3.js';
import {
  TOKEN22_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createDefaultSolanaClient,
  generateKeyPairSignerWithSol,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  Metadata,
  TokenStandard,
  createDefaultNft,
  createDefaultNftInCollection,
  fetchMetadata,
} from '../src/index.js';

const nftSetup = async () => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const authority = await generateKeyPairSignerWithSol(client);
  const owner = await generateKeyPairSignerWithSol(client);
  return { client, payer, authority, owner };
};

test('it can mint a NonFungible', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  // Mint a NonFungible.
  const { mint, metadata } = await createDefaultNft({
    client,
    payer,
    authority,
    owner: owner.address,
  });

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: none(),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});

test('it can mint a Token22 NonFungible', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  // Mint a Token22 NonFungible.
  const { mint, metadata } = await createDefaultNft({
    client,
    payer,
    authority,
    owner: owner.address,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: none(),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN22_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});

test('it can mint a ProgrammableNonFungible', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  // Mint a ProgrammableNonFungible.
  const { mint, metadata } = await createDefaultNft({
    client,
    payer,
    authority,
    owner: owner.address,
    standard: TokenStandard.ProgrammableNonFungible,
  });

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: none(),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});

test('it can mint a Token22 ProgrammableNonFungible', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  // Mint a Token22 ProgrammableNonFungible.
  const { mint, metadata } = await createDefaultNft({
    client,
    payer,
    authority,
    owner: owner.address,
    standard: TokenStandard.ProgrammableNonFungible,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: none(),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN22_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});

test('it can mint a NonFungible in a collection', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  // Mint a NonFungible.
  const { collection, item } = await createDefaultNftInCollection({
    client,
    payer,
    authority,
    owner: owner.address,
  });

  const { mint: collectionMint } = collection;
  const { mint, metadata } = item;

  // Check the item metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: some({ verified: true, key: collectionMint }),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});

test('it can mint a ProgrammableNonFungible in a collection', async (t) => {
  const { client, payer, authority, owner } = await nftSetup();

  const { collection, item } = await createDefaultNftInCollection({
    client,
    payer,
    authority,
    owner: owner.address,
    standard: TokenStandard.ProgrammableNonFungible,
  });

  const { mint: collectionMint } = collection;
  const { mint, metadata } = item;

  // Check the item metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: some({ verified: true, key: collectionMint }),
    },
  }));

  // Check the mint is owned by the correct program.
  const mintAccount = await client.rpc
    .getAccountInfo(mint, { encoding: 'base64' })
    .send();
  t.assert(mintAccount?.value?.owner == TOKEN_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner: owner.address,
    tokenProgram: TOKEN_PROGRAM_ID,
  });
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n,
    },
  });
});
