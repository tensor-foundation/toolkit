/* eslint-disable @typescript-eslint/no-unused-vars */
import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system';
import {
  Address,
  Encoder,
  getAddressEncoder,
  getStructEncoder,
  getU8Encoder,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  transformEncoder,
  WritableAccount,
} from '@solana/web3.js';
import { TOKEN22_PROGRAM_ID } from '../programIds';
import { getAccountMetaFactory, ResolvedAccount } from '../shared';

export enum MetadataPointerInstruction {
  Initialize = 0,
  Update = 1,
}

export const METADATA_POINTER_EXTENSION_LENGTH = 64;

const TOKEN_INSTRUCTION_DISCRIMINATOR = 39;
const METADATA_POINTER_INSTRUCTION_DISCRIMINATOR = 0;

export interface InitializeMetadataPointerInput {
  tokenProgram: Address;
  mint: Address;
  metadata?: Address;
  authority?: Address;
}

export type InitializeMetadataPointerInstructionDataArgs = {
  authority: Address;
  metadata: Address;
};

export type InitializeMetadataPointerInstruction<
  TProgram extends string = typeof TOKEN22_PROGRAM_ID,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export function getInitializeMetadataPointerInstruction<
  TAccountMint extends string,
>(
  input: InitializeMetadataPointerInput
): InitializeMetadataPointerInstruction<
  typeof TOKEN22_PROGRAM_ID,
  TAccountMint
> {
  const programAddress = input.tokenProgram ?? TOKEN22_PROGRAM_ID;

  input.authority = input.authority ?? SYSTEM_PROGRAM_ADDRESS;
  input.metadata = input.metadata ?? SYSTEM_PROGRAM_ADDRESS;

  const originalAccounts = {
    mint: { value: input.mint, isWritable: true },
  };
  const resolvedAccounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const data = getInitializeMetadataPointerInstructionDataEncoder().encode(
    args as InitializeMetadataPointerInstructionDataArgs
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(resolvedAccounts.mint)],
    programAddress,
    data,
  } as InitializeMetadataPointerInstruction<
    typeof TOKEN22_PROGRAM_ID,
    TAccountMint
  >;

  return instruction;
}

function getInitializeMetadataPointerInstructionDataEncoder(): Encoder<InitializeMetadataPointerInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['subDiscriminator', getU8Encoder()],
      ['authority', getAddressEncoder()],
      ['metadata', getAddressEncoder()],
    ]),
    (value) => ({
      discriminator: TOKEN_INSTRUCTION_DISCRIMINATOR,
      subDiscriminator: METADATA_POINTER_INSTRUCTION_DISCRIMINATOR,
      authority: value.authority,
      metadata: value.metadata,
    })
  );
}
