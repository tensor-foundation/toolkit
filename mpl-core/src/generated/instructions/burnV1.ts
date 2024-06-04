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
  Option,
  OptionOrNullable,
  ReadonlyAccount,
  ReadonlySignerAccount,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { MPL_CORE_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';
import {
  CompressionProof,
  CompressionProofArgs,
  getCompressionProofDecoder,
  getCompressionProofEncoder,
} from '../types';

export type BurnV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountAsset extends string | IAccountMeta<string> = string,
  TAccountCollection extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends string | IAccountMeta<string> = string,
  TAccountLogWrapper extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAsset extends string
        ? WritableAccount<TAccountAsset>
        : TAccountAsset,
      TAccountCollection extends string
        ? WritableAccount<TAccountCollection>
        : TAccountCollection,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountLogWrapper extends string
        ? ReadonlyAccount<TAccountLogWrapper>
        : TAccountLogWrapper,
      ...TRemainingAccounts,
    ]
  >;

export type BurnV1InstructionData = {
  discriminator: number;
  compressionProof: Option<CompressionProof>;
};

export type BurnV1InstructionDataArgs = {
  compressionProof: OptionOrNullable<CompressionProofArgs>;
};

export function getBurnV1InstructionDataEncoder(): Encoder<BurnV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['compressionProof', getOptionEncoder(getCompressionProofEncoder())],
    ]),
    (value) => ({ ...value, discriminator: 12 })
  );
}

export function getBurnV1InstructionDataDecoder(): Decoder<BurnV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['compressionProof', getOptionDecoder(getCompressionProofDecoder())],
  ]);
}

export function getBurnV1InstructionDataCodec(): Codec<
  BurnV1InstructionDataArgs,
  BurnV1InstructionData
> {
  return combineCodec(
    getBurnV1InstructionDataEncoder(),
    getBurnV1InstructionDataDecoder()
  );
}

export type BurnV1Input<
  TAccountAsset extends string = string,
  TAccountCollection extends string = string,
  TAccountPayer extends string = string,
  TAccountAuthority extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountLogWrapper extends string = string,
> = {
  /** The address of the asset */
  asset: Address<TAccountAsset>;
  /** The collection to which the asset belongs */
  collection?: Address<TAccountCollection>;
  /** The account paying for the storage fees */
  payer: TransactionSigner<TAccountPayer>;
  /** The owner or delegate of the asset */
  authority?: TransactionSigner<TAccountAuthority>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** The SPL Noop Program */
  logWrapper?: Address<TAccountLogWrapper>;
  compressionProof: BurnV1InstructionDataArgs['compressionProof'];
};

export function getBurnV1Instruction<
  TAccountAsset extends string,
  TAccountCollection extends string,
  TAccountPayer extends string,
  TAccountAuthority extends string,
  TAccountSystemProgram extends string,
  TAccountLogWrapper extends string,
>(
  input: BurnV1Input<
    TAccountAsset,
    TAccountCollection,
    TAccountPayer,
    TAccountAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >
): BurnV1Instruction<
  typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountAsset,
  TAccountCollection,
  TAccountPayer,
  TAccountAuthority,
  TAccountSystemProgram,
  TAccountLogWrapper
> {
  // Program address.
  const programAddress = MPL_CORE_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    asset: { value: input.asset ?? null, isWritable: true },
    collection: { value: input.collection ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    logWrapper: { value: input.logWrapper ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.asset),
      getAccountMeta(accounts.collection),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.logWrapper),
    ],
    programAddress,
    data: getBurnV1InstructionDataEncoder().encode(
      args as BurnV1InstructionDataArgs
    ),
  } as BurnV1Instruction<
    typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
    TAccountAsset,
    TAccountCollection,
    TAccountPayer,
    TAccountAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >;

  return instruction;
}

export type ParsedBurnV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The address of the asset */
    asset: TAccountMetas[0];
    /** The collection to which the asset belongs */
    collection?: TAccountMetas[1] | undefined;
    /** The account paying for the storage fees */
    payer: TAccountMetas[2];
    /** The owner or delegate of the asset */
    authority?: TAccountMetas[3] | undefined;
    /** The system program */
    systemProgram?: TAccountMetas[4] | undefined;
    /** The SPL Noop Program */
    logWrapper?: TAccountMetas[5] | undefined;
  };
  data: BurnV1InstructionData;
};

export function parseBurnV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnV1Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === MPL_CORE_PROGRAM_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      asset: getNextAccount(),
      collection: getNextOptionalAccount(),
      payer: getNextAccount(),
      authority: getNextOptionalAccount(),
      systemProgram: getNextOptionalAccount(),
      logWrapper: getNextOptionalAccount(),
    },
    data: getBurnV1InstructionDataDecoder().decode(instruction.data),
  };
}