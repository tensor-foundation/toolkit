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
  GetDiscriminatedUnionVariant,
  GetDiscriminatedUnionVariantContent,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
  getUnitDecoder,
  getUnitEncoder,
} from '@solana/web3.js';

export type RuleSetToggle =
  | { __kind: 'None' }
  | { __kind: 'Clear' }
  | { __kind: 'Set'; fields: readonly [Address] };

export type RuleSetToggleArgs = RuleSetToggle;

export function getRuleSetToggleEncoder(): Encoder<RuleSetToggleArgs> {
  return getDiscriminatedUnionEncoder([
    ['None', getUnitEncoder()],
    ['Clear', getUnitEncoder()],
    [
      'Set',
      getStructEncoder([['fields', getTupleEncoder([getAddressEncoder()])]]),
    ],
  ]);
}

export function getRuleSetToggleDecoder(): Decoder<RuleSetToggle> {
  return getDiscriminatedUnionDecoder([
    ['None', getUnitDecoder()],
    ['Clear', getUnitDecoder()],
    [
      'Set',
      getStructDecoder([['fields', getTupleDecoder([getAddressDecoder()])]]),
    ],
  ]);
}

export function getRuleSetToggleCodec(): Codec<
  RuleSetToggleArgs,
  RuleSetToggle
> {
  return combineCodec(getRuleSetToggleEncoder(), getRuleSetToggleDecoder());
}

// Data Enum Helpers.
export function ruleSetToggle(
  kind: 'None'
): GetDiscriminatedUnionVariant<RuleSetToggleArgs, '__kind', 'None'>;
export function ruleSetToggle(
  kind: 'Clear'
): GetDiscriminatedUnionVariant<RuleSetToggleArgs, '__kind', 'Clear'>;
export function ruleSetToggle(
  kind: 'Set',
  data: GetDiscriminatedUnionVariantContent<
    RuleSetToggleArgs,
    '__kind',
    'Set'
  >['fields']
): GetDiscriminatedUnionVariant<RuleSetToggleArgs, '__kind', 'Set'>;
export function ruleSetToggle<K extends RuleSetToggleArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isRuleSetToggle<K extends RuleSetToggle['__kind']>(
  kind: K,
  value: RuleSetToggle
): value is RuleSetToggle & { __kind: K } {
  return value.__kind === kind;
}
