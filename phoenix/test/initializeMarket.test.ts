/* eslint-disable @typescript-eslint/no-unused-vars */
import { getMintToInstruction } from '@solana-program/token';
import { appendTransactionMessageInstruction, pipe } from '@solana/web3.js';
import {
  createAta,
  createDefaultSolanaClient,
  createDefaultTransaction,
  generateKeyPairSignerWithSol,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import test from 'ava';
import {
  findMintVaultPda,
  getLogAuthority,
  getMarketHeaderDecoder,
  getPlaceLimitOrderInstruction,
  MARKET_HEADER_SIZE,
  MarketStatus,
  MIN_MARKET_SIZE,
  PHOENIX_V1_PROGRAM_ADDRESS,
  Side,
} from '../src';
import { createDefaultMarket, requestAndApproveSeat } from './_shared';

test('it can initialize a market', async (t) => {
  const client = createDefaultSolanaClient();

  const payer = await generateKeyPairSignerWithSol(client);
  const mintAuthority = await generateKeyPairSignerWithSol(client);

  const marketCreator = await generateKeyPairSignerWithSol(client);
  const feeCollector = await generateKeyPairSignerWithSol(client);

  const market = await createDefaultMarket({
    client,
    payer,
    marketCreator,
    mintAuthority,
    feeCollector: feeCollector.address,
  });

  const account = await client.rpc
    .getAccountInfo(market.address, { encoding: 'base64' })
    .send();
  const data = Buffer.from(account.value!.data[0], 'base64');
  t.assert(data.length === Number(MIN_MARKET_SIZE + MARKET_HEADER_SIZE));

  const marketHeader = getMarketHeaderDecoder().decode(data);
  t.assert(marketHeader.baseLotSize === BigInt(1e6));
  t.assert(marketHeader.quoteLotSize === 1n);
  t.assert(Number(marketHeader.status) === MarketStatus.PostOnly);
});

test('it can submit a limit order', async (t) => {
  const client = createDefaultSolanaClient();

  const payer = await generateKeyPairSignerWithSol(client);
  const mintAuthority = await generateKeyPairSignerWithSol(client);

  const marketCreator = await generateKeyPairSignerWithSol(client);
  const feeCollector = await generateKeyPairSignerWithSol(client);

  const market = await createDefaultMarket({
    client,
    payer,
    marketCreator,
    mintAuthority,
    feeCollector: feeCollector.address,
  });

  const trader = await generateKeyPairSignerWithSol(client);
  const seat = await requestAndApproveSeat(
    client,
    market.address,
    trader.address,
    marketCreator
  );

  const baseAccount = await createAta({
    client,
    payer,
    mint: market.baseMint,
    owner: trader.address,
  });
  const quoteAccount = await createAta({
    client,
    payer,
    mint: market.quoteMint,
    owner: trader.address,
  });

  // Fund the trader's quote account.
  const mintToIx = getMintToInstruction({
    mint: market.quoteMint,
    token: quoteAccount,
    mintAuthority,
    amount: 1_000_000n,
  });

  const [logAuthority] = await getLogAuthority();

  const [baseVault] = await findMintVaultPda({
    market: market.address,
    mint: market.baseMint,
  });
  const [quoteVault] = await findMintVaultPda({
    market: market.address,
    mint: market.quoteMint,
  });

  const limitOrderIx = getPlaceLimitOrderInstruction({
    phoenixProgram: PHOENIX_V1_PROGRAM_ADDRESS,
    logAuthority,
    market: market.address,
    trader,
    seat,
    baseAccount,
    quoteAccount,
    baseVault,
    quoteVault,
    orderPacket: {
      __kind: 'PostOnly',
      side: Side.Bid,
      priceInTicks: 100,
      numBaseLots: 10,
      clientOrderId: 1,
      rejectPostOnly: false,
      useOnlyDepositedFunds: false,
      lastValidSlot: null,
      lastValidUnixTimestampInSeconds: null,
      failSilentlyOnInsufficientFunds: false,
    },
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(mintToIx, tx),
    (tx) => appendTransactionMessageInstruction(limitOrderIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  t.pass();
});
