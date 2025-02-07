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
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const DEPRECATED_CREATE_MASTER_EDITION_DISCRIMINATOR = 2;

export function getDeprecatedCreateMasterEditionDiscriminatorBytes() {
  return getU8Encoder().encode(DEPRECATED_CREATE_MASTER_EDITION_DISCRIMINATOR);
}

export type DeprecatedCreateMasterEditionInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountEdition extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountPrintingMint extends string | IAccountMeta<string> = string,
  TAccountOneTimePrintingAuthorizationMint extends
    | string
    | IAccountMeta<string> = string,
  TAccountUpdateAuthority extends string | IAccountMeta<string> = string,
  TAccountPrintingMintAuthority extends string | IAccountMeta<string> = string,
  TAccountMintAuthority extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountRent extends
    | string
    | IAccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TAccountOneTimePrintingAuthorizationMintAuthority extends
    | string
    | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountEdition extends string
        ? WritableAccount<TAccountEdition>
        : TAccountEdition,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountPrintingMint extends string
        ? WritableAccount<TAccountPrintingMint>
        : TAccountPrintingMint,
      TAccountOneTimePrintingAuthorizationMint extends string
        ? WritableAccount<TAccountOneTimePrintingAuthorizationMint>
        : TAccountOneTimePrintingAuthorizationMint,
      TAccountUpdateAuthority extends string
        ? ReadonlySignerAccount<TAccountUpdateAuthority> &
            IAccountSignerMeta<TAccountUpdateAuthority>
        : TAccountUpdateAuthority,
      TAccountPrintingMintAuthority extends string
        ? ReadonlySignerAccount<TAccountPrintingMintAuthority> &
            IAccountSignerMeta<TAccountPrintingMintAuthority>
        : TAccountPrintingMintAuthority,
      TAccountMintAuthority extends string
        ? ReadonlySignerAccount<TAccountMintAuthority> &
            IAccountSignerMeta<TAccountMintAuthority>
        : TAccountMintAuthority,
      TAccountMetadata extends string
        ? ReadonlyAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountPayer extends string
        ? ReadonlySignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      TAccountOneTimePrintingAuthorizationMintAuthority extends string
        ? ReadonlySignerAccount<TAccountOneTimePrintingAuthorizationMintAuthority> &
            IAccountSignerMeta<TAccountOneTimePrintingAuthorizationMintAuthority>
        : TAccountOneTimePrintingAuthorizationMintAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type DeprecatedCreateMasterEditionInstructionData = {
  discriminator: number;
};

export type DeprecatedCreateMasterEditionInstructionDataArgs = {};

export function getDeprecatedCreateMasterEditionInstructionDataEncoder(): Encoder<DeprecatedCreateMasterEditionInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: DEPRECATED_CREATE_MASTER_EDITION_DISCRIMINATOR,
    })
  );
}

export function getDeprecatedCreateMasterEditionInstructionDataDecoder(): Decoder<DeprecatedCreateMasterEditionInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getDeprecatedCreateMasterEditionInstructionDataCodec(): Codec<
  DeprecatedCreateMasterEditionInstructionDataArgs,
  DeprecatedCreateMasterEditionInstructionData
> {
  return combineCodec(
    getDeprecatedCreateMasterEditionInstructionDataEncoder(),
    getDeprecatedCreateMasterEditionInstructionDataDecoder()
  );
}

export type DeprecatedCreateMasterEditionInput<
  TAccountEdition extends string = string,
  TAccountMint extends string = string,
  TAccountPrintingMint extends string = string,
  TAccountOneTimePrintingAuthorizationMint extends string = string,
  TAccountUpdateAuthority extends string = string,
  TAccountPrintingMintAuthority extends string = string,
  TAccountMintAuthority extends string = string,
  TAccountMetadata extends string = string,
  TAccountPayer extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountRent extends string = string,
  TAccountOneTimePrintingAuthorizationMintAuthority extends string = string,
> = {
  /** Unallocated edition V1 account with address as pda of ['metadata', program id, mint, 'edition'] */
  edition: Address<TAccountEdition>;
  /** Metadata mint */
  mint: Address<TAccountMint>;
  /** Printing mint - A mint you control that can mint tokens that can be exchanged for limited editions of your master edition via the MintNewEditionFromMasterEditionViaToken endpoint */
  printingMint: Address<TAccountPrintingMint>;
  /** One time authorization printing mint - A mint you control that prints tokens that gives the bearer permission to mint any number of tokens from the printing mint one time via an endpoint with the token-metadata program for your metadata. Also burns the token. */
  oneTimePrintingAuthorizationMint: Address<TAccountOneTimePrintingAuthorizationMint>;
  /** Current Update authority key */
  updateAuthority: TransactionSigner<TAccountUpdateAuthority>;
  /** Printing mint authority - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY. */
  printingMintAuthority: TransactionSigner<TAccountPrintingMintAuthority>;
  /** Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  mintAuthority: TransactionSigner<TAccountMintAuthority>;
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** payer */
  payer: TransactionSigner<TAccountPayer>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Rent info */
  rent?: Address<TAccountRent>;
  /** One time authorization printing mint authority - must be provided if using max supply. THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY. */
  oneTimePrintingAuthorizationMintAuthority: TransactionSigner<TAccountOneTimePrintingAuthorizationMintAuthority>;
};

