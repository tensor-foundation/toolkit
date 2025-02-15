/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
} from '@solana/web3.js';
import {
  getAuthorityDecoder,
  getAuthorityEncoder,
  type Authority,
  type AuthorityArgs,
} from '.';

export type ExternalPluginAdapterKey =
  | { __kind: 'LifecycleHook'; fields: readonly [Address] }
  | { __kind: 'Oracle'; fields: readonly [Address] }
  | { __kind: 'DataStore'; fields: readonly [Authority] };

export type ExternalPluginAdapterKeyArgs =
  | { __kind: 'LifecycleHook'; fields: readonly [Address] }
  | { __kind: 'Oracle'; fields: readonly [Address] }
  | { __kind: 'DataStore'; fields: readonly [AuthorityArgs] };

export function getExternalPluginAdapterKeyEncoder(): Encoder<ExternalPluginAdapterKeyArgs> {
  return getDiscriminatedUnionEncoder([
    [
      'LifecycleHook',
      getStructEncoder([['fields', getTupleEncoder([getAddressEncoder()])]]),
    ],
    [
      'Oracle',
      getStructEncoder([['fields', getTupleEncoder([getAddressEncoder()])]]),
    ],
    [
      'DataStore',
      getStructEncoder([['fields', getTupleEncoder([getAuthorityEncoder()])]]),
    ],
  ]);
}

export function getExternalPluginAdapterKeyDecoder(): Decoder<ExternalPluginAdapterKey> {
  return getDiscriminatedUnionDecoder([
    [
      'LifecycleHook',
      getStructDecoder([['fields', getTupleDecoder([getAddressDecoder()])]]),
    ],
    [
      'Oracle',
      getStructDecoder([['fields', getTupleDecoder([getAddressDecoder()])]]),
    ],
    [
      'DataStore',
      getStructDecoder([['fields', getTupleDecoder([getAuthorityDecoder()])]]),
    ],
  ]);
}

export function getExternalPluginAdapterKeyCodec(): Codec<
  ExternalPluginAdapterKeyArgs,
  ExternalPluginAdapterKey
> {
  return combineCodec(
    getExternalPluginAdapterKeyEncoder(),
    getExternalPluginAdapterKeyDecoder()
  );
}

// Data Enum Helpers.
export function externalPluginAdapterKey(
  kind: 'LifecycleHook',
  data: GetDiscriminatedUnionVariantContent<
    ExternalPluginAdapterKeyArgs,
    '__kind',
    'LifecycleHook'
  >['fields']
): GetDiscriminatedUnionVariant<
  ExternalPluginAdapterKeyArgs,
  '__kind',
  'LifecycleHook'
>;
export function externalPluginAdapterKey(
  kind: 'Oracle',
  data: GetDiscriminatedUnionVariantContent<
    ExternalPluginAdapterKeyArgs,
    '__kind',
    'Oracle'
  >['fields']
): GetDiscriminatedUnionVariant<
  ExternalPluginAdapterKeyArgs,
  '__kind',
  'Oracle'
>;
export function externalPluginAdapterKey(
  kind: 'DataStore',
  data: GetDiscriminatedUnionVariantContent<
    ExternalPluginAdapterKeyArgs,
    '__kind',
    'DataStore'
  >['fields']
): GetDiscriminatedUnionVariant<
  ExternalPluginAdapterKeyArgs,
  '__kind',
  'DataStore'
>;
export function externalPluginAdapterKey<
  K extends ExternalPluginAdapterKeyArgs['__kind'],
  Data,
>(kind: K, data?: Data) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isExternalPluginAdapterKey<
  K extends ExternalPluginAdapterKey['__kind'],
>(
  kind: K,
  value: ExternalPluginAdapterKey
): value is ExternalPluginAdapterKey & { __kind: K } {
  return value.__kind === kind;
}
