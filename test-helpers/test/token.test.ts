/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchToken, Token } from '@solana-program/token';
import { Account } from '@solana/web3.js';
import test from 'ava';
import {
  createAndMintTo,
  createDefaultSolanaClient,
  createMint,
  createMintWithMetadata,
  generateKeyPairSignerWithSol,
  TOKEN22_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '../src/index.js';

const tokenSetup = async () => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const authority = await generateKeyPairSignerWithSol(client);
  const owner = await generateKeyPairSignerWithSol(client);
  return { client, payer, authority, owner };
};

test('it can create a legacy mint', async (t) => {
  const { client, payer, authority } = await tokenSetup();

  // Create a legacy mint.
  const mint = await createMint({
    client,
    payer,
    mintAuthority: authority.address,
    freezeAuthority: null,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (await client.rpc.getAccountInfo(mint).send()).value;
  t.assert(mintAccount?.owner == TOKEN_PROGRAM_ID);
});

test('it can create a token22 mint', async (t) => {
  const { client, payer, authority } = await tokenSetup();

  // Create a legacy mint.
  const mint = await createMint({
    client,
    payer,
    mintAuthority: authority.address,
    freezeAuthority: null,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (await client.rpc.getAccountInfo(mint).send()).value;
  t.assert(mintAccount?.owner == TOKEN22_PROGRAM_ID);
});

test('it can create a legacy mint and mint to a token account', async (t) => {
  const { client, authority, owner } = await tokenSetup();

  // Create a legacy mint.
  const [{ mint }, ata] = await createAndMintTo({
    client,
    mintAuthority: authority,
    recipient: owner.address,
    initialSupply: 1n,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (await client.rpc.getAccountInfo(mint).send()).value;
  t.assert(mintAccount?.owner == TOKEN_PROGRAM_ID);

  const ownerAta = ata!;

  // Check the token account has correct mint, amount and owner.
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n, // nothing minted yet
    },
  });
});

test('it can create a token22 mint and mint to a token account', async (t) => {
  const { client, authority, owner } = await tokenSetup();

  const [{ mint }, ata] = await createAndMintTo({
    client,
    mintAuthority: authority,
    recipient: owner.address,
    initialSupply: 10n,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  const ownerAta = ata!;

  // Check the mint is owned by the correct program.
  const mintAccount = (await client.rpc.getAccountInfo(mint).send()).value;
  t.assert(mintAccount?.owner == TOKEN22_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 10n,
    },
  });
});

test('it can create a token22 mint with metadata', async (t) => {
  const { client, payer, authority } = await tokenSetup();

  // Create a legacy mint.
  const mint = await createMintWithMetadata({
    client,
    payer,
    mintAuthority: authority.address,
    freezeAuthority: null,
    decimals: 9,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (
    await client.rpc.getAccountInfo(mint, { encoding: 'base64' }).send()
  ).value;
  t.assert(mintAccount?.owner == TOKEN22_PROGRAM_ID);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = new Uint8Array(Buffer.from(String(mintAccount?.data), 'base64'));
});
