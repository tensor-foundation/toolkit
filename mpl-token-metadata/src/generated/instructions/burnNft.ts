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
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type BurnNftInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountTokenAccount extends string | IAccountMeta<string> = string,
  TAccountMasterEditionAccount extends string | IAccountMeta<string> = string,
  TAccountSplTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountCollectionMetadata extends
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
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountTokenAccount extends string
        ? WritableAccount<TAccountTokenAccount>
        : TAccountTokenAccount,
      TAccountMasterEditionAccount extends string
        ? WritableAccount<TAccountMasterEditionAccount>
        : TAccountMasterEditionAccount,
      TAccountSplTokenProgram extends string
        ? ReadonlyAccount<TAccountSplTokenProgram>
        : TAccountSplTokenProgram,
      ...(TAccountCollectionMetadata extends undefined
        ? []
        : [
            TAccountCollectionMetadata extends string
              ? WritableAccount<TAccountCollectionMetadata>
              : TAccountCollectionMetadata,
          ]),
      ...TRemainingAccounts,
    ]
  >;

export type BurnNftInstructionData = { discriminator: number };

export type BurnNftInstructionDataArgs = {};

export function getBurnNftInstructionDataEncoder(): Encoder<BurnNftInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 29 })
  );
}

export function getBurnNftInstructionDataDecoder(): Decoder<BurnNftInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getBurnNftInstructionDataCodec(): Codec<
  BurnNftInstructionDataArgs,
  BurnNftInstructionData
> {
  return combineCodec(
    getBurnNftInstructionDataEncoder(),
    getBurnNftInstructionDataDecoder()
  );
}

export type BurnNftInput<
  TAccountMetadata extends string = string,
  TAccountOwner extends string = string,
  TAccountMint extends string = string,
  TAccountTokenAccount extends string = string,
  TAccountMasterEditionAccount extends string = string,
  TAccountSplTokenProgram extends string = string,
  TAccountCollectionMetadata extends string = string,
> = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** NFT owner */
  owner: TransactionSigner<TAccountOwner>;
  /** Mint of the NFT */
  mint: Address<TAccountMint>;
  /** Token account to close */
  tokenAccount: Address<TAccountTokenAccount>;
  /** MasterEdition2 of the NFT */
  masterEditionAccount: Address<TAccountMasterEditionAccount>;
  /** SPL Token Program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
  /** Metadata of the Collection */
  collectionMetadata?: Address<TAccountCollectionMetadata>;
};

export function getBurnNftInstruction<
  TAccountMetadata extends string,
  TAccountOwner extends string,
  TAccountMint extends string,
  TAccountTokenAccount extends string,
  TAccountMasterEditionAccount extends string,
  TAccountSplTokenProgram extends string,
  TAccountCollectionMetadata extends string,
>(
  input: BurnNftInput<
    TAccountMetadata,
    TAccountOwner,
    TAccountMint,
    TAccountTokenAccount,
    TAccountMasterEditionAccount,
    TAccountSplTokenProgram,
    TAccountCollectionMetadata
  >
): BurnNftInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata,
  TAccountOwner,
  TAccountMint,
  TAccountTokenAccount,
  TAccountMasterEditionAccount,
  TAccountSplTokenProgram,
  TAccountCollectionMetadata
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    tokenAccount: { value: input.tokenAccount ?? null, isWritable: true },
    masterEditionAccount: {
      value: input.masterEditionAccount ?? null,
      isWritable: true,
    },
    splTokenProgram: {
      value: input.splTokenProgram ?? null,
      isWritable: false,
    },
    collectionMetadata: {
      value: input.collectionMetadata ?? null,
      isWritable: true,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.splTokenProgram.value) {
    accounts.splTokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.tokenAccount),
      getAccountMeta(accounts.masterEditionAccount),
      getAccountMeta(accounts.splTokenProgram),
      getAccountMeta(accounts.collectionMetadata),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getBurnNftInstructionDataEncoder().encode({}),
  } as BurnNftInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountMetadata,
    TAccountOwner,
    TAccountMint,
    TAccountTokenAccount,
    TAccountMasterEditionAccount,
    TAccountSplTokenProgram,
    TAccountCollectionMetadata
  >;

  return instruction;
}

export type ParsedBurnNftInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Metadata (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[0];
    /** NFT owner */
    owner: TAccountMetas[1];
    /** Mint of the NFT */
    mint: TAccountMetas[2];
    /** Token account to close */
    tokenAccount: TAccountMetas[3];
    /** MasterEdition2 of the NFT */
    masterEditionAccount: TAccountMetas[4];
    /** SPL Token Program */
    splTokenProgram: TAccountMetas[5];
    /** Metadata of the Collection */
    collectionMetadata?: TAccountMetas[6] | undefined;
  };
  data: BurnNftInstructionData;
};

export function parseBurnNftInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnNftInstruction<TProgram, TAccountMetas> {
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
      owner: getNextAccount(),
      mint: getNextAccount(),
      tokenAccount: getNextAccount(),
      masterEditionAccount: getNextAccount(),
      splTokenProgram: getNextAccount(),
      collectionMetadata: getNextOptionalAccount(),
    },
    data: getBurnNftInstructionDataDecoder().decode(instruction.data),
  };
}
