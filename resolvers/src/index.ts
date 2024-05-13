import { Address, ProgramDerivedAddress } from '@solana/addresses';
import { TransactionSigner } from '@solana/signers';

export * from './pdas';
export * from './resolvers';
export * from './types';

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
