/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
import { findMasterEditionPda } from '../pdas';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';
import {
  getCollectionDecoder,
  getCollectionDetailsDecoder,
  getCollectionDetailsEncoder,
  getCollectionEncoder,
  getCreatorDecoder,
  getCreatorEncoder,
  getPrintSupplyDecoder,
  getPrintSupplyEncoder,
  getTokenStandardDecoder,
  getTokenStandardEncoder,
  getUsesDecoder,
  getUsesEncoder,
  type Collection,
  type CollectionArgs,
  type CollectionDetails,
  type CollectionDetailsArgs,
  type Creator,
  type CreatorArgs,
  type PrintSupply,
  type PrintSupplyArgs,
  type TokenStandard,
  type TokenStandardArgs,
  type Uses,
  type UsesArgs,
} from '../types';

export const CREATE_V1_DISCRIMINATOR = 42;

export function getCreateV1DiscriminatorBytes() {
  return getU8Encoder().encode(CREATE_V1_DISCRIMINATOR);
}

export type CreateV1Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountMasterEdition extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountSysvarInstructions extends
    | string
    | IAccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TAccountSplTokenProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountUpdateAuthority extends string
        ? ReadonlyAccount<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
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

export type CreateV1InstructionData = {
  discriminator: number;
  createV1Discriminator: number;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Option<Array<Creator>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  tokenStandard: TokenStandard;
  collection: Option<Collection>;
  uses: Option<Uses>;
  collectionDetails: Option<CollectionDetails>;
  ruleSet: Option<Address>;
  decimals: Option<number>;
  printSupply: Option<PrintSupply>;
};

export type CreateV1InstructionDataArgs = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: OptionOrNullable<Array<CreatorArgs>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  tokenStandard: TokenStandardArgs;
  collection: OptionOrNullable<CollectionArgs>;
  uses: OptionOrNullable<UsesArgs>;
  collectionDetails: OptionOrNullable<CollectionDetailsArgs>;
  ruleSet: OptionOrNullable<Address>;
  decimals: OptionOrNullable<number>;
  printSupply: OptionOrNullable<PrintSupplyArgs>;
};

export function getCreateV1InstructionDataEncoder(): Encoder<CreateV1InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['createV1Discriminator', getU8Encoder()],
      ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['sellerFeeBasisPoints', getU16Encoder()],
      ['creators', getOptionEncoder(getArrayEncoder(getCreatorEncoder()))],
      ['primarySaleHappened', getBooleanEncoder()],
      ['isMutable', getBooleanEncoder()],
      ['tokenStandard', getTokenStandardEncoder()],
      ['collection', getOptionEncoder(getCollectionEncoder())],
      ['uses', getOptionEncoder(getUsesEncoder())],
      ['collectionDetails', getOptionEncoder(getCollectionDetailsEncoder())],
      ['ruleSet', getOptionEncoder(getAddressEncoder())],
      ['decimals', getOptionEncoder(getU8Encoder())],
      ['printSupply', getOptionEncoder(getPrintSupplyEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: CREATE_V1_DISCRIMINATOR,
      createV1Discriminator: 0,
    })
  );
}

export function getCreateV1InstructionDataDecoder(): Decoder<CreateV1InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['createV1Discriminator', getU8Decoder()],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['creators', getOptionDecoder(getArrayDecoder(getCreatorDecoder()))],
    ['primarySaleHappened', getBooleanDecoder()],
    ['isMutable', getBooleanDecoder()],
    ['tokenStandard', getTokenStandardDecoder()],
    ['collection', getOptionDecoder(getCollectionDecoder())],
    ['uses', getOptionDecoder(getUsesDecoder())],
    ['collectionDetails', getOptionDecoder(getCollectionDetailsDecoder())],
    ['ruleSet', getOptionDecoder(getAddressDecoder())],
    ['decimals', getOptionDecoder(getU8Decoder())],
    ['printSupply', getOptionDecoder(getPrintSupplyDecoder())],
  ]);
}

export function getCreateV1InstructionDataCodec(): Codec<
  CreateV1InstructionDataArgs,
  CreateV1InstructionData
> {
  return combineCodec(
    getCreateV1InstructionDataEncoder(),
    getCreateV1InstructionDataDecoder()
  );
}

export type CreateV1AsyncInput<
  TAccountMetadata extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
  TAccountSplTokenProgram extends string = string,
