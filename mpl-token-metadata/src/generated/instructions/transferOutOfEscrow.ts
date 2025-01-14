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
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const TRANSFER_OUT_OF_ESCROW_DISCRIMINATOR = 40;

export function getTransferOutOfEscrowDiscriminatorBytes() {
  return getU8Encoder().encode(TRANSFER_OUT_OF_ESCROW_DISCRIMINATOR);
}

export type TransferOutOfEscrowInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountEscrow extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountAttributeMint extends string | IAccountMeta<string> = string,
  TAccountAttributeSrc extends string | IAccountMeta<string> = string,
  TAccountAttributeDst extends string | IAccountMeta<string> = string,
  TAccountEscrowMint extends string | IAccountMeta<string> = string,
  TAccountEscrowAccount extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountAtaProgram extends
    | string
    | IAccountMeta<string> = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSysvarInstructions extends
    | string
    | IAccountMeta<string> = 'Sysvar1nstructions1111111111111111111111111',
  TAccountAuthority extends
    | string
    | IAccountMeta<string>
    | undefined = undefined,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountEscrow extends string
        ? ReadonlyAccount<TAccountEscrow>
        : TAccountEscrow,
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountAttributeMint extends string
        ? ReadonlyAccount<TAccountAttributeMint>
        : TAccountAttributeMint,
      TAccountAttributeSrc extends string
        ? WritableAccount<TAccountAttributeSrc>
        : TAccountAttributeSrc,
      TAccountAttributeDst extends string
        ? WritableAccount<TAccountAttributeDst>
        : TAccountAttributeDst,
      TAccountEscrowMint extends string
        ? ReadonlyAccount<TAccountEscrowMint>
        : TAccountEscrowMint,
      TAccountEscrowAccount extends string
        ? ReadonlyAccount<TAccountEscrowAccount>
        : TAccountEscrowAccount,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountAtaProgram extends string
        ? ReadonlyAccount<TAccountAtaProgram>
        : TAccountAtaProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSysvarInstructions extends string
        ? ReadonlyAccount<TAccountSysvarInstructions>
        : TAccountSysvarInstructions,
      ...(TAccountAuthority extends undefined
        ? []
        : [
            TAccountAuthority extends string
              ? ReadonlySignerAccount<TAccountAuthority> &
                  IAccountSignerMeta<TAccountAuthority>
              : TAccountAuthority,
          ]),
      ...TRemainingAccounts,
    ]
  >;

export type TransferOutOfEscrowInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type TransferOutOfEscrowInstructionDataArgs = {
  amount: number | bigint;
};

export function getTransferOutOfEscrowInstructionDataEncoder(): Encoder<TransferOutOfEscrowInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: TRANSFER_OUT_OF_ESCROW_DISCRIMINATOR,
    })
  );
}

export function getTransferOutOfEscrowInstructionDataDecoder(): Decoder<TransferOutOfEscrowInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
  ]);
}

export function getTransferOutOfEscrowInstructionDataCodec(): Codec<
  TransferOutOfEscrowInstructionDataArgs,
  TransferOutOfEscrowInstructionData
> {
  return combineCodec(
    getTransferOutOfEscrowInstructionDataEncoder(),
    getTransferOutOfEscrowInstructionDataDecoder()
  );
}

export type TransferOutOfEscrowInput<
  TAccountEscrow extends string = string,
  TAccountMetadata extends string = string,
  TAccountPayer extends string = string,
  TAccountAttributeMint extends string = string,
  TAccountAttributeSrc extends string = string,
  TAccountAttributeDst extends string = string,
  TAccountEscrowMint extends string = string,
  TAccountEscrowAccount extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountAtaProgram extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSysvarInstructions extends string = string,
  TAccountAuthority extends string = string,
> = {
  /** Escrow account */
  escrow: Address<TAccountEscrow>;
  /** Metadata account */
  metadata: Address<TAccountMetadata>;
  /** Wallet paying for the transaction and new account */
  payer: TransactionSigner<TAccountPayer>;
  /** Mint account for the new attribute */
  attributeMint: Address<TAccountAttributeMint>;
  /** Token account source for the new attribute */
  attributeSrc: Address<TAccountAttributeSrc>;
  /** Token account, owned by TM, destination for the new attribute */
  attributeDst: Address<TAccountAttributeDst>;
  /** Mint account that the escrow is attached */
  escrowMint: Address<TAccountEscrowMint>;
  /** Token account that holds the token the escrow is attached to */
  escrowAccount: Address<TAccountEscrowAccount>;
  /** System program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** Associated Token program */
  ataProgram?: Address<TAccountAtaProgram>;
  /** Token program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** Instructions sysvar account */
  sysvarInstructions?: Address<TAccountSysvarInstructions>;
  /** Authority/creator of the escrow account */
  authority?: TransactionSigner<TAccountAuthority>;
  amount: TransferOutOfEscrowInstructionDataArgs['amount'];
};

