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
import { BUBBLEGUM_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';
import {
  DecompressibleState,
  DecompressibleStateArgs,
  getDecompressibleStateDecoder,
  getDecompressibleStateEncoder,
} from '../types';

export type SetDecompressibleStateInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountTreeAuthority extends string | IAccountMeta<string> = string,
  TAccountTreeCreator extends string | IAccountMeta<string> = string,
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
      ...TRemainingAccounts,
    ]
  >;

export type SetDecompressibleStateInstructionData = {
  discriminator: ReadonlyUint8Array;
  decompressableState: DecompressibleState;
};

export type SetDecompressibleStateInstructionDataArgs = {
  decompressableState: DecompressibleStateArgs;
};

export function getSetDecompressibleStateInstructionDataEncoder(): Encoder<SetDecompressibleStateInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['decompressableState', getDecompressibleStateEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([82, 104, 152, 6, 149, 111, 100, 13]),
    })
  );
}

export function getSetDecompressibleStateInstructionDataDecoder(): Decoder<SetDecompressibleStateInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['decompressableState', getDecompressibleStateDecoder()],
  ]);
}

export function getSetDecompressibleStateInstructionDataCodec(): Codec<
  SetDecompressibleStateInstructionDataArgs,
  SetDecompressibleStateInstructionData
> {
  return combineCodec(
    getSetDecompressibleStateInstructionDataEncoder(),
    getSetDecompressibleStateInstructionDataDecoder()
  );
}

export type SetDecompressibleStateInput<
  TAccountTreeAuthority extends string = string,
  TAccountTreeCreator extends string = string,
> = {
  treeAuthority: Address<TAccountTreeAuthority>;
  treeCreator: TransactionSigner<TAccountTreeCreator>;
  decompressableState: SetDecompressibleStateInstructionDataArgs['decompressableState'];
};

export function getSetDecompressibleStateInstruction<
  TAccountTreeAuthority extends string,
  TAccountTreeCreator extends string,
>(
  input: SetDecompressibleStateInput<TAccountTreeAuthority, TAccountTreeCreator>
): SetDecompressibleStateInstruction<
  typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountTreeAuthority,
  TAccountTreeCreator
> {
  // Program address.
  const programAddress = BUBBLEGUM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    treeAuthority: { value: input.treeAuthority ?? null, isWritable: true },
    treeCreator: { value: input.treeCreator ?? null, isWritable: false },
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
      getAccountMeta(accounts.treeAuthority),
      getAccountMeta(accounts.treeCreator),
    ],
    programAddress,
    data: getSetDecompressibleStateInstructionDataEncoder().encode(
      args as SetDecompressibleStateInstructionDataArgs
    ),
  } as SetDecompressibleStateInstruction<
    typeof BUBBLEGUM_PROGRAM_ADDRESS,
    TAccountTreeAuthority,
    TAccountTreeCreator
  >;

  return instruction;
}

export type ParsedSetDecompressibleStateInstruction<
  TProgram extends string = typeof BUBBLEGUM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    treeAuthority: TAccountMetas[0];
    treeCreator: TAccountMetas[1];
  };
  data: SetDecompressibleStateInstructionData;
};

export function parseSetDecompressibleStateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetDecompressibleStateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
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
    },
    data: getSetDecompressibleStateInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
