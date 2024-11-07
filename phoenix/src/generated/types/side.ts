/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export enum Side {
  Bid,
  Ask,
}

export type SideArgs = Side;

export function getSideEncoder(): Encoder<SideArgs> {
  return getEnumEncoder(Side);
}

export function getSideDecoder(): Decoder<Side> {
  return getEnumDecoder(Side);
}

export function getSideCodec(): Codec<SideArgs, Side> {
  return combineCodec(getSideEncoder(), getSideDecoder());
}
