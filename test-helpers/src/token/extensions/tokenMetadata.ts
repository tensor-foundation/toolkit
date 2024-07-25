/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system';
import {
  addEncoderSizePrefix,
  Address,
  Encoder,
  fixEncoderSize,
  getBytesEncoder,
  getStructEncoder,
  getU32Encoder,
  getUtf8Encoder,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  TransactionSigner,
  transformEncoder,
  WritableAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_DISCS } from '.';
import { TOKEN22_PROGRAM_ID } from '../../programIds';
import { getAccountMetaFactory, ResolvedAccount } from '../../shared';

export interface TokenMetadata {
  // The authority that can sign to update the metadata
  updateAuthority: Address | null;

  // The associated mint, used to counter spoofing to be sure that metadata
  // belongs to a particular mint
  mint: Address;

  // The longer name of the token
  name: string;

  // The shortened symbol for the token
  symbol: string;

  // The URI pointing to richer metadata
  uri: string;

  // Any additional metadata about the token as key-value pairs. The program
  // must avoid storing the same key twice.
  additionalMetadata: AdditionalMetadata[];
}

export interface AdditionalMetadata {
  key: string;
  value: string;
}

export type InitializeTokenMetadataInput<
  TAccountMetadata extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountMint extends string = string,
  TAccountMintAuthority extends string = string,
> = {
  metadata: Address<TAccountMetadata>;
  updateAuthority: Address<TAccountUpdateAuthority>;
  mint: Address<TAccountMint>;
  mintAuthority: TransactionSigner<TAccountMintAuthority>;
  data: InitializeTokenMetadataInstructionDataArgs['data'];
};

export interface InitializeTokenMetadataInstructionDataArgs {
  data: TokenMetadataInstructionArgs;
}

export interface TokenMetadataInstructionArgs {
  name: string;
  symbol: string;
  uri: string;
}

export type InitializeTokenMetadataInstruction<
  TProgram extends string = typeof TOKEN22_PROGRAM_ID,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountMintAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountUpdateAuthority extends string
        ? ReadonlyAccount<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountMintAuthority extends string
        ? ReadonlySignerAccount<TAccountMintAuthority>
        : TAccountMintAuthority,
      ...TRemainingAccounts,
    ]
  >;

export function getInitializeTokenMetadataInstruction<
  TAccountMetadata extends string,
  TAccountUpdateAuthority extends string,
  TAccountMint extends string,
  TAccountMintAuthority extends string,
>(
  input: InitializeTokenMetadataInput
): InitializeTokenMetadataInstruction<
  typeof TOKEN22_PROGRAM_ID,
  TAccountMetadata,
  TAccountUpdateAuthority,
  TAccountMint,
  TAccountMintAuthority
> {
  const programAddress = TOKEN22_PROGRAM_ID;

  input.updateAuthority = input.updateAuthority ?? SYSTEM_PROGRAM_ADDRESS;

  const originalAccounts = {
    metadata: {
      value: input.metadata ?? null,
      isWritable: true,
      isSigner: false,
    },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
      isSigner: false,
    },
    mint: { value: input.mint ?? null, isWritable: false, isSigner: false },
    mintAuthority: {
      value: input.mintAuthority ?? null,
      isWritable: false,
      isSigner: true,
    },
  };

  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const data = getInitializeTokenMetadataInstructionDataEncoder().encode(
    args as InitializeTokenMetadataInstructionDataArgs
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.mintAuthority),
    ],
    programAddress,
    data,
  } as InitializeTokenMetadataInstruction<
    typeof TOKEN22_PROGRAM_ID,
    TAccountMetadata,
    TAccountUpdateAuthority,
    TAccountMint,
    TAccountMintAuthority
  >;

  return instruction;
}

export function getInitializeTokenMetadataInstructionDataEncoder(): Encoder<InitializeTokenMetadataInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['data', getTokenMetadataArgsEncoder()],
    ]),
    (value) => ({
      discriminator: TOKEN_METADATA_DISCS['initialize'],
      ...value,
    })
  );
}

export function getTokenMetadataArgsEncoder(): Encoder<TokenMetadataInstructionArgs> {
  return getStructEncoder([
    ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
  ]);
}

enum FieldType {
  Name = 'Name',
  Symbol = 'Symbol',
  Uri = 'Uri',
  Key = 'Key',
}

type Field =
  | { type: FieldType.Name }
  | { type: FieldType.Symbol }
  | { type: FieldType.Uri }
  | { type: FieldType.Key; value: string };

export type UpdateFieldInput<
  TAccountMetadata extends string = string,
  TAccountUpdateAuthority extends string = string,
> = {
  metadata: Address<TAccountMetadata>;
  updateAuthority: TransactionSigner<TAccountUpdateAuthority>;
  data: UpdateFieldInstructionDataArgs['data'];
};

export interface UpdateFieldInstructionDataArgs {
  data: UpdateFieldInstructionArgs;
}

export interface UpdateFieldInstructionArgs {
  key: string;
  value: string;
}

export type UpdateFieldInstruction<
  TProgram extends string = typeof TOKEN22_PROGRAM_ID,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountUpdateAuthority extends string
        ? ReadonlySignerAccount<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
    ]
  >;

export function getUpdateFieldInstruction<
  TAccountMetadata extends string,
  TAccountUpdateAuthority extends string,
>(
  input: UpdateFieldInput
): UpdateFieldInstruction<
  typeof TOKEN22_PROGRAM_ID,
  TAccountMetadata,
  TAccountUpdateAuthority
> {
  const programAddress = TOKEN22_PROGRAM_ID;

  const originalAccounts = {
    metadata: {
      value: input.metadata ?? null,
      isWritable: true,
      isSigner: false,
    },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
      isSigner: true,
    },
  };

  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const encodedData = getUpdateFieldInstructionDataEncoder().encode(
    args as UpdateFieldInstructionDataArgs
  );

  // Hack the field enum u8 in here. Use proper encoders later.
  const index = 8;
  const data = new Uint8Array(encodedData.length + 1);
  data.set(encodedData.slice(0, index));
  data[index] = 3;
  data.set(encodedData.slice(index), index + 1);

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.updateAuthority),
    ],
    programAddress,
    data,
  } as UpdateFieldInstruction<
    typeof TOKEN22_PROGRAM_ID,
    TAccountMetadata,
    TAccountUpdateAuthority
  >;

  return instruction;
}

export function getUpdateFieldInstructionDataEncoder(): Encoder<UpdateFieldInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['data', getUpdateFieldArgsEncoder()],
    ]),
    (value) => ({
      discriminator: TOKEN_METADATA_DISCS['update'],
      ...value,
    })
  );
}

export function getUpdateFieldArgsEncoder(): Encoder<UpdateFieldInstructionArgs> {
  return getStructEncoder([
    ['key', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['value', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
  ]);
}
