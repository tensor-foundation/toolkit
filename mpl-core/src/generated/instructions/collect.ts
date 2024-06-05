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
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  WritableAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { MPL_CORE_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type CollectInstruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountRecipient1 extends string | IAccountMeta<string> = string,
  TAccountRecipient2 extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountRecipient1 extends string
        ? WritableAccount<TAccountRecipient1>
        : TAccountRecipient1,
      TAccountRecipient2 extends string
        ? WritableAccount<TAccountRecipient2>
        : TAccountRecipient2,
      ...TRemainingAccounts,
    ]
  >;

export type CollectInstructionData = { discriminator: number };

export type CollectInstructionDataArgs = {};

export function getCollectInstructionDataEncoder(): Encoder<CollectInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 19 })
  );
}

export function getCollectInstructionDataDecoder(): Decoder<CollectInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCollectInstructionDataCodec(): Codec<
  CollectInstructionDataArgs,
  CollectInstructionData
> {
  return combineCodec(
    getCollectInstructionDataEncoder(),
    getCollectInstructionDataDecoder()
  );
}

export type CollectInput<
  TAccountRecipient1 extends string = string,
  TAccountRecipient2 extends string = string,
> = {
  /** The address of the recipient 1 */
  recipient1: Address<TAccountRecipient1>;
  /** The address of the recipient 2 */
  recipient2: Address<TAccountRecipient2>;
};

export function getCollectInstruction<
  TAccountRecipient1 extends string,
  TAccountRecipient2 extends string,
>(
  input: CollectInput<TAccountRecipient1, TAccountRecipient2>
): CollectInstruction<
  typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountRecipient1,
  TAccountRecipient2
> {
  // Program address.
  const programAddress = MPL_CORE_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    recipient1: { value: input.recipient1 ?? null, isWritable: true },
    recipient2: { value: input.recipient2 ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.recipient1),
      getAccountMeta(accounts.recipient2),
    ],
    programAddress,
    data: getCollectInstructionDataEncoder().encode({}),
  } as CollectInstruction<
    typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
    TAccountRecipient1,
    TAccountRecipient2
  >;

  return instruction;
}

export type ParsedCollectInstruction<
  TProgram extends string = typeof MPL_CORE_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The address of the recipient 1 */
    recipient1: TAccountMetas[0];
    /** The address of the recipient 2 */
    recipient2: TAccountMetas[1];
  };
  data: CollectInstructionData;
};

export function parseCollectInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCollectInstruction<TProgram, TAccountMetas> {
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
      recipient1: getNextAccount(),
      recipient2: getNextAccount(),
    },
    data: getCollectInstructionDataDecoder().decode(instruction.data),
  };
}
