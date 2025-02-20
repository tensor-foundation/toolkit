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
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { BUBBLEGUM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_TREE_DELEGATE_DISCRIMINATOR = new Uint8Array([
  253, 118, 66, 37, 190, 49, 154, 102,
]);

export function getSetTreeDelegateDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    SET_TREE_DELEGATE_DISCRIMINATOR
  );
}

export type SetTreeDelegateInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountTreeAuthority extends string | IAccountMeta<string> = string,
  TAccountTreeCreator extends string | IAccountMeta<string> = string,
  TAccountNewTreeDelegate extends string | IAccountMeta<string> = string,
  TAccountMerkleTree extends string | IAccountMeta<string> = string,
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
      TAccountTreeCreator extends string
        ? ReadonlySignerAccount<TAccountTreeCreator> &
            IAccountSignerMeta<TAccountTreeCreator>
        : TAccountTreeCreator,
      TAccountNewTreeDelegate extends string
        ? ReadonlyAccount<TAccountNewTreeDelegate>
        : TAccountNewTreeDelegate,
      TAccountMerkleTree extends string
        ? ReadonlyAccount<TAccountMerkleTree>
        : TAccountMerkleTree,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type SetTreeDelegateInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type SetTreeDelegateInstructionDataArgs = {};

export function getSetTreeDelegateInstructionDataEncoder(): Encoder<SetTreeDelegateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: SET_TREE_DELEGATE_DISCRIMINATOR })
  );
}

export function getSetTreeDelegateInstructionDataDecoder(): Decoder<SetTreeDelegateInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getSetTreeDelegateInstructionDataCodec(): Codec<
  SetTreeDelegateInstructionDataArgs,
  SetTreeDelegateInstructionData
> {
  return combineCodec(
    getSetTreeDelegateInstructionDataEncoder(),
    getSetTreeDelegateInstructionDataDecoder()
  );
}

export type SetTreeDelegateInput<
  TAccountTreeAuthority extends string = string,
  TAccountTreeCreator extends string = string,
  TAccountNewTreeDelegate extends string = string,
  TAccountMerkleTree extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  treeAuthority: Address<TAccountTreeAuthority>;
  treeCreator: TransactionSigner<TAccountTreeCreator>;
  newTreeDelegate: Address<TAccountNewTreeDelegate>;
  merkleTree: Address<TAccountMerkleTree>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getSetTreeDelegateInstruction<
  TAccountTreeAuthority extends string,
  TAccountTreeCreator extends string,
  TAccountNewTreeDelegate extends string,
  TAccountMerkleTree extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BUBBLEGUM_PROGRAM_ADDRESS,
>(
  input: SetTreeDelegateInput<
    TAccountTreeAuthority,
    TAccountTreeCreator,
    TAccountNewTreeDelegate,
    TAccountMerkleTree,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): SetTreeDelegateInstruction<
  TProgramAddress,
  TAccountTreeAuthority,
  TAccountTreeCreator,
  TAccountNewTreeDelegate,
  TAccountMerkleTree,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? BUBBLEGUM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    treeAuthority: { value: input.treeAuthority ?? null, isWritable: true },
    treeCreator: { value: input.treeCreator ?? null, isWritable: false },
    newTreeDelegate: {
      value: input.newTreeDelegate ?? null,
      isWritable: false,
    },
    merkleTree: { value: input.merkleTree ?? null, isWritable: false },
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
      getAccountMeta(accounts.treeAuthority),
      getAccountMeta(accounts.treeCreator),
      getAccountMeta(accounts.newTreeDelegate),
      getAccountMeta(accounts.merkleTree),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getSetTreeDelegateInstructionDataEncoder().encode({}),
  } as SetTreeDelegateInstruction<
    TProgramAddress,
    TAccountTreeAuthority,
    TAccountTreeCreator,
    TAccountNewTreeDelegate,
    TAccountMerkleTree,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedSetTreeDelegateInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    treeAuthority: TAccountMetas[0];
    treeCreator: TAccountMetas[1];
    newTreeDelegate: TAccountMetas[2];
    merkleTree: TAccountMetas[3];
    systemProgram: TAccountMetas[4];
  };
  data: SetTreeDelegateInstructionData;
};

export function parseSetTreeDelegateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetTreeDelegateInstruction<TProgram, TAccountMetas> {
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
  return {
    programAddress: instruction.programAddress,
    accounts: {
      treeAuthority: getNextAccount(),
      treeCreator: getNextAccount(),
      newTreeDelegate: getNextAccount(),
      merkleTree: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getSetTreeDelegateInstructionDataDecoder().decode(instruction.data),
  };
}
