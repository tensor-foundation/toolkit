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
import {
  getBurnArgsDecoder,
  getBurnArgsEncoder,
  type BurnArgs,
  type BurnArgsArgs,
} from '../types';

export type BurnInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountCollectionMetadata extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountEdition extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountToken extends string | IAccountMeta<string> = string,
  TAccountMasterEdition extends string | IAccountMeta<string> = string,
  TAccountMasterEditionMint extends string | IAccountMeta<string> = string,
  TAccountMasterEditionToken extends string | IAccountMeta<string> = string,
  TAccountEditionMarker extends string | IAccountMeta<string> = string,
  TAccountTokenRecord extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountSysvarInstructions extends
    | string
    | IAccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TAccountSplTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountCollectionMetadata extends string
        ? WritableAccount<TAccountCollectionMetadata>
        : TAccountCollectionMetadata,
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountEdition extends string
        ? WritableAccount<TAccountEdition>
        : TAccountEdition,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountToken extends string
        ? WritableAccount<TAccountToken>
        : TAccountToken,
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountMasterEditionMint extends string
        ? ReadonlyAccount<TAccountMasterEditionMint>
        : TAccountMasterEditionMint,
      TAccountMasterEditionToken extends string
        ? ReadonlyAccount<TAccountMasterEditionToken>
        : TAccountMasterEditionToken,
      TAccountEditionMarker extends string
        ? WritableAccount<TAccountEditionMarker>
        : TAccountEditionMarker,
      TAccountTokenRecord extends string
        ? WritableAccount<TAccountTokenRecord>
        : TAccountTokenRecord,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountSysvarInstructions extends string
        ? ReadonlyAccount<TAccountSysvarInstructions>
        : TAccountSysvarInstructions,
      TAccountSplTokenProgram extends string
        ? ReadonlyAccount<TAccountSplTokenProgram>
        : TAccountSplTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type BurnInstructionData = { discriminator: number; burnArgs: BurnArgs };

export type BurnInstructionDataArgs = { burnArgs: BurnArgsArgs };

export function getBurnInstructionDataEncoder(): Encoder<BurnInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['burnArgs', getBurnArgsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 41 })
  );
}

export function getBurnInstructionDataDecoder(): Decoder<BurnInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['burnArgs', getBurnArgsDecoder()],
  ]);
}

export function getBurnInstructionDataCodec(): Codec<
  BurnInstructionDataArgs,
  BurnInstructionData
> {
  return combineCodec(
    getBurnInstructionDataEncoder(),
    getBurnInstructionDataDecoder()
  );
}

export type BurnInput<
  TAccountAuthority extends string = string,
  TAccountCollectionMetadata extends string = string,
  TAccountMetadata extends string = string,
  TAccountEdition extends string = string,
  TAccountMint extends string = string,
  TAccountToken extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountMasterEditionMint extends string = string,
  TAccountMasterEditionToken extends string = string,
  TAccountEditionMarker extends string = string,
  TAccountTokenRecord extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
  TAccountSplTokenProgram extends string = string,
