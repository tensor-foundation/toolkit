/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export enum TokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
  ProgrammableNonFungible,
  ProgrammableNonFungibleEdition,
}

export type TokenStandardArgs = TokenStandard;

export function getTokenStandardEncoder(): Encoder<TokenStandardArgs> {
  return getEnumEncoder(TokenStandard);
}

export function getTokenStandardDecoder(): Decoder<TokenStandard> {
  return getEnumDecoder(TokenStandard);
}

export function getTokenStandardCodec(): Codec<
  TokenStandardArgs,
  TokenStandard
> {
  return combineCodec(getTokenStandardEncoder(), getTokenStandardDecoder());
}
