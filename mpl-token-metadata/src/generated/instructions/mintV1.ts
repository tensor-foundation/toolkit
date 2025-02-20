/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
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
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getAuthorizationDataDecoder,
  getAuthorizationDataEncoder,
  type AuthorizationData,
  type AuthorizationDataArgs,
} from '../types';

export const MINT_V1_DISCRIMINATOR = 43;

export function getMintV1DiscriminatorBytes() {
  return getU8Encoder().encode(MINT_V1_DISCRIMINATOR);
}

export type MintV1Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountToken extends string | IAccountMeta<string> = string,
  TAccountTokenOwner extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountMasterEdition extends string | IAccountMeta<string> = string,
  TAccountTokenRecord extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountDelegateRecord extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountSysvarInstructions extends
    | string
    | IAccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TAccountSplTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSplAtaProgram extends
    | string
    | IAccountMeta<string> = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  TAccountAuthorizationRulesProgram extends
    | string
    | IAccountMeta<string> = string,
  TAccountAuthorizationRules extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountToken extends string
        ? WritableAccount<TAccountToken>
        : TAccountToken,
      TAccountTokenOwner extends string
        ? ReadonlyAccount<TAccountTokenOwner>
        : TAccountTokenOwner,
      TAccountMetadata extends string
        ? ReadonlyAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountTokenRecord extends string
        ? WritableAccount<TAccountTokenRecord>
        : TAccountTokenRecord,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountDelegateRecord extends string
        ? ReadonlyAccount<TAccountDelegateRecord>
        : TAccountDelegateRecord,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountSysvarInstructions extends string
        ? ReadonlyAccount<TAccountSysvarInstructions>
        : TAccountSysvarInstructions,
      TAccountSplTokenProgram extends string
        ? ReadonlyAccount<TAccountSplTokenProgram>
        : TAccountSplTokenProgram,
      TAccountSplAtaProgram extends string
        ? ReadonlyAccount<TAccountSplAtaProgram>
        : TAccountSplAtaProgram,
      TAccountAuthorizationRulesProgram extends string
        ? ReadonlyAccount<TAccountAuthorizationRulesProgram>
        : TAccountAuthorizationRulesProgram,
      TAccountAuthorizationRules extends string
        ? ReadonlyAccount<TAccountAuthorizationRules>
        : TAccountAuthorizationRules,
      ...TRemainingAccounts,
    ]
  >;

export type MintV1InstructionData = {
  discriminator: number;
  mintV1Discriminator: number;
  amount: bigint;
  authorizationData: Option<AuthorizationData>;
};

export type MintV1InstructionDataArgs = {
  amount: number | bigint;
  authorizationData: OptionOrNullable<AuthorizationDataArgs>;
};

export function getMintV1InstructionDataEncoder(): Encoder<MintV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['mintV1Discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
      ['authorizationData', getOptionEncoder(getAuthorizationDataEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: MINT_V1_DISCRIMINATOR,
      mintV1Discriminator: 0,
    })
  );
}

export function getMintV1InstructionDataDecoder(): Decoder<MintV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['mintV1Discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
    ['authorizationData', getOptionDecoder(getAuthorizationDataDecoder())],
  ]);
}

export function getMintV1InstructionDataCodec(): Codec<
  MintV1InstructionDataArgs,
  MintV1InstructionData
> {
  return combineCodec(
    getMintV1InstructionDataEncoder(),
    getMintV1InstructionDataDecoder()
  );
}

export type MintV1Input<
  TAccountToken extends string = string,
  TAccountTokenOwner extends string = string,
  TAccountMetadata extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountTokenRecord extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
  TAccountDelegateRecord extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
  TAccountSplTokenProgram extends string = string,
  TAccountSplAtaProgram extends string = string,
  TAccountAuthorizationRulesProgram extends string = string,
  TAccountAuthorizationRules extends string = string,
> = {
  /** Token or Associated Token account */
  token: Address<TAccountToken>;
  /** Owner of the token account */
  tokenOwner?: Address<TAccountTokenOwner>;
  /** Metadata account (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** Master Edition account */
  masterEdition?: Address<TAccountMasterEdition>;
  /** Token record account */
  tokenRecord?: Address<TAccountTokenRecord>;
  /** Mint of token asset */
  mint: Address<TAccountMint>;
  /** (Mint or Update) authority */
  authority: TransactionSigner<TAccountAuthority>;
  /** Metadata delegate record */
  delegateRecord?: Address<TAccountDelegateRecord>;
  /** Payer */
  payer: TransactionSigner<TAccountPayer>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  /** SPL Token program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
  /** SPL Associated Token Account program */
  splAtaProgram?: Address<TAccountSplAtaProgram>;
  /** Token Authorization Rules program */
  authorizationRulesProgram?: Address<TAccountAuthorizationRulesProgram>;
  /** Token Authorization Rules account */
  authorizationRules?: Address<TAccountAuthorizationRules>;
  amount: MintV1InstructionDataArgs['amount'];
  authorizationData: MintV1InstructionDataArgs['authorizationData'];
};

