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
  ReadonlySignerAccount,
  ReadonlyUint8Array,
  TransactionSigner,
  WritableAccount,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
} from '@solana/web3.js';
import { SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type CloseEmptyTreeInstruction<
  TProgram extends string = typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMerkleTree extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountRecipient extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMerkleTree extends string
        ? WritableAccount<TAccountMerkleTree>
        : TAccountMerkleTree,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountRecipient extends string
        ? WritableAccount<TAccountRecipient>
        : TAccountRecipient,
      ...TRemainingAccounts,
    ]
  >;

export type CloseEmptyTreeInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type CloseEmptyTreeInstructionDataArgs = {};

export function getCloseEmptyTreeInstructionDataEncoder(): Encoder<CloseEmptyTreeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([50, 14, 219, 107, 78, 103, 16, 103]),
    })
  );
}

export function getCloseEmptyTreeInstructionDataDecoder(): Decoder<CloseEmptyTreeInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getCloseEmptyTreeInstructionDataCodec(): Codec<
  CloseEmptyTreeInstructionDataArgs,
  CloseEmptyTreeInstructionData
> {
  return combineCodec(
    getCloseEmptyTreeInstructionDataEncoder(),
    getCloseEmptyTreeInstructionDataDecoder()
  );
}

export type CloseEmptyTreeInput<
  TAccountMerkleTree extends string = string,
  TAccountAuthority extends string = string,
  TAccountRecipient extends string = string,
> = {
  merkleTree: Address<TAccountMerkleTree>;
  /** Authority that controls write-access to the tree */
  authority: TransactionSigner<TAccountAuthority>;
  recipient: Address<TAccountRecipient>;
};

export function getCloseEmptyTreeInstruction<
  TAccountMerkleTree extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
>(
  input: CloseEmptyTreeInput<
    TAccountMerkleTree,
    TAccountAuthority,
    TAccountRecipient
  >
): CloseEmptyTreeInstruction<
  typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMerkleTree,
  TAccountAuthority,
  TAccountRecipient
> {
  // Program address.
  const programAddress = SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    merkleTree: { value: input.merkleTree ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    recipient: { value: input.recipient ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.merkleTree),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.recipient),
    ],
    programAddress,
    data: getCloseEmptyTreeInstructionDataEncoder().encode({}),
  } as CloseEmptyTreeInstruction<
    typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
    TAccountMerkleTree,
    TAccountAuthority,
    TAccountRecipient
  >;

  return instruction;
}

export type ParsedCloseEmptyTreeInstruction<
  TProgram extends string = typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    merkleTree: TAccountMetas[0];
    /** Authority that controls write-access to the tree */
    authority: TAccountMetas[1];
    recipient: TAccountMetas[2];
  };
  data: CloseEmptyTreeInstructionData;
};

export function parseCloseEmptyTreeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCloseEmptyTreeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
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
      merkleTree: getNextAccount(),
      authority: getNextAccount(),
      recipient: getNextAccount(),
    },
    data: getCloseEmptyTreeInstructionDataDecoder().decode(instruction.data),
  };
}
