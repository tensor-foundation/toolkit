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
  getU64Decoder,
  getU64Encoder,
} from '@solana/web3.js';

export type BurnArgs = { __kind: 'V1'; amount: bigint };

export type BurnArgsArgs = { __kind: 'V1'; amount: number | bigint };

export function getBurnArgsEncoder(): Encoder<BurnArgsArgs> {
  return getDiscriminatedUnionEncoder([
    ['V1', getStructEncoder([['amount', getU64Encoder()]])],
  ]);
}

export function getBurnArgsDecoder(): Decoder<BurnArgs> {
  return getDiscriminatedUnionDecoder([
    ['V1', getStructDecoder([['amount', getU64Decoder()]])],
  ]);
}

export function getBurnArgsCodec(): Codec<BurnArgsArgs, BurnArgs> {
  return combineCodec(getBurnArgsEncoder(), getBurnArgsDecoder());
}

// Data Enum Helpers.
export function burnArgs(
  kind: 'V1',
  data: GetDiscriminatedUnionVariantContent<BurnArgsArgs, '__kind', 'V1'>
): GetDiscriminatedUnionVariant<BurnArgsArgs, '__kind', 'V1'>;
export function burnArgs<K extends BurnArgsArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isBurnArgs<K extends BurnArgs['__kind']>(
  kind: K,
  value: BurnArgs
): value is BurnArgs & { __kind: K } {
  return value.__kind === kind;
}