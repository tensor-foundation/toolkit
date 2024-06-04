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
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/web3.js';

export type Creator = { address: Address; percentage: number };

export type CreatorArgs = Creator;

export function getCreatorEncoder(): Encoder<CreatorArgs> {
  return getStructEncoder([
    ['address', getAddressEncoder()],
    ['percentage', getU8Encoder()],
  ]);
}

export function getCreatorDecoder(): Decoder<Creator> {
  return getStructDecoder([
    ['address', getAddressDecoder()],
    ['percentage', getU8Decoder()],
  ]);
}

export function getCreatorCodec(): Codec<CreatorArgs, Creator> {
  return combineCodec(getCreatorEncoder(), getCreatorDecoder());
}