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
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { PHOENIX_V1_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type CollectFeesInstruction<
  TProgram extends string = typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountPhoenixProgram extends string | IAccountMeta<string> = string,
  TAccountLogAuthority extends string | IAccountMeta<string> = string,
  TAccountMarket extends string | IAccountMeta<string> = string,
  TAccountSweeper extends string | IAccountMeta<string> = string,
  TAccountFeeRecipient extends string | IAccountMeta<string> = string,
  TAccountQuoteVault extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
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
      TAccountSweeper extends string
        ? ReadonlyAccount<TAccountSweeper>
        : TAccountSweeper,
      TAccountFeeRecipient extends string
        ? WritableAccount<TAccountFeeRecipient>
        : TAccountFeeRecipient,
      TAccountQuoteVault extends string
        ? WritableAccount<TAccountQuoteVault>
        : TAccountQuoteVault,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CollectFeesInstructionData = { discriminator: number };

export type CollectFeesInstructionDataArgs = {};

export function getCollectFeesInstructionDataEncoder(): Encoder<CollectFeesInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 108 })
  );
}

export function getCollectFeesInstructionDataDecoder(): Decoder<CollectFeesInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCollectFeesInstructionDataCodec(): Codec<
  CollectFeesInstructionDataArgs,
  CollectFeesInstructionData
> {
  return combineCodec(
    getCollectFeesInstructionDataEncoder(),
    getCollectFeesInstructionDataDecoder()
  );
}

export type CollectFeesInput<
  TAccountPhoenixProgram extends string = string,
  TAccountLogAuthority extends string = string,
  TAccountMarket extends string = string,
  TAccountSweeper extends string = string,
  TAccountFeeRecipient extends string = string,
  TAccountQuoteVault extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Phoenix program */
  phoenixProgram: Address<TAccountPhoenixProgram>;
  /** Phoenix log authority */
  logAuthority: Address<TAccountLogAuthority>;
  /** This account holds the market state */
  market: Address<TAccountMarket>;
  /** Signer of collect fees instruction */
  sweeper: Address<TAccountSweeper> | TransactionSigner<TAccountSweeper>;
  /** Fee collector quote token account */
  feeRecipient: Address<TAccountFeeRecipient>;
  /** Quote vault PDA, seeds are [b'vault', market_address, quote_mint_address] */
  quoteVault: Address<TAccountQuoteVault>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getCollectFeesInstruction<
  TAccountPhoenixProgram extends string,
  TAccountLogAuthority extends string,
  TAccountMarket extends string,
  TAccountSweeper extends string,
  TAccountFeeRecipient extends string,
  TAccountQuoteVault extends string,
  TAccountTokenProgram extends string,
>(
  input: CollectFeesInput<
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    TAccountSweeper,
    TAccountFeeRecipient,
    TAccountQuoteVault,
    TAccountTokenProgram
  >
): CollectFeesInstruction<
  typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountPhoenixProgram,
  TAccountLogAuthority,
  TAccountMarket,
  (typeof input)['sweeper'] extends TransactionSigner<TAccountSweeper>
    ? ReadonlySignerAccount<TAccountSweeper> &
        IAccountSignerMeta<TAccountSweeper>
    : TAccountSweeper,
  TAccountFeeRecipient,
  TAccountQuoteVault,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = PHOENIX_V1_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    phoenixProgram: { value: input.phoenixProgram ?? null, isWritable: false },
    logAuthority: { value: input.logAuthority ?? null, isWritable: false },
    market: { value: input.market ?? null, isWritable: true },
    sweeper: { value: input.sweeper ?? null, isWritable: false },
    feeRecipient: { value: input.feeRecipient ?? null, isWritable: true },
    quoteVault: { value: input.quoteVault ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.phoenixProgram),
      getAccountMeta(accounts.logAuthority),
      getAccountMeta(accounts.market),
      getAccountMeta(accounts.sweeper),
      getAccountMeta(accounts.feeRecipient),
      getAccountMeta(accounts.quoteVault),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getCollectFeesInstructionDataEncoder().encode({}),
  } as CollectFeesInstruction<
    typeof PHOENIX_V1_PROGRAM_ADDRESS,
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    (typeof input)['sweeper'] extends TransactionSigner<TAccountSweeper>
      ? ReadonlySignerAccount<TAccountSweeper> &
          IAccountSignerMeta<TAccountSweeper>
      : TAccountSweeper,
    TAccountFeeRecipient,
    TAccountQuoteVault,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedCollectFeesInstruction<
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
    /** Signer of collect fees instruction */
    sweeper: TAccountMetas[3];
    /** Fee collector quote token account */
    feeRecipient: TAccountMetas[4];
    /** Quote vault PDA, seeds are [b'vault', market_address, quote_mint_address] */
    quoteVault: TAccountMetas[5];
    /** Token program */
    tokenProgram: TAccountMetas[6];
  };
  data: CollectFeesInstructionData;
};

export function parseCollectFeesInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCollectFeesInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
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
      sweeper: getNextAccount(),
      feeRecipient: getNextAccount(),
      quoteVault: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getCollectFeesInstructionDataDecoder().decode(instruction.data),
  };
}
