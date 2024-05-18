import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getScalarEnumDecoder,
  getScalarEnumEncoder,
} from '@solana/codecs';

export enum TTokenProgramVersion {
  Original,
  Token2022,
}

export type TTokenProgramVersionArgs = TTokenProgramVersion;

export function getTTokenProgramVersionEncoder(): Encoder<TTokenProgramVersionArgs> {
  return getScalarEnumEncoder(TTokenProgramVersion);
}

export function getTTokenProgramVersionDecoder(): Decoder<TTokenProgramVersion> {
  return getScalarEnumDecoder(TTokenProgramVersion);
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
