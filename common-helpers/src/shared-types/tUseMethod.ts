import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getScalarEnumDecoder,
  getScalarEnumEncoder,
} from '@solana/codecs';

export enum TUseMethod {
  Burn,
  Multiple,
  Single,
}

export type TUseMethodArgs = TUseMethod;

export function getTUseMethodEncoder(): Encoder<TUseMethodArgs> {
  return getScalarEnumEncoder(TUseMethod);
}

export function getTUseMethodDecoder(): Decoder<TUseMethod> {
  return getScalarEnumDecoder(TUseMethod);
}

export function getTUseMethodCodec(): Codec<TUseMethodArgs, TUseMethod> {
  return combineCodec(getTUseMethodEncoder(), getTUseMethodDecoder());
}
