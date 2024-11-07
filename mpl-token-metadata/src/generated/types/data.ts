/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getArrayDecoder,
  getArrayEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  type Codec,
  type Decoder,
  type Encoder,
  type Option,
  type OptionOrNullable,
} from '@solana/web3.js';
import {
  getCreatorDecoder,
  getCreatorEncoder,
  type Creator,
  type CreatorArgs,
} from '.';

export type Data = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Option<Array<Creator>>;
};

export type DataArgs = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: OptionOrNullable<Array<CreatorArgs>>;
};

export function getDataEncoder(): Encoder<DataArgs> {
  return getStructEncoder([
    ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['sellerFeeBasisPoints', getU16Encoder()],
    ['creators', getOptionEncoder(getArrayEncoder(getCreatorEncoder()))],
  ]);
}

export function getDataDecoder(): Decoder<Data> {
  return getStructDecoder([
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['creators', getOptionDecoder(getArrayDecoder(getCreatorDecoder()))],
  ]);
}

export function getDataCodec(): Codec<DataArgs, Data> {
  return combineCodec(getDataEncoder(), getDataDecoder());
}
