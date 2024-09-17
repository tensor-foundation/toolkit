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

export type RevokeUseAuthorityInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountUseAuthorityRecord extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TAccountUser extends string | IAccountMeta<string> = string,
  TAccountOwnerTokenAccount extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountRent extends string | IAccountMeta<string> | undefined = undefined,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountUseAuthorityRecord extends string
        ? WritableAccount<TAccountUseAuthorityRecord>
        : TAccountUseAuthorityRecord,
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            IAccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountUser extends string
        ? ReadonlyAccount<TAccountUser>
        : TAccountUser,
      TAccountOwnerTokenAccount extends string
        ? WritableAccount<TAccountOwnerTokenAccount>
        : TAccountOwnerTokenAccount,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountMetadata extends string
        ? ReadonlyAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...(TAccountRent extends undefined
        ? []
        : [
            TAccountRent extends string
              ? ReadonlyAccount<TAccountRent>
              : TAccountRent,
          ]),
      ...TRemainingAccounts,
    ]
  >;

export type RevokeUseAuthorityInstructionData = { discriminator: number };

export type RevokeUseAuthorityInstructionDataArgs = {};

export function getRevokeUseAuthorityInstructionDataEncoder(): Encoder<RevokeUseAuthorityInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 21 })
  );
}

export function getRevokeUseAuthorityInstructionDataDecoder(): Decoder<RevokeUseAuthorityInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getRevokeUseAuthorityInstructionDataCodec(): Codec<
  RevokeUseAuthorityInstructionDataArgs,
  RevokeUseAuthorityInstructionData
> {
  return combineCodec(
    getRevokeUseAuthorityInstructionDataEncoder(),
    getRevokeUseAuthorityInstructionDataDecoder()
  );
}

export type RevokeUseAuthorityInput<
  TAccountUseAuthorityRecord extends string = string,
  TAccountOwner extends string = string,
  TAccountUser extends string = string,
  TAccountOwnerTokenAccount extends string = string,
  TAccountMint extends string = string,
  TAccountMetadata extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountRent extends string = string,
> = {
  /** Use Authority Record PDA */
  useAuthorityRecord: Address<TAccountUseAuthorityRecord>;
  /** Owner */
  owner: TransactionSigner<TAccountOwner>;
  /** A Use Authority */
  user: Address<TAccountUser>;
  /** Owned Token Account Of Mint */
  ownerTokenAccount: Address<TAccountOwnerTokenAccount>;
  /** Mint of Metadata */
  mint: Address<TAccountMint>;
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Rent info */
  rent?: Address<TAccountRent>;
};

export function getRevokeUseAuthorityInstruction<
  TAccountUseAuthorityRecord extends string,
  TAccountOwner extends string,
  TAccountUser extends string,
  TAccountOwnerTokenAccount extends string,
  TAccountMint extends string,
  TAccountMetadata extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountRent extends string,
>(
  input: RevokeUseAuthorityInput<
    TAccountUseAuthorityRecord,
    TAccountOwner,
    TAccountUser,
    TAccountOwnerTokenAccount,
    TAccountMint,
    TAccountMetadata,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountRent
  >
): RevokeUseAuthorityInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountUseAuthorityRecord,
  TAccountOwner,
  TAccountUser,
  TAccountOwnerTokenAccount,
  TAccountMint,
  TAccountMetadata,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountRent
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    useAuthorityRecord: {
      value: input.useAuthorityRecord ?? null,
      isWritable: true,
    },
    owner: { value: input.owner ?? null, isWritable: true },
    user: { value: input.user ?? null, isWritable: false },
    ownerTokenAccount: {
      value: input.ownerTokenAccount ?? null,
      isWritable: true,
    },
    mint: { value: input.mint ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.useAuthorityRecord),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.ownerTokenAccount),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.rent),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getRevokeUseAuthorityInstructionDataEncoder().encode({}),
  } as RevokeUseAuthorityInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountUseAuthorityRecord,
    TAccountOwner,
    TAccountUser,
    TAccountOwnerTokenAccount,
    TAccountMint,
    TAccountMetadata,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountRent
  >;

  return instruction;
}

export type ParsedRevokeUseAuthorityInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Use Authority Record PDA */
    useAuthorityRecord: TAccountMetas[0];
    /** Owner */
    owner: TAccountMetas[1];
    /** A Use Authority */
    user: TAccountMetas[2];
    /** Owned Token Account Of Mint */
    ownerTokenAccount: TAccountMetas[3];
    /** Mint of Metadata */
    mint: TAccountMetas[4];
    /** Metadata account */
    metadata: TAccountMetas[5];
    /** Token program */
    tokenProgram: TAccountMetas[6];
    /** System program */
    systemProgram: TAccountMetas[7];
    /** Rent info */
    rent?: TAccountMetas[8] | undefined;
  };
  data: RevokeUseAuthorityInstructionData;
};

export function parseRevokeUseAuthorityInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedRevokeUseAuthorityInstruction<TProgram, TAccountMetas> {
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
  let optionalAccountsRemaining = instruction.accounts.length - 8;
  const getNextOptionalAccount = () => {
    if (optionalAccountsRemaining === 0) return undefined;
    optionalAccountsRemaining -= 1;
    return getNextAccount();
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      useAuthorityRecord: getNextAccount(),
      owner: getNextAccount(),
      user: getNextAccount(),
      ownerTokenAccount: getNextAccount(),
      mint: getNextAccount(),
      metadata: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      rent: getNextOptionalAccount(),
    },
    data: getRevokeUseAuthorityInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
