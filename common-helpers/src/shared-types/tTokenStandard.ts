import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
} from '@solana/web3.js';

export enum TTokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
}

export type TTokenStandardArgs = TTokenStandard;

export function getTTokenStandardEncoder(): Encoder<TTokenStandardArgs> {
  return getEnumEncoder(TTokenStandard);
}

export function getTTokenStandardDecoder(): Decoder<TTokenStandard> {
  return getEnumDecoder(TTokenStandard);
}

export function getTTokenStandardCodec(): Codec<
  TTokenStandardArgs,
  TTokenStandard
> {
  return combineCodec(getTTokenStandardEncoder(), getTTokenStandardDecoder());
}
