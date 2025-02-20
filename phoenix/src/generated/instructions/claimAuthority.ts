/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { PHOENIX_V1_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const CLAIM_AUTHORITY_DISCRIMINATOR = 101;

export function getClaimAuthorityDiscriminatorBytes() {
  return getU8Encoder().encode(CLAIM_AUTHORITY_DISCRIMINATOR);
}

export type ClaimAuthorityInstruction<
  TProgram extends string = typeof PHOENIX_V1_PROGRAM_ADDRESS,
  TAccountPhoenixProgram extends string | IAccountMeta<string> = string,
  TAccountLogAuthority extends string | IAccountMeta<string> = string,
  TAccountMarket extends string | IAccountMeta<string> = string,
  TAccountSuccessor extends string | IAccountMeta<string> = string,
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
      TAccountSuccessor extends string
        ? ReadonlyAccount<TAccountSuccessor>
        : TAccountSuccessor,
      ...TRemainingAccounts,
    ]
  >;

export type ClaimAuthorityInstructionData = { discriminator: number };

export type ClaimAuthorityInstructionDataArgs = {};

export function getClaimAuthorityInstructionDataEncoder(): Encoder<ClaimAuthorityInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: CLAIM_AUTHORITY_DISCRIMINATOR })
  );
}

export function getClaimAuthorityInstructionDataDecoder(): Decoder<ClaimAuthorityInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getClaimAuthorityInstructionDataCodec(): Codec<
  ClaimAuthorityInstructionDataArgs,
  ClaimAuthorityInstructionData
> {
  return combineCodec(
    getClaimAuthorityInstructionDataEncoder(),
    getClaimAuthorityInstructionDataDecoder()
  );
}

export type ClaimAuthorityInput<
  TAccountPhoenixProgram extends string = string,
  TAccountLogAuthority extends string = string,
  TAccountMarket extends string = string,
  TAccountSuccessor extends string = string,
> = {
  /** Phoenix program */
  phoenixProgram: Address<TAccountPhoenixProgram>;
  /** Phoenix log authority */
  logAuthority: Address<TAccountLogAuthority>;
  /** This account holds the market state */
  market: Address<TAccountMarket>;
  /** The successor account must sign to claim authority */
  successor: Address<TAccountSuccessor> | TransactionSigner<TAccountSuccessor>;
};

export function getClaimAuthorityInstruction<
  TAccountPhoenixProgram extends string,
  TAccountLogAuthority extends string,
  TAccountMarket extends string,
  TAccountSuccessor extends string,
  TProgramAddress extends Address = typeof PHOENIX_V1_PROGRAM_ADDRESS,
>(
  input: ClaimAuthorityInput<
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    TAccountSuccessor
  >,
  config?: { programAddress?: TProgramAddress }
): ClaimAuthorityInstruction<
  TProgramAddress,
  TAccountPhoenixProgram,
  TAccountLogAuthority,
  TAccountMarket,
  (typeof input)['successor'] extends TransactionSigner<TAccountSuccessor>
    ? ReadonlySignerAccount<TAccountSuccessor> &
        IAccountSignerMeta<TAccountSuccessor>
    : TAccountSuccessor
> {
  // Program address.
  const programAddress = config?.programAddress ?? PHOENIX_V1_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    phoenixProgram: { value: input.phoenixProgram ?? null, isWritable: false },
    logAuthority: { value: input.logAuthority ?? null, isWritable: false },
    market: { value: input.market ?? null, isWritable: true },
    successor: { value: input.successor ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.phoenixProgram),
      getAccountMeta(accounts.logAuthority),
      getAccountMeta(accounts.market),
      getAccountMeta(accounts.successor),
    ],
    programAddress,
    data: getClaimAuthorityInstructionDataEncoder().encode({}),
  } as ClaimAuthorityInstruction<
    TProgramAddress,
    TAccountPhoenixProgram,
    TAccountLogAuthority,
    TAccountMarket,
    (typeof input)['successor'] extends TransactionSigner<TAccountSuccessor>
      ? ReadonlySignerAccount<TAccountSuccessor> &
          IAccountSignerMeta<TAccountSuccessor>
      : TAccountSuccessor
  >;

  return instruction;
}

export type ParsedClaimAuthorityInstruction<
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
    /** The successor account must sign to claim authority */
    successor: TAccountMetas[3];
  };
  data: ClaimAuthorityInstructionData;
};

export function parseClaimAuthorityInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedClaimAuthorityInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
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
      successor: getNextAccount(),
    },
    data: getClaimAuthorityInstructionDataDecoder().decode(instruction.data),
  };
}
