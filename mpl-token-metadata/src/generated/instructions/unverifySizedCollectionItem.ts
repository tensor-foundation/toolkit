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
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const UNVERIFY_SIZED_COLLECTION_ITEM_DISCRIMINATOR = 31;

export function getUnverifySizedCollectionItemDiscriminatorBytes() {
  return getU8Encoder().encode(UNVERIFY_SIZED_COLLECTION_ITEM_DISCRIMINATOR);
}

export type UnverifySizedCollectionItemInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountCollectionAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountCollectionMint extends string | IAccountMeta<string> = string,
  TAccountCollection extends string | IAccountMeta<string> = string,
  TAccountCollectionMasterEditionAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountCollectionAuthorityRecord extends
    | string
    | IAccountMeta<string>
    | undefined = undefined,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountCollectionAuthority extends string
        ? ReadonlySignerAccount<TAccountCollectionAuthority> &
            IAccountSignerMeta<TAccountCollectionAuthority>
        : TAccountCollectionAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountCollectionMint extends string
        ? ReadonlyAccount<TAccountCollectionMint>
        : TAccountCollectionMint,
      TAccountCollection extends string
        ? WritableAccount<TAccountCollection>
        : TAccountCollection,
      TAccountCollectionMasterEditionAccount extends string
        ? ReadonlyAccount<TAccountCollectionMasterEditionAccount>
        : TAccountCollectionMasterEditionAccount,
      ...(TAccountCollectionAuthorityRecord extends undefined
        ? []
        : [
            TAccountCollectionAuthorityRecord extends string
              ? ReadonlyAccount<TAccountCollectionAuthorityRecord>
              : TAccountCollectionAuthorityRecord,
          ]),
      ...TRemainingAccounts,
    ]
  >;

export type UnverifySizedCollectionItemInstructionData = {
  discriminator: number;
};

export type UnverifySizedCollectionItemInstructionDataArgs = {};

export function getUnverifySizedCollectionItemInstructionDataEncoder(): Encoder<UnverifySizedCollectionItemInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: UNVERIFY_SIZED_COLLECTION_ITEM_DISCRIMINATOR,
    })
  );
}

export function getUnverifySizedCollectionItemInstructionDataDecoder(): Decoder<UnverifySizedCollectionItemInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getUnverifySizedCollectionItemInstructionDataCodec(): Codec<
  UnverifySizedCollectionItemInstructionDataArgs,
  UnverifySizedCollectionItemInstructionData
> {
  return combineCodec(
    getUnverifySizedCollectionItemInstructionDataEncoder(),
    getUnverifySizedCollectionItemInstructionDataDecoder()
  );
}

export type UnverifySizedCollectionItemInput<
  TAccountMetadata extends string = string,
  TAccountCollectionAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountCollectionMint extends string = string,
  TAccountCollection extends string = string,
  TAccountCollectionMasterEditionAccount extends string = string,
  TAccountCollectionAuthorityRecord extends string = string,
> = {
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Collection Authority */
  collectionAuthority: TransactionSigner<TAccountCollectionAuthority>;
  /** payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Mint of the Collection */
  collectionMint: Address<TAccountCollectionMint>;
  /** Metadata Account of the Collection */
  collection: Address<TAccountCollection>;
  /** MasterEdition2 Account of the Collection Token */
  collectionMasterEditionAccount: Address<TAccountCollectionMasterEditionAccount>;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: Address<TAccountCollectionAuthorityRecord>;
};

export function getUnverifySizedCollectionItemInstruction<
  TAccountMetadata extends string,
  TAccountCollectionAuthority extends string,
  TAccountPayer extends string,
  TAccountCollectionMint extends string,
  TAccountCollection extends string,
  TAccountCollectionMasterEditionAccount extends string,
  TAccountCollectionAuthorityRecord extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: UnverifySizedCollectionItemInput<
    TAccountMetadata,
    TAccountCollectionAuthority,
    TAccountPayer,
    TAccountCollectionMint,
    TAccountCollection,
    TAccountCollectionMasterEditionAccount,
    TAccountCollectionAuthorityRecord
  >,
  config?: { programAddress?: TProgramAddress }
): UnverifySizedCollectionItemInstruction<
  TProgramAddress,
  TAccountMetadata,
  TAccountCollectionAuthority,
  TAccountPayer,
  TAccountCollectionMint,
  TAccountCollection,
  TAccountCollectionMasterEditionAccount,
  TAccountCollectionAuthorityRecord
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    collectionAuthority: {
      value: input.collectionAuthority ?? null,
      isWritable: false,
    },
    payer: { value: input.payer ?? null, isWritable: true },
    collectionMint: { value: input.collectionMint ?? null, isWritable: false },
    collection: { value: input.collection ?? null, isWritable: true },
    collectionMasterEditionAccount: {
      value: input.collectionMasterEditionAccount ?? null,
      isWritable: false,
    },
    collectionAuthorityRecord: {
      value: input.collectionAuthorityRecord ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.collectionAuthority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.collectionMint),
      getAccountMeta(accounts.collection),
      getAccountMeta(accounts.collectionMasterEditionAccount),
      getAccountMeta(accounts.collectionAuthorityRecord),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getUnverifySizedCollectionItemInstructionDataEncoder().encode({}),
  } as UnverifySizedCollectionItemInstruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountCollectionAuthority,
    TAccountPayer,
    TAccountCollectionMint,
    TAccountCollection,
    TAccountCollectionMasterEditionAccount,
    TAccountCollectionAuthorityRecord
  >;

  return instruction;
}

export type ParsedUnverifySizedCollectionItemInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata account */
    metadata: TAccountMetas[0];
    /** Collection Authority */
    collectionAuthority: TAccountMetas[1];
    /** payer */
    payer: TAccountMetas[2];
    /** Mint of the Collection */
    collectionMint: TAccountMetas[3];
    /** Metadata Account of the Collection */
    collection: TAccountMetas[4];
    /** MasterEdition2 Account of the Collection Token */
    collectionMasterEditionAccount: TAccountMetas[5];
    /** Collection Authority Record PDA */
    collectionAuthorityRecord?: TAccountMetas[6] | undefined;
  };
  data: UnverifySizedCollectionItemInstructionData;
};

export function parseUnverifySizedCollectionItemInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUnverifySizedCollectionItemInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  let optionalAccountsRemaining = instruction.accounts.length - 6;
  const getNextOptionalAccount = () => {
    if (optionalAccountsRemaining === 0) return undefined;
    optionalAccountsRemaining -= 1;
    return getNextAccount();
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      metadata: getNextAccount(),
      collectionAuthority: getNextAccount(),
      payer: getNextAccount(),
      collectionMint: getNextAccount(),
      collection: getNextAccount(),
      collectionMasterEditionAccount: getNextAccount(),
      collectionAuthorityRecord: getNextOptionalAccount(),
    },
    data: getUnverifySizedCollectionItemInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
