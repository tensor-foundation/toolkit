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
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export type ConvertMasterEditionV1ToV2Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMasterEdition extends string | IAccountMeta<string> = string,
  TAccountOneTimeAuth extends string | IAccountMeta<string> = string,
  TAccountPrintingMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountOneTimeAuth extends string
        ? WritableAccount<TAccountOneTimeAuth>
        : TAccountOneTimeAuth,
      TAccountPrintingMint extends string
        ? WritableAccount<TAccountPrintingMint>
        : TAccountPrintingMint,
      ...TRemainingAccounts,
    ]
  >;

export type ConvertMasterEditionV1ToV2InstructionData = {
  discriminator: number;
};

export type ConvertMasterEditionV1ToV2InstructionDataArgs = {};

export function getConvertMasterEditionV1ToV2InstructionDataEncoder(): Encoder<ConvertMasterEditionV1ToV2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 12 })
  );
}

export function getConvertMasterEditionV1ToV2InstructionDataDecoder(): Decoder<ConvertMasterEditionV1ToV2InstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getConvertMasterEditionV1ToV2InstructionDataCodec(): Codec<
  ConvertMasterEditionV1ToV2InstructionDataArgs,
  ConvertMasterEditionV1ToV2InstructionData
> {
  return combineCodec(
    getConvertMasterEditionV1ToV2InstructionDataEncoder(),
    getConvertMasterEditionV1ToV2InstructionDataDecoder()
  );
}

export type ConvertMasterEditionV1ToV2Input<
  TAccountMasterEdition extends string = string,
  TAccountOneTimeAuth extends string = string,
  TAccountPrintingMint extends string = string,
> = {
  /** Master Record Edition V1 (pda of ['metadata', program id, master metadata mint id, 'edition']) */
  masterEdition: Address<TAccountMasterEdition>;
  /** One time authorization mint */
  oneTimeAuth: Address<TAccountOneTimeAuth>;
  /** Printing mint */
  printingMint: Address<TAccountPrintingMint>;
};

export function getConvertMasterEditionV1ToV2Instruction<
  TAccountMasterEdition extends string,
  TAccountOneTimeAuth extends string,
  TAccountPrintingMint extends string,
>(
  input: ConvertMasterEditionV1ToV2Input<
    TAccountMasterEdition,
    TAccountOneTimeAuth,
    TAccountPrintingMint
  >
): ConvertMasterEditionV1ToV2Instruction<
  typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMasterEdition,
  TAccountOneTimeAuth,
  TAccountPrintingMint
> {
  // Program address.
  const programAddress = TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    oneTimeAuth: { value: input.oneTimeAuth ?? null, isWritable: true },
    printingMint: { value: input.printingMint ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.oneTimeAuth),
      getAccountMeta(accounts.printingMint),
    ],
    programAddress,
    data: getConvertMasterEditionV1ToV2InstructionDataEncoder().encode({}),
  } as ConvertMasterEditionV1ToV2Instruction<
    typeof TOKEN_METADATA_PROGRAM_ADDRESS,
    TAccountMasterEdition,
    TAccountOneTimeAuth,
    TAccountPrintingMint
  >;

  return instruction;
}

export type ParsedConvertMasterEditionV1ToV2Instruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Master Record Edition V1 (pda of ['metadata', program id, master metadata mint id, 'edition']) */
    masterEdition: TAccountMetas[0];
    /** One time authorization mint */
    oneTimeAuth: TAccountMetas[1];
    /** Printing mint */
    printingMint: TAccountMetas[2];
  };
  data: ConvertMasterEditionV1ToV2InstructionData;
};

export function parseConvertMasterEditionV1ToV2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedConvertMasterEditionV1ToV2Instruction<TProgram, TAccountMetas> {
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
      masterEdition: getNextAccount(),
      oneTimeAuth: getNextAccount(),
      printingMint: getNextAccount(),
    },
    data: getConvertMasterEditionV1ToV2InstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
