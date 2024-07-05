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
  ReadonlyAccount,
  ReadonlySignerAccount,
  ReadonlyUint8Array,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
} from '@solana/web3.js';
import { WEN_NEW_STANDARD_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type RemoveMintFromGroupInstruction<
  TProgram extends string = typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountGroup extends string | IAccountMeta<string> = string,
  TAccountMember extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountManager extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountGroup extends string
        ? WritableAccount<TAccountGroup>
        : TAccountGroup,
      TAccountMember extends string
        ? WritableAccount<TAccountMember>
        : TAccountMember,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountManager extends string
        ? ReadonlyAccount<TAccountManager>
        : TAccountManager,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type RemoveMintFromGroupInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type RemoveMintFromGroupInstructionDataArgs = {};

export function getRemoveMintFromGroupInstructionDataEncoder(): Encoder<RemoveMintFromGroupInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([231, 224, 145, 240, 192, 4, 204, 218]),
    })
  );
}

export function getRemoveMintFromGroupInstructionDataDecoder(): Decoder<RemoveMintFromGroupInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getRemoveMintFromGroupInstructionDataCodec(): Codec<
  RemoveMintFromGroupInstructionDataArgs,
  RemoveMintFromGroupInstructionData
> {
  return combineCodec(
    getRemoveMintFromGroupInstructionDataEncoder(),
    getRemoveMintFromGroupInstructionDataDecoder()
  );
}

export type RemoveMintFromGroupInput<
  TAccountPayer extends string = string,
  TAccountAuthority extends string = string,
  TAccountGroup extends string = string,
  TAccountMember extends string = string,
  TAccountMint extends string = string,
  TAccountManager extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  authority: TransactionSigner<TAccountAuthority>;
  group: Address<TAccountGroup>;
  member: Address<TAccountMember>;
  mint: Address<TAccountMint>;
  manager: Address<TAccountManager>;
  systemProgram?: Address<TAccountSystemProgram>;
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getRemoveMintFromGroupInstruction<
  TAccountPayer extends string,
  TAccountAuthority extends string,
  TAccountGroup extends string,
  TAccountMember extends string,
  TAccountMint extends string,
  TAccountManager extends string,
  TAccountSystemProgram extends string,
  TAccountTokenProgram extends string,
>(
  input: RemoveMintFromGroupInput<
    TAccountPayer,
    TAccountAuthority,
    TAccountGroup,
    TAccountMember,
    TAccountMint,
    TAccountManager,
    TAccountSystemProgram,
    TAccountTokenProgram
  >
): RemoveMintFromGroupInstruction<
  typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountPayer,
  TAccountAuthority,
  TAccountGroup,
  TAccountMember,
  TAccountMint,
  TAccountManager,
  TAccountSystemProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = WEN_NEW_STANDARD_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    group: { value: input.group ?? null, isWritable: true },
    member: { value: input.member ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    manager: { value: input.manager ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
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
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.group),
      getAccountMeta(accounts.member),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.manager),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getRemoveMintFromGroupInstructionDataEncoder().encode({}),
  } as RemoveMintFromGroupInstruction<
    typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
    TAccountPayer,
    TAccountAuthority,
    TAccountGroup,
    TAccountMember,
    TAccountMint,
    TAccountManager,
    TAccountSystemProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedRemoveMintFromGroupInstruction<
  TProgram extends string = typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    authority: TAccountMetas[1];
    group: TAccountMetas[2];
    member: TAccountMetas[3];
    mint: TAccountMetas[4];
    manager: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
    tokenProgram: TAccountMetas[7];
  };
  data: RemoveMintFromGroupInstructionData;
};

export function parseRemoveMintFromGroupInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedRemoveMintFromGroupInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
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
      payer: getNextAccount(),
      authority: getNextAccount(),
      group: getNextAccount(),
      member: getNextAccount(),
      mint: getNextAccount(),
      manager: getNextAccount(),
      systemProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getRemoveMintFromGroupInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
