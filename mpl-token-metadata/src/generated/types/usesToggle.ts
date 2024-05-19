/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Codec,
  Decoder,
  Encoder,
  GetDiscriminatedUnionVariant,
  GetDiscriminatedUnionVariantContent,
  combineCodec,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
  getUnitDecoder,
  getUnitEncoder,
} from '@solana/web3.js';
import { Uses, UsesArgs, getUsesDecoder, getUsesEncoder } from '.';

export type UsesToggle =
  | { __kind: 'None' }
  | { __kind: 'Clear' }
  | { __kind: 'Set'; fields: readonly [Uses] };

export type UsesToggleArgs =
  | { __kind: 'None' }
  | { __kind: 'Clear' }
  | { __kind: 'Set'; fields: readonly [UsesArgs] };

export function getUsesToggleEncoder(): Encoder<UsesToggleArgs> {
  return getDiscriminatedUnionEncoder([
    ['None', getUnitEncoder()],
    ['Clear', getUnitEncoder()],
    [
      'Set',
      getStructEncoder([['fields', getTupleEncoder([getUsesEncoder()])]]),
    ],
  ]);
}

export function getUsesToggleDecoder(): Decoder<UsesToggle> {
  return getDiscriminatedUnionDecoder([
    ['None', getUnitDecoder()],
    ['Clear', getUnitDecoder()],
    [
      'Set',
      getStructDecoder([['fields', getTupleDecoder([getUsesDecoder()])]]),
    ],
  ]);
}

export function getUsesToggleCodec(): Codec<UsesToggleArgs, UsesToggle> {
  return combineCodec(getUsesToggleEncoder(), getUsesToggleDecoder());
}

// Data Enum Helpers.
export function usesToggle(
  kind: 'None'
): GetDiscriminatedUnionVariant<UsesToggleArgs, '__kind', 'None'>;
export function usesToggle(
  kind: 'Clear'
): GetDiscriminatedUnionVariant<UsesToggleArgs, '__kind', 'Clear'>;
export function usesToggle(
  kind: 'Set',
  data: GetDiscriminatedUnionVariantContent<
    UsesToggleArgs,
    '__kind',
    'Set'
  >['fields']
): GetDiscriminatedUnionVariant<UsesToggleArgs, '__kind', 'Set'>;
export function usesToggle<K extends UsesToggleArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isUsesToggle<K extends UsesToggle['__kind']>(
  kind: K,
  value: UsesToggle
): value is UsesToggle & { __kind: K } {
  return value.__kind === kind;
}