export function getDeprecatedCreateMasterEditionInstruction<
  TAccountEdition extends string,
  TAccountMint extends string,
  TAccountPrintingMint extends string,
  TAccountOneTimePrintingAuthorizationMint extends string,
  TAccountUpdateAuthority extends string,
  TAccountPrintingMintAuthority extends string,
  TAccountMintAuthority extends string,
  TAccountMetadata extends string,
  TAccountPayer extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountRent extends string,
  TAccountOneTimePrintingAuthorizationMintAuthority extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: DeprecatedCreateMasterEditionInput<
    TAccountEdition,
    TAccountMint,
    TAccountPrintingMint,
    TAccountOneTimePrintingAuthorizationMint,
    TAccountUpdateAuthority,
    TAccountPrintingMintAuthority,
    TAccountMintAuthority,
    TAccountMetadata,
    TAccountPayer,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountRent,
    TAccountOneTimePrintingAuthorizationMintAuthority
  >,
  config?: { programAddress?: TProgramAddress }
): DeprecatedCreateMasterEditionInstruction<
  TProgramAddress,
  TAccountEdition,
  TAccountMint,
  TAccountPrintingMint,
  TAccountOneTimePrintingAuthorizationMint,
  TAccountUpdateAuthority,
  TAccountPrintingMintAuthority,
  TAccountMintAuthority,
  TAccountMetadata,
  TAccountPayer,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountRent,
  TAccountOneTimePrintingAuthorizationMintAuthority
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    edition: { value: input.edition ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    printingMint: { value: input.printingMint ?? null, isWritable: true },
    oneTimePrintingAuthorizationMint: {
      value: input.oneTimePrintingAuthorizationMint ?? null,
      isWritable: true,
    },
    updateAuthority: {
      value: input.updateAuthority ?? null,
      isWritable: false,
    },
    printingMintAuthority: {
      value: input.printingMintAuthority ?? null,
      isWritable: false,
    },
    mintAuthority: { value: input.mintAuthority ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    rent: { value: input.rent ?? null, isWritable: false },
    oneTimePrintingAuthorizationMintAuthority: {
      value: input.oneTimePrintingAuthorizationMintAuthority ?? null,
      isWritable: false,
    },
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
  if (!accounts.rent.value) {
    accounts.rent.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.edition),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.printingMint),
      getAccountMeta(accounts.oneTimePrintingAuthorizationMint),
      getAccountMeta(accounts.updateAuthority),
      getAccountMeta(accounts.printingMintAuthority),
      getAccountMeta(accounts.mintAuthority),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.rent),
      getAccountMeta(accounts.oneTimePrintingAuthorizationMintAuthority),
    ],
    programAddress,
    data: getDeprecatedCreateMasterEditionInstructionDataEncoder().encode({}),
  } as DeprecatedCreateMasterEditionInstruction<
    TProgramAddress,
    TAccountEdition,
    TAccountMint,
    TAccountPrintingMint,
    TAccountOneTimePrintingAuthorizationMint,
    TAccountUpdateAuthority,
    TAccountPrintingMintAuthority,
    TAccountMintAuthority,
    TAccountMetadata,
    TAccountPayer,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountRent,
    TAccountOneTimePrintingAuthorizationMintAuthority
  >;

  return instruction;
}

export type ParsedDeprecatedCreateMasterEditionInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Unallocated edition V1 account with address as pda of ['metadata', program id, mint, 'edition'] */
    edition: TAccountMetas[0];
    /** Metadata mint */
    mint: TAccountMetas[1];
    /** Printing mint - A mint you control that can mint tokens that can be exchanged for limited editions of your master edition via the MintNewEditionFromMasterEditionViaToken endpoint */
    printingMint: TAccountMetas[2];
    /** One time authorization printing mint - A mint you control that prints tokens that gives the bearer permission to mint any number of tokens from the printing mint one time via an endpoint with the token-metadata program for your metadata. Also burns the token. */
    oneTimePrintingAuthorizationMint: TAccountMetas[3];
    /** Current Update authority key */
    updateAuthority: TAccountMetas[4];
    /** Printing mint authority - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY. */
    printingMintAuthority: TAccountMetas[5];
    /** Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
    mintAuthority: TAccountMetas[6];
    /** Metadata account */
    metadata: TAccountMetas[7];
    /** payer */
    payer: TAccountMetas[8];
    /** Token program */
    tokenProgram: TAccountMetas[9];
    /** System program */
    systemProgram: TAccountMetas[10];
    /** Rent info */
    rent: TAccountMetas[11];
    /** One time authorization printing mint authority - must be provided if using max supply. THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY. */
    oneTimePrintingAuthorizationMintAuthority: TAccountMetas[12];
  };
  data: DeprecatedCreateMasterEditionInstructionData;
};

export function parseDeprecatedCreateMasterEditionInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDeprecatedCreateMasterEditionInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 13) {
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
      edition: getNextAccount(),
      mint: getNextAccount(),
      printingMint: getNextAccount(),
      oneTimePrintingAuthorizationMint: getNextAccount(),
      updateAuthority: getNextAccount(),
      printingMintAuthority: getNextAccount(),
      mintAuthority: getNextAccount(),
      metadata: getNextAccount(),
      payer: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      rent: getNextAccount(),
      oneTimePrintingAuthorizationMintAuthority: getNextAccount(),
    },
    data: getDeprecatedCreateMasterEditionInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
