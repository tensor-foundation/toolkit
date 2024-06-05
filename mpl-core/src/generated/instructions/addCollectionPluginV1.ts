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
  Authority,
  AuthorityArgs,
  Plugin,
  PluginArgs,
  getAuthorityDecoder,
  getAuthorityEncoder,
  getPluginDecoder,
  getPluginEncoder,
} from '../types';

export type AddCollectionPluginV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountCollection extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountLogWrapper extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
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

export type AddCollectionPluginV1InstructionData = {
  discriminator: number;
  plugin: Plugin;
  initAuthority: Option<Authority>;
};

export type AddCollectionPluginV1InstructionDataArgs = {
  plugin: PluginArgs;
  initAuthority: OptionOrNullable<AuthorityArgs>;
};

export function getAddCollectionPluginV1InstructionDataEncoder(): Encoder<AddCollectionPluginV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['plugin', getPluginEncoder()],
      ['initAuthority', getOptionEncoder(getAuthorityEncoder())],
    ]),
    (value) => ({ ...value, discriminator: 3 })
  );
}

export function getAddCollectionPluginV1InstructionDataDecoder(): Decoder<AddCollectionPluginV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['plugin', getPluginDecoder()],
    ['initAuthority', getOptionDecoder(getAuthorityDecoder())],
  ]);
}

export function getAddCollectionPluginV1InstructionDataCodec(): Codec<
  AddCollectionPluginV1InstructionDataArgs,
  AddCollectionPluginV1InstructionData
> {
  return combineCodec(
    getAddCollectionPluginV1InstructionDataEncoder(),
    getAddCollectionPluginV1InstructionDataDecoder()
  );
}

export type AddCollectionPluginV1Input<
  TAccountCollection extends string = string,
  TAccountPayer extends string = string,
  TAccountAuthority extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountLogWrapper extends string = string,
> = {
  /** The address of the asset */
  collection: Address<TAccountCollection>;
  /** The account paying for the storage fees */
  payer: TransactionSigner<TAccountPayer>;
  /** The owner or delegate of the asset */
  authority?: TransactionSigner<TAccountAuthority>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** The SPL Noop Program */
  logWrapper?: Address<TAccountLogWrapper>;
  plugin: AddCollectionPluginV1InstructionDataArgs['plugin'];
  initAuthority: AddCollectionPluginV1InstructionDataArgs['initAuthority'];
};

export function getAddCollectionPluginV1Instruction<
  TAccountCollection extends string,
  TAccountPayer extends string,
  TAccountAuthority extends string,
  TAccountSystemProgram extends string,
  TAccountLogWrapper extends string,
>(
  input: AddCollectionPluginV1Input<
    TAccountCollection,
    TAccountPayer,
    TAccountAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >
): AddCollectionPluginV1Instruction<
  typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
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

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.collection),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.logWrapper),
    ],
    programAddress,
    data: getAddCollectionPluginV1InstructionDataEncoder().encode(
      args as AddCollectionPluginV1InstructionDataArgs
    ),
  } as AddCollectionPluginV1Instruction<
    typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
    TAccountCollection,
    TAccountPayer,
    TAccountAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >;

  return instruction;
}

export type ParsedAddCollectionPluginV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The address of the asset */
    collection: TAccountMetas[0];
    /** The account paying for the storage fees */
    payer: TAccountMetas[1];
    /** The owner or delegate of the asset */
    authority?: TAccountMetas[2] | undefined;
    /** The system program */
    systemProgram: TAccountMetas[3];
    /** The SPL Noop Program */
    logWrapper?: TAccountMetas[4] | undefined;
  };
  data: AddCollectionPluginV1InstructionData;
};

export function parseAddCollectionPluginV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddCollectionPluginV1Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
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
      collection: getNextAccount(),
      payer: getNextAccount(),
      authority: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      logWrapper: getNextOptionalAccount(),
    },
    data: getAddCollectionPluginV1InstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
