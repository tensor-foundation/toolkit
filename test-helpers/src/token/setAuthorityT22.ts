import {
  AuthorityType,
  AuthorityTypeArgs,
  getAuthorityTypeDecoder,
  getAuthorityTypeEncoder,
} from '@solana-program/token';
import {
  AccountRole,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getOptionDecoder,
  getOptionEncoder,
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
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN22_PROGRAM_ID } from '../programIds';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type SetAuthorityInstruction<
  TProgram extends string = typeof TOKEN22_PROGRAM_ID,
  TAccountOwned extends string | IAccountMeta<string> = string,
  TAccountOwner extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountOwned extends string
        ? WritableAccount<TAccountOwned>
        : TAccountOwned,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      ...TRemainingAccounts,
    ]
  >;

export type SetAuthorityInstructionData = {
  discriminator: number;
  /** The type of authority to update. */
  authorityType: AuthorityType;
  /** The new authority */
  newAuthority: Option<Address>;
};

export type SetAuthorityInstructionDataArgs = {
  /** The type of authority to update. */
  authorityType: AuthorityTypeArgs;
  /** The new authority */
  newAuthority: OptionOrNullable<Address>;
};

export function getSetAuthorityInstructionDataEncoder(): Encoder<SetAuthorityInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['authorityType', getAuthorityTypeEncoder()],
      ['newAuthority', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({ ...value, discriminator: 6 })
  );
}

export function getSetAuthorityInstructionDataDecoder(): Decoder<SetAuthorityInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['authorityType', getAuthorityTypeDecoder()],
    ['newAuthority', getOptionDecoder(getAddressDecoder())],
  ]);
}

export function getSetAuthorityInstructionDataCodec(): Codec<
  SetAuthorityInstructionDataArgs,
  SetAuthorityInstructionData
> {
  return combineCodec(
    getSetAuthorityInstructionDataEncoder(),
    getSetAuthorityInstructionDataDecoder()
  );
}

export type SetAuthorityInput<
  TAccountOwned extends string = string,
  TAccountOwner extends string = string,
> = {
  /** The mint or account to change the authority of. */
  owned: Address<TAccountOwned>;
  /** The current authority or the multisignature account of the mint or account to update. */
  owner: Address<TAccountOwner> | TransactionSigner<TAccountOwner>;
  authorityType: SetAuthorityInstructionDataArgs['authorityType'];
  newAuthority: SetAuthorityInstructionDataArgs['newAuthority'];
  multiSigners?: Array<TransactionSigner>;
};

export function getSetAuthorityInstruction<
  TAccountOwned extends string,
  TAccountOwner extends string,
>(
  input: SetAuthorityInput<TAccountOwned, TAccountOwner>
): SetAuthorityInstruction<
  typeof TOKEN22_PROGRAM_ID,
  TAccountOwned,
  (typeof input)['owner'] extends TransactionSigner<TAccountOwner>
    ? ReadonlySignerAccount<TAccountOwner> & IAccountSignerMeta<TAccountOwner>
    : TAccountOwner
> {
  // Program address.
  const programAddress = TOKEN22_PROGRAM_ID;

  // Original accounts.
  const originalAccounts = {
    owned: { value: input.owned ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer,
    })
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.owned),
      getAccountMeta(accounts.owner),
      ...remainingAccounts,
    ],
    programAddress,
    data: getSetAuthorityInstructionDataEncoder().encode(
      args as SetAuthorityInstructionDataArgs
    ),
  } as SetAuthorityInstruction<
    typeof TOKEN22_PROGRAM_ID,
    TAccountOwned,
    (typeof input)['owner'] extends TransactionSigner<TAccountOwner>
      ? ReadonlySignerAccount<TAccountOwner> & IAccountSignerMeta<TAccountOwner>
      : TAccountOwner
  >;

  return instruction;
}

export type ParsedSetAuthorityInstruction<
  TProgram extends string = typeof TOKEN22_PROGRAM_ID,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The mint or account to change the authority of. */
    owned: TAccountMetas[0];
    /** The current authority or the multisignature account of the mint or account to update. */
    owner: TAccountMetas[1];
  };
  data: SetAuthorityInstructionData;
};

export function parseSetAuthorityInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetAuthorityInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
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
      owned: getNextAccount(),
      owner: getNextAccount(),
    },
    data: getSetAuthorityInstructionDataDecoder().decode(instruction.data),
  };
}
