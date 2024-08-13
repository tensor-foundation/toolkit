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
  ReadonlyUint8Array,
  TransactionSigner,
  WritableAccount,
  WritableSignerAccount,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
} from '@solana/web3.js';
import { WEN_NEW_STANDARD_PROGRAM_ADDRESS } from '../programs';
import {
  ResolvedAccount,
  expectAddress,
  getAccountMetaFactory,
} from '../shared';

export type FreezeMintAccountInstruction<
  TProgram extends string = typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountUser extends string | IAccountMeta<string> = string,
  TAccountDelegateAuthority extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountMintTokenAccount extends string | IAccountMeta<string> = string,
  TAccountManager extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountUser extends string
        ? ReadonlyAccount<TAccountUser>
        : TAccountUser,
      TAccountDelegateAuthority extends string
        ? WritableSignerAccount<TAccountDelegateAuthority> &
            IAccountSignerMeta<TAccountDelegateAuthority>
        : TAccountDelegateAuthority,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountMintTokenAccount extends string
        ? WritableAccount<TAccountMintTokenAccount>
        : TAccountMintTokenAccount,
      TAccountManager extends string
        ? ReadonlyAccount<TAccountManager>
        : TAccountManager,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type FreezeMintAccountInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type FreezeMintAccountInstructionDataArgs = {};

export function getFreezeMintAccountInstructionDataEncoder(): Encoder<FreezeMintAccountInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([171, 30, 154, 191, 27, 0, 134, 216]),
    })
  );
}

export function getFreezeMintAccountInstructionDataDecoder(): Decoder<FreezeMintAccountInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getFreezeMintAccountInstructionDataCodec(): Codec<
  FreezeMintAccountInstructionDataArgs,
  FreezeMintAccountInstructionData
> {
  return combineCodec(
    getFreezeMintAccountInstructionDataEncoder(),
    getFreezeMintAccountInstructionDataDecoder()
  );
}

export type FreezeMintAccountAsyncInput<
  TAccountUser extends string = string,
  TAccountDelegateAuthority extends string = string,
  TAccountMint extends string = string,
  TAccountMintTokenAccount extends string = string,
  TAccountManager extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  user: Address<TAccountUser>;
  delegateAuthority: TransactionSigner<TAccountDelegateAuthority>;
  mint: Address<TAccountMint>;
  mintTokenAccount?: Address<TAccountMintTokenAccount>;
  manager?: Address<TAccountManager>;
  tokenProgram?: Address<TAccountTokenProgram>;
};

export async function getFreezeMintAccountInstructionAsync<
  TAccountUser extends string,
  TAccountDelegateAuthority extends string,
  TAccountMint extends string,
  TAccountMintTokenAccount extends string,
  TAccountManager extends string,
  TAccountTokenProgram extends string,
>(
  input: FreezeMintAccountAsyncInput<
    TAccountUser,
    TAccountDelegateAuthority,
    TAccountMint,
    TAccountMintTokenAccount,
    TAccountManager,
    TAccountTokenProgram
  >
): Promise<
  FreezeMintAccountInstruction<
    typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
    TAccountUser,
    TAccountDelegateAuthority,
    TAccountMint,
    TAccountMintTokenAccount,
    TAccountManager,
    TAccountTokenProgram
  >
> {
  // Program address.
  const programAddress = WEN_NEW_STANDARD_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    user: { value: input.user ?? null, isWritable: false },
    delegateAuthority: {
      value: input.delegateAuthority ?? null,
      isWritable: true,
    },
    mint: { value: input.mint ?? null, isWritable: false },
    mintTokenAccount: {
      value: input.mintTokenAccount ?? null,
      isWritable: true,
    },
    manager: { value: input.manager ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>;
  }
  if (!accounts.mintTokenAccount.value) {
    accounts.mintTokenAccount.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getAddressEncoder().encode(expectAddress(accounts.user.value)),
        getAddressEncoder().encode(expectAddress(accounts.tokenProgram.value)),
        getAddressEncoder().encode(expectAddress(accounts.mint.value)),
      ],
    });
  }
  if (!accounts.manager.value) {
    accounts.manager.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([109, 97, 110, 97, 103, 101, 114])
        ),
      ],
    });
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.delegateAuthority),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.mintTokenAccount),
      getAccountMeta(accounts.manager),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getFreezeMintAccountInstructionDataEncoder().encode({}),
  } as FreezeMintAccountInstruction<
    typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
    TAccountUser,
    TAccountDelegateAuthority,
    TAccountMint,
    TAccountMintTokenAccount,
    TAccountManager,
    TAccountTokenProgram
  >;

  return instruction;
}

export type FreezeMintAccountInput<
  TAccountUser extends string = string,
  TAccountDelegateAuthority extends string = string,
  TAccountMint extends string = string,
  TAccountMintTokenAccount extends string = string,
  TAccountManager extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  user: Address<TAccountUser>;
  delegateAuthority: TransactionSigner<TAccountDelegateAuthority>;
  mint: Address<TAccountMint>;
  mintTokenAccount: Address<TAccountMintTokenAccount>;
  manager: Address<TAccountManager>;
  tokenProgram?: Address<TAccountTokenProgram>;
};

export function getFreezeMintAccountInstruction<
  TAccountUser extends string,
  TAccountDelegateAuthority extends string,
  TAccountMint extends string,
  TAccountMintTokenAccount extends string,
  TAccountManager extends string,
  TAccountTokenProgram extends string,
>(
  input: FreezeMintAccountInput<
    TAccountUser,
    TAccountDelegateAuthority,
    TAccountMint,
    TAccountMintTokenAccount,
    TAccountManager,
    TAccountTokenProgram
  >
): FreezeMintAccountInstruction<
  typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountUser,
  TAccountDelegateAuthority,
  TAccountMint,
  TAccountMintTokenAccount,
  TAccountManager,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = WEN_NEW_STANDARD_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    user: { value: input.user ?? null, isWritable: false },
    delegateAuthority: {
      value: input.delegateAuthority ?? null,
      isWritable: true,
    },
    mint: { value: input.mint ?? null, isWritable: false },
    mintTokenAccount: {
      value: input.mintTokenAccount ?? null,
      isWritable: true,
    },
    manager: { value: input.manager ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' as Address<'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.delegateAuthority),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.mintTokenAccount),
      getAccountMeta(accounts.manager),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getFreezeMintAccountInstructionDataEncoder().encode({}),
  } as FreezeMintAccountInstruction<
    typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
    TAccountUser,
    TAccountDelegateAuthority,
    TAccountMint,
    TAccountMintTokenAccount,
    TAccountManager,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedFreezeMintAccountInstruction<
  TProgram extends string = typeof WEN_NEW_STANDARD_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    user: TAccountMetas[0];
    delegateAuthority: TAccountMetas[1];
    mint: TAccountMetas[2];
    mintTokenAccount: TAccountMetas[3];
    manager: TAccountMetas[4];
    tokenProgram: TAccountMetas[5];
  };
  data: FreezeMintAccountInstructionData;
};

export function parseFreezeMintAccountInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedFreezeMintAccountInstruction<TProgram, TAccountMetas> {
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
  return {
    programAddress: instruction.programAddress,
    accounts: {
      user: getNextAccount(),
      delegateAuthority: getNextAccount(),
      mint: getNextAccount(),
      mintTokenAccount: getNextAccount(),
      manager: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getFreezeMintAccountInstructionDataDecoder().decode(instruction.data),
  };
}
