/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
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
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getSetCollectionSizeArgsDecoder,
  getSetCollectionSizeArgsEncoder,
  type SetCollectionSizeArgs,
  type SetCollectionSizeArgsArgs,
} from '../types';

export type BubblegumSetCollectionSizeInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountCollectionMetadata extends string | IAccountMeta<string> = string,
  TAccountCollectionAuthority extends string | IAccountMeta<string> = string,
  TAccountCollectionMint extends string | IAccountMeta<string> = string,
  TAccountBubblegumSigner extends string | IAccountMeta<string> = string,
  TAccountCollectionAuthorityRecord extends
    | string
    | IAccountMeta<string>
    | undefined = undefined,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountCollectionMetadata extends string
        ? WritableAccount<TAccountCollectionMetadata>
        : TAccountCollectionMetadata,
      TAccountCollectionAuthority extends string
        ? ReadonlySignerAccount<TAccountCollectionAuthority> &
            IAccountSignerMeta<TAccountCollectionAuthority>
        : TAccountCollectionAuthority,
      TAccountCollectionMint extends string
        ? ReadonlyAccount<TAccountCollectionMint>
        : TAccountCollectionMint,
      TAccountBubblegumSigner extends string
        ? ReadonlySignerAccount<TAccountBubblegumSigner> &
            IAccountSignerMeta<TAccountBubblegumSigner>
        : TAccountBubblegumSigner,
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

export type BubblegumSetCollectionSizeInstructionData = {
  discriminator: number;
  setCollectionSizeArgs: SetCollectionSizeArgs;
};

export type BubblegumSetCollectionSizeInstructionDataArgs = {
  setCollectionSizeArgs: SetCollectionSizeArgsArgs;
};

export function getBubblegumSetCollectionSizeInstructionDataEncoder(): Encoder<BubblegumSetCollectionSizeInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['setCollectionSizeArgs', getSetCollectionSizeArgsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 36 })
  );
}

export function getBubblegumSetCollectionSizeInstructionDataDecoder(): Decoder<BubblegumSetCollectionSizeInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['setCollectionSizeArgs', getSetCollectionSizeArgsDecoder()],
  ]);
}

export function getBubblegumSetCollectionSizeInstructionDataCodec(): Codec<
  BubblegumSetCollectionSizeInstructionDataArgs,
  BubblegumSetCollectionSizeInstructionData
> {
  return combineCodec(
    getBubblegumSetCollectionSizeInstructionDataEncoder(),
    getBubblegumSetCollectionSizeInstructionDataDecoder()
  );
}

export type BubblegumSetCollectionSizeInput<
  TAccountCollectionMetadata extends string = string,
  TAccountCollectionAuthority extends string = string,
  TAccountCollectionMint extends string = string,
  TAccountBubblegumSigner extends string = string,
  TAccountCollectionAuthorityRecord extends string = string,
> = {
  /** Collection Metadata account */
  collectionMetadata: Address<TAccountCollectionMetadata>;
  /** Collection Update authority */
  collectionAuthority: TransactionSigner<TAccountCollectionAuthority>;
  /** Mint of the Collection */
  collectionMint: Address<TAccountCollectionMint>;
  /** Signing PDA of Bubblegum program */
  bubblegumSigner: TransactionSigner<TAccountBubblegumSigner>;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: Address<TAccountCollectionAuthorityRecord>;
  setCollectionSizeArgs: BubblegumSetCollectionSizeInstructionDataArgs['setCollectionSizeArgs'];
};

export function getBubblegumSetCollectionSizeInstruction<
  TAccountCollectionMetadata extends string,
  TAccountCollectionAuthority extends string,
  TAccountCollectionMint extends string,
  TAccountBubblegumSigner extends string,
  TAccountCollectionAuthorityRecord extends string,
>(
  input: BubblegumSetCollectionSizeInput<
    TAccountCollectionMetadata,
    TAccountCollectionAuthority,
    TAccountCollectionMint,
    TAccountBubblegumSigner,
    TAccountCollectionAuthorityRecord
  >
): BubblegumSetCollectionSizeInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountCollectionMetadata,
  TAccountCollectionAuthority,
  TAccountCollectionMint,
  TAccountBubblegumSigner,
  TAccountCollectionAuthorityRecord
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    collectionMetadata: {
      value: input.collectionMetadata ?? null,
      isWritable: true,
    },
    collectionAuthority: {
      value: input.collectionAuthority ?? null,
      isWritable: false,
    },
    collectionMint: { value: input.collectionMint ?? null, isWritable: false },
    bubblegumSigner: {
      value: input.bubblegumSigner ?? null,
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

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.collectionMetadata),
      getAccountMeta(accounts.collectionAuthority),
      getAccountMeta(accounts.collectionMint),
      getAccountMeta(accounts.bubblegumSigner),
      getAccountMeta(accounts.collectionAuthorityRecord),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getBubblegumSetCollectionSizeInstructionDataEncoder().encode(
      args as BubblegumSetCollectionSizeInstructionDataArgs
    ),
  } as BubblegumSetCollectionSizeInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountCollectionMetadata,
    TAccountCollectionAuthority,
    TAccountCollectionMint,
    TAccountBubblegumSigner,
    TAccountCollectionAuthorityRecord
  >;

  return instruction;
}

export type ParsedBubblegumSetCollectionSizeInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Collection Metadata account */
    collectionMetadata: TAccountMetas[0];
    /** Collection Update authority */
    collectionAuthority: TAccountMetas[1];
    /** Mint of the Collection */
    collectionMint: TAccountMetas[2];
    /** Signing PDA of Bubblegum program */
    bubblegumSigner: TAccountMetas[3];
    /** Collection Authority Record PDA */
    collectionAuthorityRecord?: TAccountMetas[4] | undefined;
  };
  data: BubblegumSetCollectionSizeInstructionData;
};

export function parseBubblegumSetCollectionSizeInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBubblegumSetCollectionSizeInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  let optionalAccountsRemaining = instruction.accounts.length - 4;
  const getNextOptionalAccount = () => {
    if (optionalAccountsRemaining === 0) return undefined;
    optionalAccountsRemaining -= 1;
    return getNextAccount();
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      collectionMetadata: getNextAccount(),
      collectionAuthority: getNextAccount(),
      collectionMint: getNextAccount(),
      bubblegumSigner: getNextAccount(),
      collectionAuthorityRecord: getNextOptionalAccount(),
    },
    data: getBubblegumSetCollectionSizeInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