export function getMintV1Instruction<
  TAccountToken extends string,
  TAccountTokenOwner extends string,
  TAccountMetadata extends string,
  TAccountMasterEdition extends string,
  TAccountTokenRecord extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
  TAccountDelegateRecord extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
  TAccountSplTokenProgram extends string,
  TAccountSplAtaProgram extends string,
  TAccountAuthorizationRulesProgram extends string,
  TAccountAuthorizationRules extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: MintV1Input<
    TAccountToken,
    TAccountTokenOwner,
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountTokenRecord,
    TAccountMint,
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram,
    TAccountSplAtaProgram,
    TAccountAuthorizationRulesProgram,
    TAccountAuthorizationRules
  >,
  config?: { programAddress?: TProgramAddress }
): MintV1Instruction<
  TProgramAddress,
  TAccountToken,
  TAccountTokenOwner,
  TAccountMetadata,
  TAccountMasterEdition,
  TAccountTokenRecord,
  TAccountMint,
  TAccountAuthority,
  TAccountDelegateRecord,
  TAccountPayer,
  TAccountSystemProgram,
  TAccountSysvarInstructions,
  TAccountSplTokenProgram,
  TAccountSplAtaProgram,
  TAccountAuthorizationRulesProgram,
  TAccountAuthorizationRules
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    token: { value: input.token ?? null, isWritable: true },
    tokenOwner: { value: input.tokenOwner ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: false },
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    tokenRecord: { value: input.tokenRecord ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    delegateRecord: { value: input.delegateRecord ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sysvarInstructions: {
      value: input.sysvarInstructions ?? null,
      isWritable: false,
    },
    splTokenProgram: {
      value: input.splTokenProgram ?? null,
      isWritable: false,
    },
    splAtaProgram: { value: input.splAtaProgram ?? null, isWritable: false },
    authorizationRulesProgram: {
      value: input.authorizationRulesProgram ?? null,
      isWritable: false,
    },
    authorizationRules: {
      value: input.authorizationRules ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.sysvarInstructions.value) {
    accounts.sysvarInstructions.value =
      'Sysvar1nstructions1111111111111111111111111' as Address<'Sysvar1nstructions1111111111111111111111111'>;
  }
  if (!accounts.splTokenProgram.value) {
    accounts.splTokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.splAtaProgram.value) {
    accounts.splAtaProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.token),
      getAccountMeta(accounts.tokenOwner),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.tokenRecord),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.delegateRecord),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
      getAccountMeta(accounts.splTokenProgram),
      getAccountMeta(accounts.splAtaProgram),
      getAccountMeta(accounts.authorizationRulesProgram),
      getAccountMeta(accounts.authorizationRules),
    ],
    programAddress,
    data: getMintV1InstructionDataEncoder().encode(
      args as MintV1InstructionDataArgs
    ),
  } as MintV1Instruction<
    TProgramAddress,
    TAccountToken,
    TAccountTokenOwner,
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountTokenRecord,
    TAccountMint,
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram,
    TAccountSplAtaProgram,
    TAccountAuthorizationRulesProgram,
    TAccountAuthorizationRules
  >;

  return instruction;
}

export type ParsedMintV1Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Token or Associated Token account */
    token: TAccountMetas[0];
    /** Owner of the token account */
    tokenOwner?: TAccountMetas[1] | undefined;
    /** Metadata account (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[2];
    /** Master Edition account */
    masterEdition?: TAccountMetas[3] | undefined;
    /** Token record account */
    tokenRecord?: TAccountMetas[4] | undefined;
    /** Mint of token asset */
    mint: TAccountMetas[5];
    /** (Mint or Update) authority */
    authority: TAccountMetas[6];
    /** Metadata delegate record */
    delegateRecord?: TAccountMetas[7] | undefined;
    /** Payer */
    payer: TAccountMetas[8];
    /** System program */
    systemProgram: TAccountMetas[9];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[10];
    /** SPL Token program */
    splTokenProgram: TAccountMetas[11];
    /** SPL Associated Token Account program */
    splAtaProgram: TAccountMetas[12];
    /** Token Authorization Rules program */
    authorizationRulesProgram?: TAccountMetas[13] | undefined;
    /** Token Authorization Rules account */
    authorizationRules?: TAccountMetas[14] | undefined;
  };
  data: MintV1InstructionData;
};

export function parseMintV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedMintV1Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 15) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === TOKEN_METADATA_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      token: getNextAccount(),
      tokenOwner: getNextOptionalAccount(),
      metadata: getNextAccount(),
      masterEdition: getNextOptionalAccount(),
      tokenRecord: getNextOptionalAccount(),
      mint: getNextAccount(),
      authority: getNextAccount(),
      delegateRecord: getNextOptionalAccount(),
      payer: getNextAccount(),
      systemProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
      splTokenProgram: getNextAccount(),
      splAtaProgram: getNextAccount(),
      authorizationRulesProgram: getNextOptionalAccount(),
      authorizationRules: getNextOptionalAccount(),
    },
    data: getMintV1InstructionDataDecoder().decode(instruction.data),
  };
}
