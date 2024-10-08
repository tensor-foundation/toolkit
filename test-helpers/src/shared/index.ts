export * from './errors';

import {
  AccountRole,
  Address,
  IAccountLookupMeta,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  ProgramDerivedAddress,
  SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM,
  TransactionSigner,
  isProgramDerivedAddress,
  isSolanaError,
  upgradeRoleToSigner,
  isTransactionSigner as web3JsIsTransactionSigner,
} from '@solana/web3.js';
import {
  AccountMeta,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js-legacy';
import { ExecutionContext } from 'ava';

/**
 * Asserts that the given value is not null or undefined.
 * @internal
 */
export function expectSome<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('Expected a value but received null or undefined.');
  }
  return value;
}

/**
 * Asserts that the given value is a PublicKey.
 * @internal
 */
export function expectAddress<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): Address<T> {
  if (!value) {
    throw new Error('Expected a Address.');
  }
  if (typeof value === 'object' && 'address' in value) {
    return value.address;
  }
  if (Array.isArray(value)) {
    return value[0];
  }
  return value as Address<T>;
}

/**
 * Asserts that the given value is a PDA.
 * @internal
 */
export function expectProgramDerivedAddress<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): ProgramDerivedAddress<T> {
  if (!value || !Array.isArray(value) || !isProgramDerivedAddress(value)) {
    throw new Error('Expected a ProgramDerivedAddress.');
  }
  return value;
}

/**
 * Asserts that the given value is a TransactionSigner.
 * @internal
 */
export function expectTransactionSigner<T extends string = string>(
  value:
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null
    | undefined
): TransactionSigner<T> {
  if (!value || !isTransactionSigner(value)) {
    throw new Error('Expected a TransactionSigner.');
  }
  return value;
}

export const expectCustomError = async (
  t: ExecutionContext,
  promise: Promise<unknown>,
  code: number
) => {
  const error = await t.throwsAsync<Error & { data: { logs: string[] } }>(
    promise
  );

  if (isSolanaError(error.cause, SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM)) {
    t.assert(
      error.cause.context.code === code,
      `expected error code ${code}, received ${error.cause.context.code}`
    );
  } else {
    t.fail("expected a custom error, but didn't get one");
  }
};

/**
 * Defines an instruction account to resolve.
 * @internal
 */
export type ResolvedAccount<
  T extends string = string,
  U extends
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null =
    | Address<T>
    | ProgramDerivedAddress<T>
    | TransactionSigner<T>
    | null,
> = {
  isWritable: boolean;
  value: U;
};

/**
 * Defines an instruction that stores additional bytes on-chain.
 * @internal
 */
export type IInstructionWithByteDelta = {
  byteDelta: number;
};

/**
 * Get account metas and signers from resolved accounts.
 * @internal
 */
export function getAccountMetaFactory(
  programAddress: Address,
  optionalAccountStrategy: 'omitted' | 'programId'
) {
  return (
    account: ResolvedAccount
  ): IAccountMeta | IAccountSignerMeta | undefined => {
    if (!account.value) {
      if (optionalAccountStrategy === 'omitted') return;
      return Object.freeze({
        address: programAddress,
        role: AccountRole.READONLY,
      });
    }

    const writableRole = account.isWritable
      ? AccountRole.WRITABLE
      : AccountRole.READONLY;
    return Object.freeze({
      address: expectAddress(account.value),
      role: isTransactionSigner(account.value)
        ? upgradeRoleToSigner(writableRole)
        : writableRole,
      ...(isTransactionSigner(account.value) ? { signer: account.value } : {}),
    });
  };
}

export function isTransactionSigner<TAddress extends string = string>(
  value:
    | Address<TAddress>
    | ProgramDerivedAddress<TAddress>
    | TransactionSigner<TAddress>
): value is TransactionSigner<TAddress> {
  return (
    !!value &&
    typeof value === 'object' &&
    'address' in value &&
    web3JsIsTransactionSigner(value)
  );
}

interface IInstructionWithStringProgramAddress<
  TAccounts extends readonly (IAccountLookupMeta | IAccountMeta)[] = readonly (
    | IAccountLookupMeta
    | IAccountMeta
  )[],
> extends Omit<IInstruction<string, TAccounts>, 'programAddress'> {
  readonly programAddress: string;
}

export function fromIInstructionToTransactionInstruction(
  instruction: IInstruction | IInstructionWithStringProgramAddress
): TransactionInstruction {
  const keys: Array<AccountMeta> = !instruction.accounts
    ? []
    : instruction.accounts.map(({ address, role }) => {
        return {
          pubkey: new PublicKey(address),
          isSigner:
            role == AccountRole.READONLY_SIGNER ||
            role == AccountRole.WRITABLE_SIGNER,
          isWritable:
            role == AccountRole.WRITABLE || role == AccountRole.WRITABLE_SIGNER,
        } as AccountMeta;
      });
  const programId = new PublicKey(instruction.programAddress);
  const data = instruction.data
    ? Buffer.from(instruction.data)
    : Buffer.alloc(0);
  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
}
