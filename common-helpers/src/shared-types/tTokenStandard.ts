import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getScalarEnumDecoder,
  getScalarEnumEncoder,
} from '@solana/codecs';

export enum TTokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
}

export type TTokenStandardArgs = TTokenStandard;

export function getTTokenStandardEncoder(): Encoder<TTokenStandardArgs> {
  return getScalarEnumEncoder(TTokenStandard);
}

export function getTTokenStandardDecoder(): Decoder<TTokenStandard> {
  return getScalarEnumDecoder(TTokenStandard);
}

export function getTTokenStandardCodec(): Codec<
  TTokenStandardArgs,
  TTokenStandard
> {
  return combineCodec(getTTokenStandardEncoder(), getTTokenStandardDecoder());
}
