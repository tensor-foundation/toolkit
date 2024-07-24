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

export enum TokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
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
