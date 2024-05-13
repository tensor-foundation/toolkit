/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

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