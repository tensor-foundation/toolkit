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
  combineCodec,
  getStructDecoder,
  getStructEncoder,
} from '@solana/web3.js';

export type BurnDelegate = {};

export type BurnDelegateArgs = BurnDelegate;

export function getBurnDelegateEncoder(): Encoder<BurnDelegateArgs> {
  return getStructEncoder([]);
}

export function getBurnDelegateDecoder(): Decoder<BurnDelegate> {
  return getStructDecoder([]);
}

export function getBurnDelegateCodec(): Codec<BurnDelegateArgs, BurnDelegate> {
  return combineCodec(getBurnDelegateEncoder(), getBurnDelegateDecoder());
}
