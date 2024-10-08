import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
} from '@solana/web3.js';

export enum TUseMethod {
  Burn,
  Multiple,
  Single,
}

export type TUseMethodArgs = TUseMethod;

export function getTUseMethodEncoder(): Encoder<TUseMethodArgs> {
  return getEnumEncoder(TUseMethod);
}

export function getTUseMethodDecoder(): Decoder<TUseMethod> {
  return getEnumDecoder(TUseMethod);
}

export function getTUseMethodCodec(): Codec<TUseMethodArgs, TUseMethod> {
  return combineCodec(getTUseMethodEncoder(), getTUseMethodDecoder());
}
