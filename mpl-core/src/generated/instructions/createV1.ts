/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getArrayDecoder,
  getArrayEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { MPL_CORE_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getDataStateDecoder,
  getDataStateEncoder,
  getPluginAuthorityPairDecoder,
  getPluginAuthorityPairEncoder,
  type DataState,
  type DataStateArgs,
  type PluginAuthorityPair,
  type PluginAuthorityPairArgs,
} from '../types';

export const CREATE_V1_DISCRIMINATOR = 0;

export function getCreateV1DiscriminatorBytes() {
  return getU8Encoder().encode(CREATE_V1_DISCRIMINATOR);
}

export type CreateV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountAsset extends string | IAccountMeta<string> = string,
  TAccountCollection extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountLogWrapper extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAsset extends string
        ? WritableSignerAccount<TAccountAsset> &
            IAccountSignerMeta<TAccountAsset>
        : TAccountAsset,
      TAccountCollection extends string
        ? WritableAccount<TAccountCollection>
        : TAccountCollection,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      TAccountUpdateAuthority extends string
        ? ReadonlyAccount<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountLogWrapper extends string
        ? ReadonlyAccount<TAccountLogWrapper>
        : TAccountLogWrapper,
      ...TRemainingAccounts,
    ]
  >;

export type CreateV1InstructionData = {
  discriminator: number;
  dataState: DataState;
  name: string;
  uri: string;
  plugins: Option<Array<PluginAuthorityPair>>;
};

export type CreateV1InstructionDataArgs = {
  dataState: DataStateArgs;
  name: string;
  uri: string;
  plugins: OptionOrNullable<Array<PluginAuthorityPairArgs>>;
};

export function getCreateV1InstructionDataEncoder(): Encoder<CreateV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['dataState', getDataStateEncoder()],
      ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      [
        'plugins',
        getOptionEncoder(getArrayEncoder(getPluginAuthorityPairEncoder())),
      ],
    ]),
    (value) => ({ ...value, discriminator: CREATE_V1_DISCRIMINATOR })
  );
}

export function getCreateV1InstructionDataDecoder(): Decoder<CreateV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['dataState', getDataStateDecoder()],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    [
      'plugins',
      getOptionDecoder(getArrayDecoder(getPluginAuthorityPairDecoder())),
    ],
  ]);
}

export function getCreateV1InstructionDataCodec(): Codec<
  CreateV1InstructionDataArgs,
  CreateV1InstructionData
> {
  return combineCodec(
    getCreateV1InstructionDataEncoder(),
    getCreateV1InstructionDataDecoder()
  );
}

export type CreateV1Input<
  TAccountAsset extends string = string,
  TAccountCollection extends string = string,
  TAccountAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountOwner extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountLogWrapper extends string = string,
> = {
  /** The address of the new asset */
  asset: TransactionSigner<TAccountAsset>;
  /** The collection to which the asset belongs */
  collection?: Address<TAccountCollection>;
  /** The authority signing for creation */
  authority?: TransactionSigner<TAccountAuthority>;
  /** The account paying for the storage fees */
  payer: TransactionSigner<TAccountPayer>;
  /** The owner of the new asset. Defaults to the authority if not present. */
  owner?: Address<TAccountOwner>;
  /** The authority on the new asset */
  updateAuthority?: Address<TAccountUpdateAuthority>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** The SPL Noop Program */
  logWrapper?: Address<TAccountLogWrapper>;
  dataState: CreateV1InstructionDataArgs['dataState'];
  name: CreateV1InstructionDataArgs['name'];
  uri: CreateV1InstructionDataArgs['uri'];
  plugins: CreateV1InstructionDataArgs['plugins'];
};

export function getCreateV1Instruction<
  TAccountAsset extends string,
  TAccountCollection extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountOwner extends string,
  TAccountUpdateAuthority extends string,
  TAccountSystemProgram extends string,
  TAccountLogWrapper extends string,
  TProgramAddress extends Address = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
>(
  input: CreateV1Input<
    TAccountAsset,
    TAccountCollection,
    TAccountAuthority,
    TAccountPayer,
    TAccountOwner,
    TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >,
  config?: { programAddress?: TProgramAddress }
): CreateV1Instruction<
  TProgramAddress,
  TAccountAsset,
  TAccountCollection,
  TAccountAuthority,
  TAccountPayer,
  TAccountOwner,
  TAccountUpdateAuthority,
  TAccountSystemProgram,
  TAccountLogWrapper
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? MPL_CORE_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    asset: { value: input.asset ?? null, isWritable: true },
    collection: { value: input.collection ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
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
      getAccountMeta(accounts.asset),
      getAccountMeta(accounts.collection),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.logWrapper),
    ],
    programAddress,
    data: getCreateV1InstructionDataEncoder().encode(
      args as CreateV1InstructionDataArgs
    ),
  } as CreateV1Instruction<
    TProgramAddress,
    TAccountAsset,
    TAccountCollection,
    TAccountAuthority,
    TAccountPayer,
    TAccountOwner,
    TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountLogWrapper
  >;

  return instruction;
}

export type ParsedCreateV1Instruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The address of the new asset */
    asset: TAccountMetas[0];
    /** The collection to which the asset belongs */
    collection?: TAccountMetas[1] | undefined;
    /** The authority signing for creation */
    authority?: TAccountMetas[2] | undefined;
    /** The account paying for the storage fees */
    payer: TAccountMetas[3];
    /** The owner of the new asset. Defaults to the authority if not present. */
    owner?: TAccountMetas[4] | undefined;
    /** The authority on the new asset */
    updateAuthority?: TAccountMetas[5] | undefined;
    /** The system program */
    systemProgram: TAccountMetas[6];
    /** The SPL Noop Program */
    logWrapper?: TAccountMetas[7] | undefined;
  };
  data: CreateV1InstructionData;
};

export function parseCreateV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateV1Instruction<TProgram, TAccountMetas> {
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
      authority: getNextOptionalAccount(),
      payer: getNextAccount(),
      owner: getNextOptionalAccount(),
      updateAuthority: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      logWrapper: getNextOptionalAccount(),
    },
    data: getCreateV1InstructionDataDecoder().decode(instruction.data),
  };
}
