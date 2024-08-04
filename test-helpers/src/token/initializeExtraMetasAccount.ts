import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system';
import {
  Encoder,
  fixEncoderSize,
  getBytesEncoder,
  getStructEncoder,
  TransactionSigner,
  transformEncoder,
  type Address,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type WritableAccount,
} from '@solana/web3.js';
import { LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID } from '../programIds';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  ExtraAccountMetaAccountData,
  ExtraAccountMetaList,
  getExtraAccountMetaListEncoder,
} from './token22';

export type InitializeExtraMetasAccountInstruction<
  TProgram extends string = typeof LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
  TAccountExtraAccountMetas extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountExtraAccountMetas extends string
        ? WritableAccount<TAccountExtraAccountMetas>
        : TAccountExtraAccountMetas,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority>
        : TAccountAuthority,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeExtraMetasAccountInstructionData = ExtraAccountMetaList;

export type InitializeExtraMetasAccountInstructionDataArgs =
  ExtraAccountMetaList;

export type InitializeExtraMetasAccountInput<
  TAccountExtraAccountMetas extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
> = {
  extraAccountMetasAccount: Address<TAccountExtraAccountMetas>;
  mint: Address<TAccountMint>;
  authority: TransactionSigner<TAccountAuthority>;
  systemProgram?: Address;
  extraAccountMetaList: ExtraAccountMetaList;
};

export function getInitializeExtraMetasAccountInstruction<
  TAccountExtraAccountMetas extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
>(
  input: InitializeExtraMetasAccountInput<
    TAccountExtraAccountMetas,
    TAccountMint,
    TAccountAuthority
  >
): InitializeExtraMetasAccountInstruction<
  typeof LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
  TAccountExtraAccountMetas,
  TAccountMint,
  TAccountAuthority
> {
  // Program address.
  const programAddress = LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID;

  // Original accounts.
  const originalAccounts = {
    extraAccountMetasAccount: {
      value: input.extraAccountMetasAccount,
      isWritable: true,
    },
    mint: { value: input.mint, isWritable: false },
    authority: { value: input.authority, isWritable: false, isSigner: true },
    systemProgram: {
      value: input.systemProgram ?? SYSTEM_PROGRAM_ADDRESS,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const data = getInitializeExtraMetasAccountInstructionDataEncoder().encode({
    extraAccountsList: input.extraAccountMetaList,
  });

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.extraAccountMetasAccount),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data,
  } as InitializeExtraMetasAccountInstruction<
    typeof LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
    TAccountExtraAccountMetas,
    TAccountMint,
    TAccountAuthority
  >;

  return instruction;
}

function getInitializeExtraMetasAccountInstructionDataEncoder(): Encoder<ExtraAccountMetaAccountData> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['extraAccountsList', getExtraAccountMetaListEncoder()],
    ]),
    (value) => ({
      discriminator: new Uint8Array([43, 34, 13, 49, 167, 88, 235, 235]),
      ...value,
    })
  );
}
