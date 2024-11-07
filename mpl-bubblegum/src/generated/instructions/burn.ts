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
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type WritableAccount,
} from '@solana/web3.js';
import { BUBBLEGUM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const BURN_DISCRIMINATOR = new Uint8Array([
  116, 110, 29, 56, 107, 219, 42, 93,
]);

export function getBurnDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(BURN_DISCRIMINATOR);
}

export type BurnInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountTreeAuthority extends string | IAccountMeta<string> = string,
  TAccountLeafOwner extends string | IAccountMeta<string> = string,
  TAccountLeafDelegate extends string | IAccountMeta<string> = string,
  TAccountMerkleTree extends string | IAccountMeta<string> = string,
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
        ? ReadonlyAccount<TAccountTreeAuthority>
        : TAccountTreeAuthority,
      TAccountLeafOwner extends string
        ? ReadonlyAccount<TAccountLeafOwner>
        : TAccountLeafOwner,
      TAccountLeafDelegate extends string
        ? ReadonlyAccount<TAccountLeafDelegate>
        : TAccountLeafDelegate,
      TAccountMerkleTree extends string
        ? WritableAccount<TAccountMerkleTree>
        : TAccountMerkleTree,
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

export type BurnInstructionData = {
  discriminator: ReadonlyUint8Array;
  root: ReadonlyUint8Array;
  dataHash: ReadonlyUint8Array;
  creatorHash: ReadonlyUint8Array;
  nonce: bigint;
  index: number;
};

export type BurnInstructionDataArgs = {
  root: ReadonlyUint8Array;
  dataHash: ReadonlyUint8Array;
  creatorHash: ReadonlyUint8Array;
  nonce: number | bigint;
  index: number;
};

export function getBurnInstructionDataEncoder(): Encoder<BurnInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['root', fixEncoderSize(getBytesEncoder(), 32)],
      ['dataHash', fixEncoderSize(getBytesEncoder(), 32)],
      ['creatorHash', fixEncoderSize(getBytesEncoder(), 32)],
      ['nonce', getU64Encoder()],
      ['index', getU32Encoder()],
    ]),
    (value) => ({ ...value, discriminator: BURN_DISCRIMINATOR })
  );
}

export function getBurnInstructionDataDecoder(): Decoder<BurnInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['root', fixDecoderSize(getBytesDecoder(), 32)],
    ['dataHash', fixDecoderSize(getBytesDecoder(), 32)],
    ['creatorHash', fixDecoderSize(getBytesDecoder(), 32)],
    ['nonce', getU64Decoder()],
    ['index', getU32Decoder()],
  ]);
}

export function getBurnInstructionDataCodec(): Codec<
  BurnInstructionDataArgs,
  BurnInstructionData
> {
  return combineCodec(
    getBurnInstructionDataEncoder(),
    getBurnInstructionDataDecoder()
  );
}

export type BurnInput<
  TAccountTreeAuthority extends string = string,
  TAccountLeafOwner extends string = string,
  TAccountLeafDelegate extends string = string,
  TAccountMerkleTree extends string = string,
  TAccountLogWrapper extends string = string,
  TAccountCompressionProgram extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  treeAuthority: Address<TAccountTreeAuthority>;
  leafOwner: Address<TAccountLeafOwner>;
  leafDelegate: Address<TAccountLeafDelegate>;
  merkleTree: Address<TAccountMerkleTree>;
  logWrapper: Address<TAccountLogWrapper>;
  compressionProgram: Address<TAccountCompressionProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  root: BurnInstructionDataArgs['root'];
  dataHash: BurnInstructionDataArgs['dataHash'];
  creatorHash: BurnInstructionDataArgs['creatorHash'];
  nonce: BurnInstructionDataArgs['nonce'];
  index: BurnInstructionDataArgs['index'];
};

export function getBurnInstruction<
  TAccountTreeAuthority extends string,
  TAccountLeafOwner extends string,
  TAccountLeafDelegate extends string,
  TAccountMerkleTree extends string,
  TAccountLogWrapper extends string,
  TAccountCompressionProgram extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BUBBLEGUM_PROGRAM_ADDRESS,
>(
  input: BurnInput<
    TAccountTreeAuthority,
    TAccountLeafOwner,
    TAccountLeafDelegate,
    TAccountMerkleTree,
    TAccountLogWrapper,
    TAccountCompressionProgram,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): BurnInstruction<
  TProgramAddress,
  TAccountTreeAuthority,
  TAccountLeafOwner,
  TAccountLeafDelegate,
  TAccountMerkleTree,
  TAccountLogWrapper,
  TAccountCompressionProgram,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? BUBBLEGUM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    treeAuthority: { value: input.treeAuthority ?? null, isWritable: false },
    leafOwner: { value: input.leafOwner ?? null, isWritable: false },
    leafDelegate: { value: input.leafDelegate ?? null, isWritable: false },
    merkleTree: { value: input.merkleTree ?? null, isWritable: true },
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
      getAccountMeta(accounts.leafOwner),
      getAccountMeta(accounts.leafDelegate),
      getAccountMeta(accounts.merkleTree),
      getAccountMeta(accounts.logWrapper),
      getAccountMeta(accounts.compressionProgram),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getBurnInstructionDataEncoder().encode(
      args as BurnInstructionDataArgs
    ),
  } as BurnInstruction<
    TProgramAddress,
    TAccountTreeAuthority,
    TAccountLeafOwner,
    TAccountLeafDelegate,
    TAccountMerkleTree,
    TAccountLogWrapper,
    TAccountCompressionProgram,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedBurnInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    treeAuthority: TAccountMetas[0];
    leafOwner: TAccountMetas[1];
    leafDelegate: TAccountMetas[2];
    merkleTree: TAccountMetas[3];
    logWrapper: TAccountMetas[4];
    compressionProgram: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
  };
  data: BurnInstructionData;
};

export function parseBurnInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnInstruction<TProgram, TAccountMetas> {
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
      leafOwner: getNextAccount(),
      leafDelegate: getNextAccount(),
      merkleTree: getNextAccount(),
      logWrapper: getNextAccount(),
      compressionProgram: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getBurnInstructionDataDecoder().decode(instruction.data),
  };
}
