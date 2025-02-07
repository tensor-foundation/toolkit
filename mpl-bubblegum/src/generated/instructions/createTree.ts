/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
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
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { BUBBLEGUM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const CREATE_TREE_DISCRIMINATOR = new Uint8Array([
  165, 83, 136, 142, 89, 202, 47, 220,
]);

export function getCreateTreeDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(CREATE_TREE_DISCRIMINATOR);
}

export type CreateTreeInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountTreeAuthority extends string | IAccountMeta<string> = string,
  TAccountMerkleTree extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountTreeCreator extends string | IAccountMeta<string> = string,
  TAccountLogWrapper extends string | IAccountMeta<string> = string,
  TAccountCompressionProgram extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountTreeAuthority extends string
        ? WritableAccount<TAccountTreeAuthority>
        : TAccountTreeAuthority,
      TAccountMerkleTree extends string
        ? WritableAccount<TAccountMerkleTree>
        : TAccountMerkleTree,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountTreeCreator extends string
        ? ReadonlySignerAccount<TAccountTreeCreator> &
            IAccountSignerMeta<TAccountTreeCreator>
        : TAccountTreeCreator,
      TAccountLogWrapper extends string
        ? ReadonlyAccount<TAccountLogWrapper>
        : TAccountLogWrapper,
      TAccountCompressionProgram extends string
        ? ReadonlyAccount<TAccountCompressionProgram>
        : TAccountCompressionProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CreateTreeInstructionData = {
  discriminator: ReadonlyUint8Array;
  maxDepth: number;
  maxBufferSize: number;
  public: Option<boolean>;
};

export type CreateTreeInstructionDataArgs = {
  maxDepth: number;
  maxBufferSize: number;
  public: OptionOrNullable<boolean>;
};

export function getCreateTreeInstructionDataEncoder(): Encoder<CreateTreeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['maxDepth', getU32Encoder()],
      ['maxBufferSize', getU32Encoder()],
      ['public', getOptionEncoder(getBooleanEncoder())],
    ]),
    (value) => ({ ...value, discriminator: CREATE_TREE_DISCRIMINATOR })
  );
}

export function getCreateTreeInstructionDataDecoder(): Decoder<CreateTreeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['maxDepth', getU32Decoder()],
    ['maxBufferSize', getU32Decoder()],
    ['public', getOptionDecoder(getBooleanDecoder())],
  ]);
}

export function getCreateTreeInstructionDataCodec(): Codec<
  CreateTreeInstructionDataArgs,
  CreateTreeInstructionData
> {
  return combineCodec(
    getCreateTreeInstructionDataEncoder(),
    getCreateTreeInstructionDataDecoder()
  );
}

export type CreateTreeInput<
  TAccountTreeAuthority extends string = string,
  TAccountMerkleTree extends string = string,
  TAccountPayer extends string = string,
  TAccountTreeCreator extends string = string,
  TAccountLogWrapper extends string = string,
  TAccountCompressionProgram extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  treeAuthority: Address<TAccountTreeAuthority>;
  merkleTree: Address<TAccountMerkleTree>;
  payer: TransactionSigner<TAccountPayer>;
  treeCreator: TransactionSigner<TAccountTreeCreator>;
  logWrapper: Address<TAccountLogWrapper>;
  compressionProgram: Address<TAccountCompressionProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  maxDepth: CreateTreeInstructionDataArgs['maxDepth'];
  maxBufferSize: CreateTreeInstructionDataArgs['maxBufferSize'];
  public: CreateTreeInstructionDataArgs['public'];
};

export function getCreateTreeInstruction<
  TAccountTreeAuthority extends string,
  TAccountMerkleTree extends string,
  TAccountPayer extends string,
  TAccountTreeCreator extends string,
  TAccountLogWrapper extends string,
  TAccountCompressionProgram extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BUBBLEGUM_PROGRAM_ADDRESS,
>(
  input: CreateTreeInput<
    TAccountTreeAuthority,
    TAccountMerkleTree,
    TAccountPayer,
    TAccountTreeCreator,
    TAccountLogWrapper,
    TAccountCompressionProgram,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): CreateTreeInstruction<
  TProgramAddress,
  TAccountTreeAuthority,
  TAccountMerkleTree,
  TAccountPayer,
  TAccountTreeCreator,
  TAccountLogWrapper,
  TAccountCompressionProgram,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? BUBBLEGUM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    treeAuthority: { value: input.treeAuthority ?? null, isWritable: true },
    merkleTree: { value: input.merkleTree ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    treeCreator: { value: input.treeCreator ?? null, isWritable: false },
    logWrapper: { value: input.logWrapper ?? null, isWritable: false },
    compressionProgram: {
      value: input.compressionProgram ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
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
      getAccountMeta(accounts.treeAuthority),
      getAccountMeta(accounts.merkleTree),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.treeCreator),
      getAccountMeta(accounts.logWrapper),
      getAccountMeta(accounts.compressionProgram),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getCreateTreeInstructionDataEncoder().encode(
      args as CreateTreeInstructionDataArgs
    ),
  } as CreateTreeInstruction<
    TProgramAddress,
    TAccountTreeAuthority,
    TAccountMerkleTree,
    TAccountPayer,
    TAccountTreeCreator,
    TAccountLogWrapper,
    TAccountCompressionProgram,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedCreateTreeInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    treeAuthority: TAccountMetas[0];
    merkleTree: TAccountMetas[1];
    payer: TAccountMetas[2];
    treeCreator: TAccountMetas[3];
    logWrapper: TAccountMetas[4];
    compressionProgram: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
  };
  data: CreateTreeInstructionData;
};

export function parseCreateTreeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateTreeInstruction<TProgram, TAccountMetas> {
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
      treeAuthority: getNextAccount(),
      merkleTree: getNextAccount(),
      payer: getNextAccount(),
      treeCreator: getNextAccount(),
      logWrapper: getNextAccount(),
      compressionProgram: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getCreateTreeInstructionDataDecoder().decode(instruction.data),
  };
}