> = {
  /** Unallocated metadata account with address as pda of ['metadata', program id, mint id] */
  metadata: Address<TAccountMetadata>;
  /** Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition'] */
  masterEdition?: Address<TAccountMasterEdition>;
  /** Mint of token asset */
  mint: Address<TAccountMint> | TransactionSigner<TAccountMint>;
  /** Mint authority */
  authority: TransactionSigner<TAccountAuthority>;
  /** Payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Update authority for the metadata account */
  updateAuthority:
    | Address<TAccountUpdateAuthority>
    | TransactionSigner<TAccountUpdateAuthority>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  /** SPL Token program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
  name: CreateV1InstructionDataArgs['name'];
  symbol: CreateV1InstructionDataArgs['symbol'];
  uri: CreateV1InstructionDataArgs['uri'];
  sellerFeeBasisPoints: CreateV1InstructionDataArgs['sellerFeeBasisPoints'];
  creators: CreateV1InstructionDataArgs['creators'];
  primarySaleHappened: CreateV1InstructionDataArgs['primarySaleHappened'];
  isMutable: CreateV1InstructionDataArgs['isMutable'];
  tokenStandard: CreateV1InstructionDataArgs['tokenStandard'];
  collection: CreateV1InstructionDataArgs['collection'];
  uses: CreateV1InstructionDataArgs['uses'];
  collectionDetails: CreateV1InstructionDataArgs['collectionDetails'];
  ruleSet: CreateV1InstructionDataArgs['ruleSet'];
  decimals: CreateV1InstructionDataArgs['decimals'];
  printSupply: CreateV1InstructionDataArgs['printSupply'];
};

export async function getCreateV1InstructionAsync<
  TAccountMetadata extends string,
  TAccountMasterEdition extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountUpdateAuthority extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
  TAccountSplTokenProgram extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: CreateV1AsyncInput<
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountMint,
    TAccountAuthority,
    TAccountPayer,
    TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  CreateV1Instruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountMasterEdition,
    (typeof input)['mint'] extends TransactionSigner<TAccountMint>
      ? WritableSignerAccount<TAccountMint> & IAccountSignerMeta<TAccountMint>
      : TAccountMint,
    TAccountAuthority,
    TAccountPayer,
    (typeof input)['updateAuthority'] extends TransactionSigner<TAccountUpdateAuthority>
      ? ReadonlySignerAccount<TAccountUpdateAuthority> &
          IAccountSignerMeta<TAccountUpdateAuthority>
      : TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
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
  if (!accounts.masterEdition.value) {
    accounts.masterEdition.value = await findMasterEditionPda({
      mint: expectAddress(accounts.mint.value),
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.sysvarInstructions.value) {
    accounts.sysvarInstructions.value =
      'Sysvar1nstructions1111111111111111111111111' as Address<'Sysvar1nstructions1111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
      getAccountMeta(accounts.splTokenProgram),
    ],
    programAddress,
    data: getCreateV1InstructionDataEncoder().encode(
      args as CreateV1InstructionDataArgs
    ),
  } as CreateV1Instruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountMasterEdition,
    (typeof input)['mint'] extends TransactionSigner<TAccountMint>
      ? WritableSignerAccount<TAccountMint> & IAccountSignerMeta<TAccountMint>
      : TAccountMint,
    TAccountAuthority,
    TAccountPayer,
    (typeof input)['updateAuthority'] extends TransactionSigner<TAccountUpdateAuthority>
      ? ReadonlySignerAccount<TAccountUpdateAuthority> &
          IAccountSignerMeta<TAccountUpdateAuthority>
      : TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >;

  return instruction;
}

export type CreateV1Input<
  TAccountMetadata extends string = string,
  TAccountMasterEdition extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
  TAccountPayer extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
  TAccountSplTokenProgram extends string = string,
> = {
  /** Unallocated metadata account with address as pda of ['metadata', program id, mint id] */
  metadata: Address<TAccountMetadata>;
  /** Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition'] */
  masterEdition?: Address<TAccountMasterEdition>;
  /** Mint of token asset */
  mint: Address<TAccountMint> | TransactionSigner<TAccountMint>;
  /** Mint authority */
  authority: TransactionSigner<TAccountAuthority>;
  /** Payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Update authority for the metadata account */
  updateAuthority:
    | Address<TAccountUpdateAuthority>
    | TransactionSigner<TAccountUpdateAuthority>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  /** SPL Token program */
  splTokenProgram?: Address<TAccountSplTokenProgram>;
  name: CreateV1InstructionDataArgs['name'];
  symbol: CreateV1InstructionDataArgs['symbol'];
  uri: CreateV1InstructionDataArgs['uri'];
  sellerFeeBasisPoints: CreateV1InstructionDataArgs['sellerFeeBasisPoints'];
  creators: CreateV1InstructionDataArgs['creators'];
  primarySaleHappened: CreateV1InstructionDataArgs['primarySaleHappened'];
  isMutable: CreateV1InstructionDataArgs['isMutable'];
  tokenStandard: CreateV1InstructionDataArgs['tokenStandard'];
  collection: CreateV1InstructionDataArgs['collection'];
  uses: CreateV1InstructionDataArgs['uses'];
  collectionDetails: CreateV1InstructionDataArgs['collectionDetails'];
  ruleSet: CreateV1InstructionDataArgs['ruleSet'];
  decimals: CreateV1InstructionDataArgs['decimals'];
  printSupply: CreateV1InstructionDataArgs['printSupply'];
};