export function getTransferOutOfEscrowInstruction<
  TAccountEscrow extends string,
  TAccountMetadata extends string,
  TAccountPayer extends string,
  TAccountAttributeMint extends string,
  TAccountAttributeSrc extends string,
  TAccountAttributeDst extends string,
  TAccountEscrowMint extends string,
  TAccountEscrowAccount extends string,
  TAccountSystemProgram extends string,
  TAccountAtaProgram extends string,
  TAccountTokenProgram extends string,
  TAccountSysvarInstructions extends string,
  TAccountAuthority extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: TransferOutOfEscrowInput<
    TAccountEscrow,
    TAccountMetadata,
    TAccountPayer,
    TAccountAttributeMint,
    TAccountAttributeSrc,
    TAccountAttributeDst,
    TAccountEscrowMint,
    TAccountEscrowAccount,
    TAccountSystemProgram,
    TAccountAtaProgram,
    TAccountTokenProgram,
    TAccountSysvarInstructions,
    TAccountAuthority
  >,
  config?: { programAddress?: TProgramAddress }
): TransferOutOfEscrowInstruction<
  TProgramAddress,
  TAccountEscrow,
  TAccountMetadata,
  TAccountPayer,
  TAccountAttributeMint,
  TAccountAttributeSrc,
  TAccountAttributeDst,
  TAccountEscrowMint,
  TAccountEscrowAccount,
  TAccountSystemProgram,
  TAccountAtaProgram,
  TAccountTokenProgram,
  TAccountSysvarInstructions,
  TAccountAuthority
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    escrow: { value: input.escrow ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    attributeMint: { value: input.attributeMint ?? null, isWritable: false },
    attributeSrc: { value: input.attributeSrc ?? null, isWritable: true },
    attributeDst: { value: input.attributeDst ?? null, isWritable: true },
    escrowMint: { value: input.escrowMint ?? null, isWritable: false },
    escrowAccount: { value: input.escrowAccount ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    ataProgram: { value: input.ataProgram ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    sysvarInstructions: {
      value: input.sysvarInstructions ?? null,
      isWritable: false,
    },
    authority: { value: input.authority ?? null, isWritable: false },
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
  if (!accounts.ataProgram.value) {
    accounts.ataProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.sysvarInstructions.value) {
    accounts.sysvarInstructions.value =
      'Sysvar1nstructions1111111111111111111111111' as Address<'Sysvar1nstructions1111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'omitted');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.escrow),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.attributeMint),
      getAccountMeta(accounts.attributeSrc),
      getAccountMeta(accounts.attributeDst),
      getAccountMeta(accounts.escrowMint),
      getAccountMeta(accounts.escrowAccount),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.ataProgram),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.sysvarInstructions),
      getAccountMeta(accounts.authority),
    ].filter(<T,>(x: T | undefined): x is T => x !== undefined),
    programAddress,
    data: getTransferOutOfEscrowInstructionDataEncoder().encode(
      args as TransferOutOfEscrowInstructionDataArgs
    ),
  } as TransferOutOfEscrowInstruction<
    TProgramAddress,
    TAccountEscrow,
    TAccountMetadata,
    TAccountPayer,
    TAccountAttributeMint,
    TAccountAttributeSrc,
    TAccountAttributeDst,
    TAccountEscrowMint,
    TAccountEscrowAccount,
    TAccountSystemProgram,
    TAccountAtaProgram,
    TAccountTokenProgram,
    TAccountSysvarInstructions,
    TAccountAuthority
  >;

  return instruction;
}

export type ParsedTransferOutOfEscrowInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Escrow account */
    escrow: TAccountMetas[0];
    /** Metadata account */
    metadata: TAccountMetas[1];
    /** Wallet paying for the transaction and new account */
    payer: TAccountMetas[2];
    /** Mint account for the new attribute */
    attributeMint: TAccountMetas[3];
    /** Token account source for the new attribute */
    attributeSrc: TAccountMetas[4];
    /** Token account, owned by TM, destination for the new attribute */
    attributeDst: TAccountMetas[5];
    /** Mint account that the escrow is attached */
    escrowMint: TAccountMetas[6];
    /** Token account that holds the token the escrow is attached to */
    escrowAccount: TAccountMetas[7];
    /** System program */
    systemProgram: TAccountMetas[8];
    /** Associated Token program */
    ataProgram: TAccountMetas[9];
    /** Token program */
    tokenProgram: TAccountMetas[10];
    /** Instructions sysvar account */
    sysvarInstructions: TAccountMetas[11];
    /** Authority/creator of the escrow account */
    authority?: TAccountMetas[12] | undefined;
  };
  data: TransferOutOfEscrowInstructionData;
};

export function parseTransferOutOfEscrowInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedTransferOutOfEscrowInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 12) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  let optionalAccountsRemaining = instruction.accounts.length - 12;
  const getNextOptionalAccount = () => {
    if (optionalAccountsRemaining === 0) return undefined;
    optionalAccountsRemaining -= 1;
    return getNextAccount();
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      escrow: getNextAccount(),
      metadata: getNextAccount(),
      payer: getNextAccount(),
      attributeMint: getNextAccount(),
      attributeSrc: getNextAccount(),
      attributeDst: getNextAccount(),
      escrowMint: getNextAccount(),
      escrowAccount: getNextAccount(),
      systemProgram: getNextAccount(),
      ataProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
      sysvarInstructions: getNextAccount(),
      authority: getNextOptionalAccount(),
    },
    data: getTransferOutOfEscrowInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
