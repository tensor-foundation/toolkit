import { fetchToken, Token } from '@solana-program/token';
import { Account } from '@solana/web3.js';
import { WEN_NEW_STANDARD_PROGRAM_ADDRESS } from '@tensor-foundation/wen-new-standard';
import test from 'ava';
import {
  createGroupWithRoyalties,
  createNft,
  createWnsNftInGroup,
  deserializeExtension,
  ExtensionType,
  findExtraAccountMetaAddress,
  TOKEN22_PROGRAM_ID,
  tokenSetup,
} from '../src/index.js';

test('it can create a WNS NFT w/ royalties setup', async (t) => {
  const { client, payer, owner, authority } = await tokenSetup();

  const { group } = await createGroupWithRoyalties({
    client,
    payer,
    authority,
    owner: owner.address,
  });

  // Mint nft
  const { mint, ownerAta } = await createNft({
    client,
    owner: owner.address,
    authority,
    group,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (
    await client.rpc.getAccountInfo(mint, { encoding: 'base64' }).send()
  ).value;
  t.assert(mintAccount?.owner == TOKEN22_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n, // nothing minted yet
    },
  });

  // Metadata pointer was created correctly.
  let data = new Uint8Array(Buffer.from(String(mintAccount?.data), 'base64'));
  const metadataPointer = deserializeExtension(
    data,
    ExtensionType.MetadataPointer
  );

  t.assert(metadataPointer?.authority === authority.address);
  t.assert(metadataPointer?.metadata === mint);

  // Transfer Hook was created correctly.
  data = new Uint8Array(Buffer.from(String(mintAccount?.data), 'base64'));
  const transferHook = deserializeExtension(data, ExtensionType.TransferHook);

  t.assert(transferHook?.authority === authority.address);
  t.assert(transferHook?.programId === WEN_NEW_STANDARD_PROGRAM_ADDRESS);

  // Extra metas account was created and has correct owner and size.
  const [extraAccountMetasAccount] = await findExtraAccountMetaAddress(
    { mint },
    WEN_NEW_STANDARD_PROGRAM_ADDRESS
  );

  const extraMetasAccount = (
    await client.rpc
      .getAccountInfo(extraAccountMetasAccount, { encoding: 'base64' })
      .send()
  ).value;

  t.assert(extraMetasAccount);
  t.assert(extraMetasAccount!.owner === WEN_NEW_STANDARD_PROGRAM_ADDRESS);
});

test('create nft with createWnsNftInGroup', async (t) => {
  const { client, payer, owner, authority } = await tokenSetup();

  const { mint, ownerAta } = await createWnsNftInGroup({
    client,
    payer,
    owner: owner.address,
    authority,
  });

  // Check the mint is owned by the correct program.
  const mintAccount = (
    await client.rpc.getAccountInfo(mint, { encoding: 'base64' }).send()
  ).value;
  t.assert(mintAccount?.owner == TOKEN22_PROGRAM_ID);

  // Check the token account has correct mint, amount and owner.
  t.like(await fetchToken(client.rpc, ownerAta), <Account<Token>>{
    address: ownerAta,
    data: {
      mint,
      owner: owner.address,
      amount: 1n, // nothing minted yet
    },
  });

  // Metadata pointer was created correctly.
  let data = new Uint8Array(Buffer.from(String(mintAccount?.data), 'base64'));
  const metadataPointer = deserializeExtension(
    data,
    ExtensionType.MetadataPointer
  );

  t.assert(metadataPointer?.authority === authority.address);
  t.assert(metadataPointer?.metadata === mint);

  // Transfer Hook was created correctly.
  data = new Uint8Array(Buffer.from(String(mintAccount?.data), 'base64'));
  const transferHook = deserializeExtension(data, ExtensionType.TransferHook);

  t.assert(transferHook?.authority === authority.address);
  t.assert(transferHook?.programId === WEN_NEW_STANDARD_PROGRAM_ADDRESS);

  // Extra metas account was created and has correct owner and size.
  const [extraAccountMetasAccount] = await findExtraAccountMetaAddress(
    { mint },
    WEN_NEW_STANDARD_PROGRAM_ADDRESS
  );

  const extraMetasAccount = (
    await client.rpc
      .getAccountInfo(extraAccountMetasAccount, { encoding: 'base64' })
      .send()
  ).value;

  t.assert(extraMetasAccount);
  t.assert(extraMetasAccount!.owner === WEN_NEW_STANDARD_PROGRAM_ADDRESS);
});