export function getCreateV1Instruction<
  TAccountMetadata extends string,
  TAccountMasterEdition extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
  TAccountPayer extends string,
  TAccountUpdateAuthority extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
  TAccountSplTokenProgram extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: CreateV1Input<
    TAccountMetadata,
    TAccountMasterEdition,
    TAccountMint,
    TAccountAuthority,
    TAccountPayer,
    TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): CreateV1Instruction<
  TProgramAddress,
  TAccountMetadata,
  TAccountMasterEdition,
  (typeof input)['mint'] extends TransactionSigner<TAccountMint>
    ? WritableSignerAccount<TAccountMint> & IAccountSignerMeta<TAccountMint>
    : TAccountMint,
  TAccountAuthority,
  TAccountPayer,
  (typeof input)['updateAuthority'] extends TransactionSigner<TAccountUpdateAuthority>
    ? ReadonlySignerAccount<TAccountUpdateAuthority> &
        IAccountSignerMeta<TAccountUpdateAuthority>
    : TAccountUpdateAuthority,
  TAccountSystemProgram,
  TAccountSysvarInstructions,
  TAccountSplTokenProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    metadata: { value: input.metadata ?? null, isWritable: true },
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
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

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
      getAccountMeta(accounts.splTokenProgram),
    ],
    programAddress,
    data: getCreateV1InstructionDataEncoder().encode(
      args as CreateV1InstructionDataArgs
    ),
  } as CreateV1Instruction<
    TProgramAddress,
    TAccountMetadata,
    TAccountMasterEdition,
    (typeof input)['mint'] extends TransactionSigner<TAccountMint>
      ? WritableSignerAccount<TAccountMint> & IAccountSignerMeta<TAccountMint>
      : TAccountMint,
    TAccountAuthority,
    TAccountPayer,
    (typeof input)['updateAuthority'] extends TransactionSigner<TAccountUpdateAuthority>
      ? ReadonlySignerAccount<TAccountUpdateAuthority> &
          IAccountSignerMeta<TAccountUpdateAuthority>
      : TAccountUpdateAuthority,
    TAccountSystemProgram,
    TAccountSysvarInstructions,
    TAccountSplTokenProgram
  >;

  return instruction;
}

export type ParsedCreateV1Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Unallocated metadata account with address as pda of ['metadata', program id, mint id] */
    metadata: TAccountMetas[0];
    /** Unallocated edition account with address as pda of ['metadata', program id, mint, 'edition'] */
    masterEdition?: TAccountMetas[1] | undefined;
    /** Mint of token asset */
    mint: TAccountMetas[2];
    /** Mint authority */
    authority: TAccountMetas[3];
    /** Payer */
    payer: TAccountMetas[4];
    /** Update authority for the metadata account */
    updateAuthority: TAccountMetas[5];
    /** System program */
    systemProgram: TAccountMetas[6];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[7];
    /** SPL Token program */
    splTokenProgram?: TAccountMetas[8] | undefined;
  };
  data: CreateV1InstructionData;
};

export function parseCreateV1Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateV1Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 9) {
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
      metadata: getNextAccount(),
      masterEdition: getNextOptionalAccount(),
      mint: getNextAccount(),
      authority: getNextAccount(),
      payer: getNextAccount(),
      updateAuthority: getNextAccount(),
      systemProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
      splTokenProgram: getNextOptionalAccount(),
    },
    data: getCreateV1InstructionDataDecoder().decode(instruction.data),
  };
}
