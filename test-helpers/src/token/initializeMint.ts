/* eslint-disable @typescript-eslint/no-unused-vars */
import { SYSTEM_PROGRAM_ADDRESS } from '@solana-program/system';
import { TOKEN_PROGRAM_ADDRESS } from '@solana-program/token';
import {
  Address,
  Encoder,
  getAddressEncoder,
  getOptionEncoder,
  getStructEncoder,
  getU8Encoder,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  none,
  OptionOrNullable,
  transformEncoder,
  WritableAccount,
} from '@solana/web3.js';
import { getAccountMetaFactory, ResolvedAccount } from '../shared';

export type InitializeMint2Input<TAccountMint extends string = string> = {
  /** The mint to initialize. */
  mint: Address<TAccountMint>;
  tokenProgram?: Address;
  decimals: InitializeMint2InstructionDataArgs['decimals'];
  mintAuthority: InitializeMint2InstructionDataArgs['mintAuthority'];
  freezeAuthority?: InitializeMint2InstructionDataArgs['freezeAuthority'];
};

export type InitializeMint2InstructionDataArgs = {
  /** Number of base 10 digits to the right of the decimal place. */
  decimals: number;
  /** The authority/multisignature to mint tokens. */
  mintAuthority: Address;
  /** The optional freeze authority/multisignature of the mint. */
  freezeAuthority?: OptionOrNullable<Address>;
};

export type InitializeMint2Instruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export function getInitializeMint2Instruction<TAccountMint extends string>(
  input: InitializeMint2Input<TAccountMint>
): InitializeMint2Instruction<typeof TOKEN_PROGRAM_ADDRESS, TAccountMint> {
  // Program address.
  const programAddress = input.tokenProgram ?? TOKEN_PROGRAM_ADDRESS;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input.freezeAuthority = input.freezeAuthority ?? SYSTEM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const data = getInitializeMint2InstructionDataEncoder().encode(
    args as InitializeMint2InstructionDataArgs
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint)],
    programAddress,
    data,
  } as InitializeMint2Instruction<typeof TOKEN_PROGRAM_ADDRESS, TAccountMint>;

  return instruction;
}

function getInitializeMint2InstructionDataEncoder(): Encoder<InitializeMint2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['decimals', getU8Encoder()],
      ['mintAuthority', getAddressEncoder()],
      ['freezeAuthority', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({
      discriminator: 20,
      decimals: value.decimals,
      mintAuthority: value.mintAuthority,
      freezeAuthority: value.freezeAuthority ?? none(),
    })
  );
}
