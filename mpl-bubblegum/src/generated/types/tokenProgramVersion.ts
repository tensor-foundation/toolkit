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
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
} from '@solana/web3.js';

export enum TokenProgramVersion {
  Original,
  Token2022,
}

export type TokenProgramVersionArgs = TokenProgramVersion;

export function getTokenProgramVersionEncoder(): Encoder<TokenProgramVersionArgs> {
  return getEnumEncoder(TokenProgramVersion);
}

export function getTokenProgramVersionDecoder(): Decoder<TokenProgramVersion> {
  return getEnumDecoder(TokenProgramVersion);
}

export function getTokenProgramVersionCodec(): Codec<
  TokenProgramVersionArgs,
  TokenProgramVersion
> {
  return combineCodec(
    getTokenProgramVersionEncoder(),
    getTokenProgramVersionDecoder()
  );
}
