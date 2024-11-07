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
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const PUFF_METADATA_DISCRIMINATOR = 14;

export function getPuffMetadataDiscriminatorBytes() {
  return getU8Encoder().encode(PUFF_METADATA_DISCRIMINATOR);
}

export type PuffMetadataInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      ...TRemainingAccounts,
    ]
  >;

export type PuffMetadataInstructionData = { discriminator: number };

export type PuffMetadataInstructionDataArgs = {};

export function getPuffMetadataInstructionDataEncoder(): Encoder<PuffMetadataInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: PUFF_METADATA_DISCRIMINATOR })
  );
}

export function getPuffMetadataInstructionDataDecoder(): Decoder<PuffMetadataInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getPuffMetadataInstructionDataCodec(): Codec<
  PuffMetadataInstructionDataArgs,
  PuffMetadataInstructionData
> {
  return combineCodec(
    getPuffMetadataInstructionDataEncoder(),
    getPuffMetadataInstructionDataDecoder()
  );
}

export type PuffMetadataInput<TAccountMetadata extends string = string> = {
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
};

export function getPuffMetadataInstruction<
  TAccountMetadata extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: PuffMetadataInput<TAccountMetadata>,
  config?: { programAddress?: TProgramAddress }
): PuffMetadataInstruction<TProgramAddress, TAccountMetadata> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.metadata)],
    programAddress,
    data: getPuffMetadataInstructionDataEncoder().encode({}),
  } as PuffMetadataInstruction<TProgramAddress, TAccountMetadata>;

  return instruction;
}

export type ParsedPuffMetadataInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata account */
    metadata: TAccountMetas[0];
  };
  data: PuffMetadataInstructionData;
};

export function parsePuffMetadataInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedPuffMetadataInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
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
      metadata: getNextAccount(),
    },
    data: getPuffMetadataInstructionDataDecoder().decode(instruction.data),
  };
}
