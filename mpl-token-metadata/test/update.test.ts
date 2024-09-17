import {
  Token,
  fetchToken,
  findAssociatedTokenPda,
} from '@solana-program/token';
import {
  Account,
  address,
  appendTransactionMessageInstruction,
  none,
  pipe,
  some,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createDefaultSolanaClient,
  createDefaultTransaction,
  generateKeyPairSignerWithSol,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  Metadata,
  TokenStandard,
  createDefaultNft,
  fetchMetadata,
  getUpdateInstruction,
} from '../src/index.js';

const nftSetup = async () => {
  const client = createDefaultSolanaClient();
  const payer = await generateKeyPairSignerWithSol(client);
  const authority = await generateKeyPairSignerWithSol(client);
  const owner = await generateKeyPairSignerWithSol(client);
  return { client, payer, authority, owner };
};

test('it can update a NonFungible', async (t) => {
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

  // Update the metadata.
  const newUri = 'https://example.com/nft';
  const newData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: newUri,
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    primarySaleHappened: false,
    isMutable: true,
    tokenStandard: TokenStandard.NonFungible,
    collection: null,
    uses: null,
  };

  const updateIx = getUpdateInstruction({
    authority,
    mint,
    metadata,
    payer,
    updateArgs: {
      __kind: 'V1',
      newUpdateAuthority: null,
      data: newData,
      primarySaleHappened: null,
      isMutable: null,
      collection: {
        __kind: 'None',
      },
      collectionDetails: {
        __kind: 'None',
      },
      uses: {
        __kind: 'None',
      },
      ruleSet: {
        __kind: 'None',
      },
      authorizationData: null,
    },
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(updateIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.NonFungible),
      collection: none(),
      name: newData.name,
      symbol: newData.symbol,
      uri: newData.uri,
      sellerFeeBasisPoints: newData.sellerFeeBasisPoints,
      primarySaleHappened: newData.primarySaleHappened,
      isMutable: newData.isMutable,
    },
  }));
});

test('it can update a ProgrammableNonFungible', async (t) => {
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

  // Update the metadata.
  const newUri = 'https://example.com/nft';
  const newData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: newUri,
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    primarySaleHappened: false,
    isMutable: true,
    tokenStandard: TokenStandard.ProgrammableNonFungible,
    collection: null,
    uses: null,
  };

  const updateIx = getUpdateInstruction({
    authority,
    mint,
    metadata,
    payer,
    updateArgs: {
      __kind: 'V1',
      newUpdateAuthority: null,
      data: newData,
      primarySaleHappened: null,
      isMutable: null,
      collection: {
        __kind: 'None',
      },
      collectionDetails: {
        __kind: 'None',
      },
      uses: {
        __kind: 'None',
      },
      ruleSet: {
        __kind: 'None',
      },
      authorizationData: null,
    },
    authorizationRules: address('AdH2Utn6Fus15ZhtenW4hZBQnvtLgM1YCW2MfVp7pYS5'), // compatibility ruleset
    authorizationRulesProgram: address(
      'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
    ),
  });
  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(updateIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  // Check the metadata.
  t.like(await fetchMetadata(client.rpc, metadata), <Metadata>(<unknown>{
    address: metadata,
    data: {
      updateAuthority: authority.address,
      mint: mint,
      tokenStandard: some(TokenStandard.ProgrammableNonFungible),
      collection: none(),
      name: newData.name,
      symbol: newData.symbol,
      uri: newData.uri,
      sellerFeeBasisPoints: newData.sellerFeeBasisPoints,
      primarySaleHappened: newData.primarySaleHappened,
      isMutable: newData.isMutable,
    },
  }));
});
