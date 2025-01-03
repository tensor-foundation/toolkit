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
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const DEPRECATED_SET_RESERVATION_LIST_DISCRIMINATOR = 5;

export function getDeprecatedSetReservationListDiscriminatorBytes() {
  return getU8Encoder().encode(DEPRECATED_SET_RESERVATION_LIST_DISCRIMINATOR);
}

export type DeprecatedSetReservationListInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMasterEdition extends string | IAccountMeta<string> = string,
  TAccountReservationList extends string | IAccountMeta<string> = string,
  TAccountResource extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMasterEdition extends string
        ? WritableAccount<TAccountMasterEdition>
        : TAccountMasterEdition,
      TAccountReservationList extends string
        ? WritableAccount<TAccountReservationList>
        : TAccountReservationList,
      TAccountResource extends string
        ? ReadonlySignerAccount<TAccountResource> &
            IAccountSignerMeta<TAccountResource>
        : TAccountResource,
      ...TRemainingAccounts,
    ]
  >;

export type DeprecatedSetReservationListInstructionData = {
  discriminator: number;
};

export type DeprecatedSetReservationListInstructionDataArgs = {};

export function getDeprecatedSetReservationListInstructionDataEncoder(): Encoder<DeprecatedSetReservationListInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: DEPRECATED_SET_RESERVATION_LIST_DISCRIMINATOR,
    })
  );
}

export function getDeprecatedSetReservationListInstructionDataDecoder(): Decoder<DeprecatedSetReservationListInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getDeprecatedSetReservationListInstructionDataCodec(): Codec<
  DeprecatedSetReservationListInstructionDataArgs,
  DeprecatedSetReservationListInstructionData
> {
  return combineCodec(
    getDeprecatedSetReservationListInstructionDataEncoder(),
    getDeprecatedSetReservationListInstructionDataDecoder()
  );
}

export type DeprecatedSetReservationListInput<
  TAccountMasterEdition extends string = string,
  TAccountReservationList extends string = string,
  TAccountResource extends string = string,
> = {
  /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
  masterEdition: Address<TAccountMasterEdition>;
  /** PDA for ReservationList of ['metadata', program id, master edition key, 'reservation', resource-key] */
  reservationList: Address<TAccountReservationList>;
  /** The resource you tied the reservation list too */
  resource: TransactionSigner<TAccountResource>;
};

export function getDeprecatedSetReservationListInstruction<
  TAccountMasterEdition extends string,
  TAccountReservationList extends string,
  TAccountResource extends string,
  TProgramAddress extends Address = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
>(
  input: DeprecatedSetReservationListInput<
    TAccountMasterEdition,
    TAccountReservationList,
    TAccountResource
  >,
  config?: { programAddress?: TProgramAddress }
): DeprecatedSetReservationListInstruction<
  TProgramAddress,
  TAccountMasterEdition,
  TAccountReservationList,
  TAccountResource
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? TOKEN_METADATA_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    masterEdition: { value: input.masterEdition ?? null, isWritable: true },
    reservationList: { value: input.reservationList ?? null, isWritable: true },
    resource: { value: input.resource ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.masterEdition),
      getAccountMeta(accounts.reservationList),
      getAccountMeta(accounts.resource),
    ],
    programAddress,
    data: getDeprecatedSetReservationListInstructionDataEncoder().encode({}),
  } as DeprecatedSetReservationListInstruction<
    TProgramAddress,
    TAccountMasterEdition,
    TAccountReservationList,
    TAccountResource
  >;

  return instruction;
}

export type ParsedDeprecatedSetReservationListInstruction<
  TProgram extends string = typeof TOKEN_METADATA_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
    masterEdition: TAccountMetas[0];
    /** PDA for ReservationList of ['metadata', program id, master edition key, 'reservation', resource-key] */
    reservationList: TAccountMetas[1];
    /** The resource you tied the reservation list too */
    resource: TAccountMetas[2];
  };
  data: DeprecatedSetReservationListInstructionData;
};

export function parseDeprecatedSetReservationListInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDeprecatedSetReservationListInstruction<TProgram, TAccountMetas> {
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
      reservationList: getNextAccount(),
      resource: getNextAccount(),
    },
    data: getDeprecatedSetReservationListInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
