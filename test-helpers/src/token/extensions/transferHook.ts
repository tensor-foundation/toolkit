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
import { TOKEN22_PROGRAM_ID } from '../../programIds';
import { getAccountMetaFactory, ResolvedAccount } from '../../shared';

export interface TransferHook {
  authority: Address;
  programId: Address;
}

export enum TransferHookInstruction {
  Initialize = 0,
  Update = 1,
}

export const TRANSFER_HOOK_EXTENSION_LENGTH = 64;
const TOKEN_INSTRUCTION_DISCRIMINATOR = 36;

export interface InitializeTransferHookInput {
  tokenProgram: Address;
  mint: Address;
  authority?: Address;
  programId?: Address;
}

export type InitializeTransferHookInstructionDataArgs = {
  authority: Address;
  programId: Address;
};

export type InitializeTransferHookInstruction<
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

export function getInitializeTransferHookInstruction<
  TAccountMint extends string,
>(
  input: InitializeTransferHookInput
): InitializeTransferHookInstruction<typeof TOKEN22_PROGRAM_ID, TAccountMint> {
  const programAddress = input.tokenProgram ?? TOKEN22_PROGRAM_ID;

  input.authority = input.authority ?? SYSTEM_PROGRAM_ADDRESS;
  input.programId = input.programId ?? SYSTEM_PROGRAM_ADDRESS;

  const originalAccounts = {
    mint: { value: input.mint, isWritable: true },
  };
  const resolvedAccounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const data = getInitializeTransferHookInstructionDataEncoder().encode(
    args as InitializeTransferHookInstructionDataArgs
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(resolvedAccounts.mint)],
    programAddress,
    data,
  } as InitializeTransferHookInstruction<
    typeof TOKEN22_PROGRAM_ID,
    TAccountMint
  >;

  return instruction;
}

function getInitializeTransferHookInstructionDataEncoder(): Encoder<InitializeTransferHookInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['subDiscriminator', getU8Encoder()],
      ['authority', getAddressEncoder()],
      ['programId', getAddressEncoder()],
    ]),
    (value) => ({
      discriminator: TOKEN_INSTRUCTION_DISCRIMINATOR,
      subDiscriminator: TransferHookInstruction.Initialize,
      authority: value.authority,
      programId: value.programId,
    })
  );
}
