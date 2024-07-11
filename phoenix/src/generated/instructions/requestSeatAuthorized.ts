/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { PHOENIX_V1_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type RequestSeatAuthorizedInstruction<
  TProgram extends string = typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountPhoenixProgram extends string | IAccountMeta<string> = string,
  TAccountLogAuthority extends string | IAccountMeta<string> = string,
  TAccountMarket extends string | IAccountMeta<string> = string,
  TAccountMarketAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountTrader extends string | IAccountMeta<string> = string,
  TAccountSeat extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPhoenixProgram extends string
        ? ReadonlyAccount<TAccountPhoenixProgram>
        : TAccountPhoenixProgram,
      TAccountLogAuthority extends string
        ? ReadonlyAccount<TAccountLogAuthority>
        : TAccountLogAuthority,
      TAccountMarket extends string
        ? WritableAccount<TAccountMarket>
        : TAccountMarket,
      TAccountMarketAuthority extends string
        ? ReadonlySignerAccount<TAccountMarketAuthority> &
            IAccountSignerMeta<TAccountMarketAuthority>
        : TAccountMarketAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountTrader extends string
        ? ReadonlyAccount<TAccountTrader>
        : TAccountTrader,
      TAccountSeat extends string
        ? WritableAccount<TAccountSeat>
        : TAccountSeat,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type RequestSeatAuthorizedInstructionData = { discriminator: number };

export type RequestSeatAuthorizedInstructionDataArgs = {};

export function getRequestSeatAuthorizedInstructionDataEncoder(): Encoder<RequestSeatAuthorizedInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 105 })
  );
}

export function getRequestSeatAuthorizedInstructionDataDecoder(): Decoder<RequestSeatAuthorizedInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getRequestSeatAuthorizedInstructionDataCodec(): Codec<
  RequestSeatAuthorizedInstructionDataArgs,
  RequestSeatAuthorizedInstructionData
> {
  return combineCodec(
    getRequestSeatAuthorizedInstructionDataEncoder(),
    getRequestSeatAuthorizedInstructionDataDecoder()
  );
}

export type RequestSeatAuthorizedInput<
  TAccountPhoenixProgram extends string = string,
  TAccountLogAuthority extends string = string,
  TAccountMarket extends string = string,
  TAccountMarketAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountTrader extends string = string,
  TAccountSeat extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  /** Phoenix program */
  phoenixProgram: Address<TAccountPhoenixProgram>;
  /** Phoenix log authority */
  logAuthority: Address<TAccountLogAuthority>;
  /** This account holds the market state */
  market: Address<TAccountMarket>;
  /** The market_authority account must sign to request a seat on behalf of a trader */
  marketAuthority: TransactionSigner<TAccountMarketAuthority>;
  payer: TransactionSigner<TAccountPayer>;
  trader: Address<TAccountTrader>;
  seat: Address<TAccountSeat>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getRequestSeatAuthorizedInstruction<
  TAccountPhoenixProgram extends string,
  TAccountLogAuthority extends string,
  TAccountMarket extends string,
  TAccountMarketAuthority extends string,
  TAccountPayer extends string,
  TAccountTrader extends string,
  TAccountSeat extends string,
  TAccountSystemProgram extends string,
>(
  input: RequestSeatAuthorizedInput<
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    TAccountMarketAuthority,
    TAccountPayer,
    TAccountTrader,
    TAccountSeat,
    TAccountSystemProgram
  >
): RequestSeatAuthorizedInstruction<
  typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountPhoenixProgram,
  TAccountLogAuthority,
  TAccountMarket,
  TAccountMarketAuthority,
  TAccountPayer,
  TAccountTrader,
  TAccountSeat,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = PHOENIX_V1_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    phoenixProgram: { value: input.phoenixProgram ?? null, isWritable: false },
    logAuthority: { value: input.logAuthority ?? null, isWritable: false },
    market: { value: input.market ?? null, isWritable: true },
    marketAuthority: {
      value: input.marketAuthority ?? null,
      isWritable: false,
    },
    payer: { value: input.payer ?? null, isWritable: true },
    trader: { value: input.trader ?? null, isWritable: false },
    seat: { value: input.seat ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.phoenixProgram),
      getAccountMeta(accounts.logAuthority),
      getAccountMeta(accounts.market),
      getAccountMeta(accounts.marketAuthority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.trader),
      getAccountMeta(accounts.seat),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getRequestSeatAuthorizedInstructionDataEncoder().encode({}),
  } as RequestSeatAuthorizedInstruction<
    typeof PHOENIX_V1_PROGRAM_ADDRESS,
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    TAccountMarketAuthority,
    TAccountPayer,
    TAccountTrader,
    TAccountSeat,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedRequestSeatAuthorizedInstruction<
  TProgram extends string = typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Phoenix program */
    phoenixProgram: TAccountMetas[0];
    /** Phoenix log authority */
    logAuthority: TAccountMetas[1];
    /** This account holds the market state */
    market: TAccountMetas[2];
    /** The market_authority account must sign to request a seat on behalf of a trader */
    marketAuthority: TAccountMetas[3];
    payer: TAccountMetas[4];
    trader: TAccountMetas[5];
    seat: TAccountMetas[6];
    /** System program */
    systemProgram: TAccountMetas[7];
  };
  data: RequestSeatAuthorizedInstructionData;
};

export function parseRequestSeatAuthorizedInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedRequestSeatAuthorizedInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      phoenixProgram: getNextAccount(),
      logAuthority: getNextAccount(),
      market: getNextAccount(),
      marketAuthority: getNextAccount(),
      payer: getNextAccount(),
      trader: getNextAccount(),
      seat: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getRequestSeatAuthorizedInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}