> = {
  /** Asset owner or Utility delegate */
  authority: TransactionSigner<TAccountAuthority>;
  /** Metadata of the Collection */
  collectionMetadata?: Address<TAccountCollectionMetadata>;
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: Address<TAccountMetadata>;
  /** Edition of the asset */
  edition?: Address<TAccountEdition>;
  /** Mint of token asset */
  mint: Address<TAccountMint>;
  /** Token account to close */
  token: Address<TAccountToken>;
  /** Master edition account */
  masterEdition?: Address<TAccountMasterEdition>;
  /** Master edition mint of the asset */
  masterEditionMint?: Address<TAccountMasterEditionMint>;
  /** Master edition token account */
  masterEditionToken?: Address<TAccountMasterEditionToken>;
  /** Edition marker account */
  editionMarker?: Address<TAccountEditionMarker>;
  /** Token record account */
  tokenRecord?: Address<TAccountTokenRecord>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  /** SPL Token Program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
  burnArgs: BurnInstructionDataArgs['burnArgs'];
};

export function getBurnInstruction<
  TAccountAuthority extends string,
  TAccountCollectionMetadata extends string,
  TAccountMetadata extends string,
  TAccountEdition extends string,
  TAccountMint extends string,
  TAccountToken extends string,
  TAccountMasterEdition extends string,
  TAccountMasterEditionMint extends string,
  TAccountMasterEditionToken extends string,
  TAccountEditionMarker extends string,
  TAccountTokenRecord extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
  TAccountSplTokenProgram extends string,
>(
  input: BurnInput<
    TAccountAuthority,
    TAccountCollectionMetadata,
    TAccountMetadata,
    TAccountEdition,
    TAccountMint,
    TAccountToken,
    TAccountMasterEdition,
    TAccountMasterEditionMint,
    TAccountMasterEditionToken,
    TAccountEditionMarker,
    TAccountTokenRecord,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >
): BurnInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority,
  TAccountCollectionMetadata,
  TAccountMetadata,
  TAccountEdition,
  TAccountMint,
  TAccountToken,
  TAccountMasterEdition,
  TAccountMasterEditionMint,
  TAccountMasterEditionToken,
  TAccountEditionMarker,
  TAccountTokenRecord,
  TAccountSystemProgram,
  TAccountSysvarInstructions,
  TAccountSplTokenProgram
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    collectionMetadata: {
      value: input.collectionMetadata ?? null,
      isWritable: true,
    },
    metadata: { value: input.metadata ?? null, isWritable: true },
    edition: { value: input.edition ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    token: { value: input.token ?? null, isWritable: true },
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    masterEditionMint: {
      value: input.masterEditionMint ?? null,
      isWritable: false,
    },
    masterEditionToken: {
      value: input.masterEditionToken ?? null,
      isWritable: false,
    },
    editionMarker: { value: input.editionMarker ?? null, isWritable: true },
    tokenRecord: { value: input.tokenRecord ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sysvarInstructions: {
      value: input.sysvarInstructions ?? null,
      isWritable: false,
    },
    splTokenProgram: {
      value: input.splTokenProgram ?? null,
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

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.collectionMetadata),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.edition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.token),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.masterEditionMint),
      getAccountMeta(accounts.masterEditionToken),
      getAccountMeta(accounts.editionMarker),
      getAccountMeta(accounts.tokenRecord),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
      getAccountMeta(accounts.splTokenProgram),
    ],
    programAddress,
    data: getBurnInstructionDataEncoder().encode(
      args as BurnInstructionDataArgs
    ),
  } as BurnInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountAuthority,
    TAccountCollectionMetadata,
    TAccountMetadata,
    TAccountEdition,
    TAccountMint,
    TAccountToken,
    TAccountMasterEdition,
    TAccountMasterEditionMint,
    TAccountMasterEditionToken,
    TAccountEditionMarker,
    TAccountTokenRecord,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >;

  return instruction;
}

export type ParsedBurnInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Asset owner or Utility delegate */
    authority: TAccountMetas[0];
    /** Metadata of the Collection */
    collectionMetadata?: TAccountMetas[1] | undefined;
    /** Metadata (pda of ['metadata', program id, mint id]) */
    metadata: TAccountMetas[2];
    /** Edition of the asset */
    edition?: TAccountMetas[3] | undefined;
    /** Mint of token asset */
    mint: TAccountMetas[4];
    /** Token account to close */
    token: TAccountMetas[5];
    /** Master edition account */
    masterEdition?: TAccountMetas[6] | undefined;
    /** Master edition mint of the asset */
    masterEditionMint?: TAccountMetas[7] | undefined;
    /** Master edition token account */
    masterEditionToken?: TAccountMetas[8] | undefined;
    /** Edition marker account */
    editionMarker?: TAccountMetas[9] | undefined;
    /** Token record account */
    tokenRecord?: TAccountMetas[10] | undefined;
    /** System program */
    systemProgram: TAccountMetas[11];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[12];
    /** SPL Token Program */
    splTokenProgram: TAccountMetas[13];
  };
  data: BurnInstructionData;
};

export function parseBurnInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 14) {
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
      authority: getNextAccount(),
      collectionMetadata: getNextOptionalAccount(),
      metadata: getNextAccount(),
      edition: getNextOptionalAccount(),
      mint: getNextAccount(),
      token: getNextAccount(),
      masterEdition: getNextOptionalAccount(),
      masterEditionMint: getNextOptionalAccount(),
      masterEditionToken: getNextOptionalAccount(),
      editionMarker: getNextOptionalAccount(),
      tokenRecord: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
      splTokenProgram: getNextAccount(),
    },
    data: getBurnInstructionDataDecoder().decode(instruction.data),
  };
}
