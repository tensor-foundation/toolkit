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
  Option,
  OptionOrNullable,
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
} from '@solana/web3.js';

export type MasterEdition = {
  maxSupply: Option<number>;
  name: Option<string>;
  uri: Option<string>;
};

export type MasterEditionArgs = {
  maxSupply: OptionOrNullable<number>;
  name: OptionOrNullable<string>;
  uri: OptionOrNullable<string>;
};

export function getMasterEditionEncoder(): Encoder<MasterEditionArgs> {
  return getStructEncoder([
    ['maxSupply', getOptionEncoder(getU32Encoder())],
    [
      'name',
      getOptionEncoder(addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())),
    ],
    [
      'uri',
      getOptionEncoder(addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())),
    ],
  ]);
}

export function getMasterEditionDecoder(): Decoder<MasterEdition> {
  return getStructDecoder([
    ['maxSupply', getOptionDecoder(getU32Decoder())],
    [
      'name',
      getOptionDecoder(addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())),
    ],
    [
      'uri',
      getOptionDecoder(addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())),
    ],
  ]);
}

export function getMasterEditionCodec(): Codec<
  MasterEditionArgs,
  MasterEdition
> {
  return combineCodec(getMasterEditionEncoder(), getMasterEditionDecoder());
}
