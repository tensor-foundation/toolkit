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
  getVerificationArgsDecoder,
  getVerificationArgsEncoder,
  type VerificationArgs,
  type VerificationArgsArgs,
} from '../types';

export type VerifyInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountDelegateRecord extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountCollectionMint extends string | IAccountMeta<string> = string,
  TAccountCollectionMetadata extends string | IAccountMeta<string> = string,
  TAccountCollectionMasterEdition extends
    | string
    | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountSysvarInstructions extends
    | string
    | IAccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountDelegateRecord extends string
        ? ReadonlyAccount<TAccountDelegateRecord>
        : TAccountDelegateRecord,
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountCollectionMint extends string
        ? ReadonlyAccount<TAccountCollectionMint>
        : TAccountCollectionMint,
      TAccountCollectionMetadata extends string
        ? WritableAccount<TAccountCollectionMetadata>
        : TAccountCollectionMetadata,
      TAccountCollectionMasterEdition extends string
        ? ReadonlyAccount<TAccountCollectionMasterEdition>
        : TAccountCollectionMasterEdition,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountSysvarInstructions extends string
        ? ReadonlyAccount<TAccountSysvarInstructions>
        : TAccountSysvarInstructions,
      ...TRemainingAccounts,
    ]
  >;

export type VerifyInstructionData = {
  discriminator: number;
  verificationArgs: VerificationArgs;
};

export type VerifyInstructionDataArgs = {
  verificationArgs: VerificationArgsArgs;
};

export function getVerifyInstructionDataEncoder(): Encoder<VerifyInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['verificationArgs', getVerificationArgsEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 52 })
  );
}

export function getVerifyInstructionDataDecoder(): Decoder<VerifyInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['verificationArgs', getVerificationArgsDecoder()],
  ]);
}

export function getVerifyInstructionDataCodec(): Codec<
  VerifyInstructionDataArgs,
  VerifyInstructionData
> {
  return combineCodec(
    getVerifyInstructionDataEncoder(),
    getVerifyInstructionDataDecoder()
  );
}

export type VerifyInput<
  TAccountAuthority extends string = string,
  TAccountDelegateRecord extends string = string,
  TAccountMetadata extends string = string,
  TAccountCollectionMint extends string = string,
  TAccountCollectionMetadata extends string = string,
  TAccountCollectionMasterEdition extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
> = {
  /** Creator to verify, collection update authority or delegate */
  authority: TransactionSigner<TAccountAuthority>;
  /** Delegate record PDA */
  delegateRecord?: Address<TAccountDelegateRecord>;
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Mint of the Collection */
  collectionMint?: Address<TAccountCollectionMint>;
  /** Metadata Account of the Collection */
  collectionMetadata?: Address<TAccountCollectionMetadata>;
  /** Master Edition Account of the Collection Token */
  collectionMasterEdition?: Address<TAccountCollectionMasterEdition>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  verificationArgs: VerifyInstructionDataArgs['verificationArgs'];
};

export function getVerifyInstruction<
  TAccountAuthority extends string,
  TAccountDelegateRecord extends string,
  TAccountMetadata extends string,
  TAccountCollectionMint extends string,
  TAccountCollectionMetadata extends string,
  TAccountCollectionMasterEdition extends string,
  TAccountSystemProgram extends string,
  TAccountSysvarInstructions extends string,
>(
  input: VerifyInput<
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountMetadata,
    TAccountCollectionMint,
    TAccountCollectionMetadata,
    TAccountCollectionMasterEdition,
    TAccountSystemProgram,
    TAccountSysvarInstructions
  >
): VerifyInstruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountAuthority,
  TAccountDelegateRecord,
  TAccountMetadata,
  TAccountCollectionMint,
  TAccountCollectionMetadata,
  TAccountCollectionMasterEdition,
  TAccountSystemProgram,
  TAccountSysvarInstructions
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: false },
    delegateRecord: { value: input.delegateRecord ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: true },
    collectionMint: { value: input.collectionMint ?? null, isWritable: false },
    collectionMetadata: {
      value: input.collectionMetadata ?? null,
      isWritable: true,
    },
    collectionMasterEdition: {
      value: input.collectionMasterEdition ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    sysvarInstructions: {
      value: input.sysvarInstructions ?? null,
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
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.delegateRecord),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.collectionMint),
      getAccountMeta(accounts.collectionMetadata),
      getAccountMeta(accounts.collectionMasterEdition),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.sysvarInstructions),
    ],
    programAddress,
    data: getVerifyInstructionDataEncoder().encode(
      args as VerifyInstructionDataArgs
    ),
  } as VerifyInstruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountAuthority,
    TAccountDelegateRecord,
    TAccountMetadata,
    TAccountCollectionMint,
    TAccountCollectionMetadata,
    TAccountCollectionMasterEdition,
    TAccountSystemProgram,
    TAccountSysvarInstructions
  >;

  return instruction;
}

export type ParsedVerifyInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Creator to verify, collection update authority or delegate */
    authority: TAccountMetas[0];
    /** Delegate record PDA */
    delegateRecord?: TAccountMetas[1] | undefined;
    /** Metadata account */
    metadata: TAccountMetas[2];
    /** Mint of the Collection */
    collectionMint?: TAccountMetas[3] | undefined;
    /** Metadata Account of the Collection */
    collectionMetadata?: TAccountMetas[4] | undefined;
    /** Master Edition Account of the Collection Token */
    collectionMasterEdition?: TAccountMetas[5] | undefined;
    /** System program */
    systemProgram: TAccountMetas[6];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[7];
  };
  data: VerifyInstructionData;
};

export function parseVerifyInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedVerifyInstruction<TProgram, TAccountMetas> {
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
      delegateRecord: getNextOptionalAccount(),
      metadata: getNextAccount(),
      collectionMint: getNextOptionalAccount(),
      collectionMetadata: getNextOptionalAccount(),
      collectionMasterEdition: getNextOptionalAccount(),
      systemProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
    },
    data: getVerifyInstructionDataDecoder().decode(instruction.data),
  };
}
