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
  ReadonlySignerAccount,
  ReadonlyUint8Array,
  TransactionSigner,
  WritableAccount,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type ReplaceLeafInstruction<
  TProgram extends string = typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMerkleTree extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountNoop extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMerkleTree extends string
        ? WritableAccount<TAccountMerkleTree>
        : TAccountMerkleTree,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountNoop extends string
        ? ReadonlyAccount<TAccountNoop>
        : TAccountNoop,
      ...TRemainingAccounts,
    ]
  >;

export type ReplaceLeafInstructionData = {
  discriminator: ReadonlyUint8Array;
  root: ReadonlyUint8Array;
  previousLeaf: ReadonlyUint8Array;
  newLeaf: ReadonlyUint8Array;
  index: number;
};

export type ReplaceLeafInstructionDataArgs = {
  root: ReadonlyUint8Array;
  previousLeaf: ReadonlyUint8Array;
  newLeaf: ReadonlyUint8Array;
  index: number;
};

export function getReplaceLeafInstructionDataEncoder(): Encoder<ReplaceLeafInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['root', fixEncoderSize(getBytesEncoder(), 32)],
      ['previousLeaf', fixEncoderSize(getBytesEncoder(), 32)],
      ['newLeaf', fixEncoderSize(getBytesEncoder(), 32)],
      ['index', getU32Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([204, 165, 76, 100, 73, 147, 0, 128]),
    })
  );
}

export function getReplaceLeafInstructionDataDecoder(): Decoder<ReplaceLeafInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['root', fixDecoderSize(getBytesDecoder(), 32)],
    ['previousLeaf', fixDecoderSize(getBytesDecoder(), 32)],
    ['newLeaf', fixDecoderSize(getBytesDecoder(), 32)],
    ['index', getU32Decoder()],
  ]);
}

export function getReplaceLeafInstructionDataCodec(): Codec<
  ReplaceLeafInstructionDataArgs,
  ReplaceLeafInstructionData
> {
  return combineCodec(
    getReplaceLeafInstructionDataEncoder(),
    getReplaceLeafInstructionDataDecoder()
  );
}

export type ReplaceLeafInput<
  TAccountMerkleTree extends string = string,
  TAccountAuthority extends string = string,
  TAccountNoop extends string = string,
> = {
  merkleTree: Address<TAccountMerkleTree>;
  /**
   * Authority that controls write-access to the tree
   * Typically a program, e.g., the Bubblegum contract validates that leaves are valid NFTs.
   */
  authority: TransactionSigner<TAccountAuthority>;
  /** Program used to emit changelogs as cpi instruction data. */
  noop: Address<TAccountNoop>;
  root: ReplaceLeafInstructionDataArgs['root'];
  previousLeaf: ReplaceLeafInstructionDataArgs['previousLeaf'];
  newLeaf: ReplaceLeafInstructionDataArgs['newLeaf'];
  index: ReplaceLeafInstructionDataArgs['index'];
};

export function getReplaceLeafInstruction<
  TAccountMerkleTree extends string,
  TAccountAuthority extends string,
  TAccountNoop extends string,
>(
  input: ReplaceLeafInput<TAccountMerkleTree, TAccountAuthority, TAccountNoop>
): ReplaceLeafInstruction<
  typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMerkleTree,
  TAccountAuthority,
  TAccountNoop
> {
  // Program address.
  const programAddress = SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    merkleTree: { value: input.merkleTree ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    noop: { value: input.noop ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.merkleTree),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.noop),
    ],
    programAddress,
    data: getReplaceLeafInstructionDataEncoder().encode(
      args as ReplaceLeafInstructionDataArgs
    ),
  } as ReplaceLeafInstruction<
    typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
    TAccountMerkleTree,
    TAccountAuthority,
    TAccountNoop
  >;

  return instruction;
}

export type ParsedReplaceLeafInstruction<
  TProgram extends string = typeof SPL_ACCOUNT_COMPRESSION_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    merkleTree: TAccountMetas[0];
    /**
     * Authority that controls write-access to the tree
     * Typically a program, e.g., the Bubblegum contract validates that leaves are valid NFTs.
     */

    authority: TAccountMetas[1];
    /** Program used to emit changelogs as cpi instruction data. */
    noop: TAccountMetas[2];
  };
  data: ReplaceLeafInstructionData;
};

export function parseReplaceLeafInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedReplaceLeafInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
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
      merkleTree: getNextAccount(),
      authority: getNextAccount(),
      noop: getNextAccount(),
    },
    data: getReplaceLeafInstructionDataDecoder().decode(instruction.data),
  };
}
