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
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type SetAndVerifyCollectionInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountCollectionAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
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
        ? WritableSignerAccount<TAccountCollectionAuthority> &
            IAccountSignerMeta<TAccountCollectionAuthority>
        : TAccountCollectionAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountUpdateAuthority extends string
        ? ReadonlyAccount<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
      TAccountCollectionMint extends string
        ? ReadonlyAccount<TAccountCollectionMint>
        : TAccountCollectionMint,
      TAccountCollection extends string
        ? ReadonlyAccount<TAccountCollection>
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

export type SetAndVerifyCollectionInstructionData = { discriminator: number };

export type SetAndVerifyCollectionInstructionDataArgs = {};

export function getSetAndVerifyCollectionInstructionDataEncoder(): Encoder<SetAndVerifyCollectionInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 25 })
  );
}

export function getSetAndVerifyCollectionInstructionDataDecoder(): Decoder<SetAndVerifyCollectionInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getSetAndVerifyCollectionInstructionDataCodec(): Codec<
  SetAndVerifyCollectionInstructionDataArgs,
  SetAndVerifyCollectionInstructionData
> {
  return combineCodec(
    getSetAndVerifyCollectionInstructionDataEncoder(),
    getSetAndVerifyCollectionInstructionDataDecoder()
  );
}

export type SetAndVerifyCollectionInput<
  TAccountMetadata extends string = string,
  TAccountCollectionAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountCollectionMint extends string = string,
  TAccountCollection extends string = string,
  TAccountCollectionMasterEditionAccount extends string = string,
  TAccountCollectionAuthorityRecord extends string = string,
> = {
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Collection Update authority */
  collectionAuthority: TransactionSigner<TAccountCollectionAuthority>;
  /** Payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Update Authority of Collection NFT and NFT */
  updateAuthority: Address<TAccountUpdateAuthority>;
  /** Mint of the Collection */
  collectionMint: Address<TAccountCollectionMint>;
  /** Metadata Account of the Collection */
  collection: Address<TAccountCollection>;
  /** MasterEdition2 Account of the Collection Token */
  collectionMasterEditionAccount: Address<TAccountCollectionMasterEditionAccount>;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: Address<TAccountCollectionAuthorityRecord>;
};

export function getSetAndVerifyCollectionInstruction<
  TAccountMetadata extends string,
  TAccountCollectionAuthority extends string,
  TAccountPayer extends string,
  TAccountUpdateAuthority extends string,
  TAccountCollectionMint extends string,
  TAccountCollection extends string,
  TAccountCollectionMasterEditionAccount extends string,
  TAccountCollectionAuthorityRecord extends string,
>(
  input: SetAndVerifyCollectionInput<
    TAccountMetadata,
    TAccountCollectionAuthority,
    TAccountPayer,
    TAccountUpdateAuthority,
    TAccountCollectionMint,
    TAccountCollection,
    TAccountCollectionMasterEditionAccount,
    TAccountCollectionAuthorityRecord
  >
): SetAndVerifyCollectionInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata,
  TAccountCollectionAuthority,
  TAccountPayer,
  TAccountUpdateAuthority,
  TAccountCollectionMint,
  TAccountCollection,
  TAccountCollectionMasterEditionAccount,
  TAccountCollectionAuthorityRecord
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    collectionAuthority: {
      value: input.collectionAuthority ?? null,
      isWritable: true,
    },
    payer: { value: input.payer ?? null, isWritable: true },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
    collectionMint: { value: input.collectionMint ?? null, isWritable: false },
    collection: { value: input.collection ?? null, isWritable: false },
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
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.collectionMint),
      getAccountMeta(accounts.collection),
      getAccountMeta(accounts.collectionMasterEditionAccount),
      getAccountMeta(accounts.collectionAuthorityRecord),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getSetAndVerifyCollectionInstructionDataEncoder().encode({}),
  } as SetAndVerifyCollectionInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountMetadata,
    TAccountCollectionAuthority,
    TAccountPayer,
    TAccountUpdateAuthority,
    TAccountCollectionMint,
    TAccountCollection,
    TAccountCollectionMasterEditionAccount,
    TAccountCollectionAuthorityRecord
  >;

  return instruction;
}

export type ParsedSetAndVerifyCollectionInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata account */
    metadata: TAccountMetas[0];
    /** Collection Update authority */
    collectionAuthority: TAccountMetas[1];
    /** Payer */
    payer: TAccountMetas[2];
    /** Update Authority of Collection NFT and NFT */
    updateAuthority: TAccountMetas[3];
    /** Mint of the Collection */
    collectionMint: TAccountMetas[4];
    /** Metadata Account of the Collection */
    collection: TAccountMetas[5];
    /** MasterEdition2 Account of the Collection Token */
    collectionMasterEditionAccount: TAccountMetas[6];
    /** Collection Authority Record PDA */
    collectionAuthorityRecord?: TAccountMetas[7] | undefined;
  };
  data: SetAndVerifyCollectionInstructionData;
};

export function parseSetAndVerifyCollectionInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetAndVerifyCollectionInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  let optionalAccountsRemaining = instruction.accounts.length - 7;
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
      updateAuthority: getNextAccount(),
      collectionMint: getNextAccount(),
      collection: getNextAccount(),
      collectionMasterEditionAccount: getNextAccount(),
      collectionAuthorityRecord: getNextOptionalAccount(),
    },
    data: getSetAndVerifyCollectionInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
