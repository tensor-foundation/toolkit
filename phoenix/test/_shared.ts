/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCreateAccountInstruction } from '@solana-program/system';
import {
  Address,
  address,
  appendTransactionMessageInstruction,
  generateKeyPairSigner,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import {
  Client,
  createDefaultTransaction,
  createMint,
  signAndSendTransaction,
} from '@tensor-foundation/test-helpers';
import {
  findMintVaultPda,
  findSeatPda,
  getChangeSeatStatusInstruction,
  getInitializeMarketInstruction,
  getLogAuthority,
  getRequestSeatAuthorizedInstruction,
  MARKET_HEADER_SIZE,
  MIN_MARKET_SIZE,
  MIN_MARKET_SIZE_PARAMS,
  PHOENIX_V1_PROGRAM_ADDRESS,
  SeatApprovalStatus,
} from '../src';

export const NOOP_PROGRAM_ID = address(
  'noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV'
);

export interface CreateMarktArgs {
  client: Client;
  payer: TransactionSigner;
  marketCreator: TransactionSigner;
  mintAuthority: TransactionSigner;
  feeCollector?: Address;
}

export interface TestMarket {
  address: Address;
  baseMint: Address;
  quoteMint: Address;
  baseVault: Address;
  quoteVault: Address;
}

export const createDefaultMarket = async (
  args: CreateMarktArgs
): Promise<TestMarket> => {
  const {
    client,
    payer,
    marketCreator,
    mintAuthority,
    feeCollector = marketCreator.address,
  } = args;

  const market = await generateKeyPairSigner();

  // Simulate SOL mint.
  const baseMint = await createMint({
    client,
    payer,
    mintAuthority: mintAuthority.address,
    decimals: 9,
    freezeAuthority: mintAuthority.address,
  });
  // Simulate USDC mint.
  const quoteMint = await createMint({
    client,
    payer,
    mintAuthority: mintAuthority.address,
    decimals: 6,
    freezeAuthority: mintAuthority.address,
  });

  const [baseVault] = await findMintVaultPda({
    market: market.address,
    mint: baseMint,
  });
  const [quoteVault] = await findMintVaultPda({
    market: market.address,
    mint: quoteMint,
  });

  const [logAuthority] = await getLogAuthority();

  const lamports = await client.rpc
    .getMinimumBalanceForRentExemption(MIN_MARKET_SIZE + MARKET_HEADER_SIZE)
    .send();

  // Initialize the market account w/ enough data and assign it to the Phoenix program.
  const createAccountIx = getCreateAccountInstruction({
    payer,
    newAccount: market,
    lamports,
    space: MIN_MARKET_SIZE + MARKET_HEADER_SIZE,
    programAddress: PHOENIX_V1_PROGRAM_ADDRESS,
  });

  // Initialize the market.
  const createMarketIx = getInitializeMarketInstruction({
    phoenixProgram: PHOENIX_V1_PROGRAM_ADDRESS,
    logAuthority,
    market: market.address,
    marketCreator,
    baseMint,
    quoteMint,
    baseVault,
    quoteVault,
    marketSizeParams: MIN_MARKET_SIZE_PARAMS,
    numBaseLotsPerBaseUnit: 1000,
    numQuoteLotsPerQuoteUnit: 1_000_000,
    tickSizeInQuoteLotsPerBaseUnit: 5000,
    takerFeeBps: 100,
    feeCollector,
    rawBaseUnitsPerBaseUnit: null,
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(createAccountIx, tx),
    (tx) => appendTransactionMessageInstruction(createMarketIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return {
    address: market.address,
    baseMint: baseMint,
    quoteMint: quoteMint,
    baseVault: baseVault,
    quoteVault: quoteVault,
  };
};

export const requestAndApproveSeat = async (
  client: Client,
  market: Address,
  trader: Address,
  marketAuthority: TransactionSigner
): Promise<Address> => {
  const [seat] = await findSeatPda({ market, trader });

  const [logAuthority] = await getLogAuthority();

  const ix = getRequestSeatAuthorizedInstruction({
    phoenixProgram: PHOENIX_V1_PROGRAM_ADDRESS,
    market,
    seat,
    trader,
    payer: marketAuthority,
    marketAuthority,
    logAuthority,
  });

  const ix2 = getChangeSeatStatusInstruction({
    phoenixProgram: PHOENIX_V1_PROGRAM_ADDRESS,
    logAuthority,
    market,
    marketAuthority,
    seat,
    approvalStatus: SeatApprovalStatus.Approved,
  });

  await pipe(
    await createDefaultTransaction(client, marketAuthority),
    (tx) => appendTransactionMessageInstruction(ix, tx),
    (tx) => appendTransactionMessageInstruction(ix2, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return seat;
};
