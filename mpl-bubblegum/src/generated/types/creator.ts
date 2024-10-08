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
  getBooleanDecoder,
  getBooleanEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/web3.js';

export type Creator = {
  address: Address;
  verified: boolean;
  /**
   * The percentage share.
   *
   * The value is a percentage, not basis points.
   */
  share: number;
};

export type CreatorArgs = Creator;

export function getCreatorEncoder(): Encoder<CreatorArgs> {
  return getStructEncoder([
    ['address', getAddressEncoder()],
    ['verified', getBooleanEncoder()],
    ['share', getU8Encoder()],
  ]);
}

export function getCreatorDecoder(): Decoder<Creator> {
  return getStructDecoder([
    ['address', getAddressDecoder()],
    ['verified', getBooleanDecoder()],
    ['share', getU8Decoder()],
  ]);
}

export function getCreatorCodec(): Codec<CreatorArgs, Creator> {
  return combineCodec(getCreatorEncoder(), getCreatorDecoder());
}
