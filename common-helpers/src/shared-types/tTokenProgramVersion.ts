import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
} from '@solana/web3.js';

export enum TTokenProgramVersion {
  Original,
  Token2022,
}

export type TTokenProgramVersionArgs = TTokenProgramVersion;

export function getTTokenProgramVersionEncoder(): Encoder<TTokenProgramVersionArgs> {
  return getEnumEncoder(TTokenProgramVersion);
}

export function getTTokenProgramVersionDecoder(): Decoder<TTokenProgramVersion> {
  return getEnumDecoder(TTokenProgramVersion);
}

export function getTTokenProgramVersionCodec(): Codec<
  TTokenProgramVersionArgs,
  TTokenProgramVersion
> {
  return combineCodec(
    getTTokenProgramVersionEncoder(),
    getTTokenProgramVersionDecoder()
  );
}
