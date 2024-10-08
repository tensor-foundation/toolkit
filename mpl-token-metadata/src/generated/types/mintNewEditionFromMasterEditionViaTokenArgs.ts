/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export type MintNewEditionFromMasterEditionViaTokenArgs = { edition: bigint };

export type MintNewEditionFromMasterEditionViaTokenArgsArgs = {
  edition: number | bigint;
};

export function getMintNewEditionFromMasterEditionViaTokenArgsEncoder(): Encoder<MintNewEditionFromMasterEditionViaTokenArgsArgs> {
  return getStructEncoder([['edition', getU64Encoder()]]);
}

export function getMintNewEditionFromMasterEditionViaTokenArgsDecoder(): Decoder<MintNewEditionFromMasterEditionViaTokenArgs> {
  return getStructDecoder([['edition', getU64Decoder()]]);
}

export function getMintNewEditionFromMasterEditionViaTokenArgsCodec(): Codec<
  MintNewEditionFromMasterEditionViaTokenArgsArgs,
  MintNewEditionFromMasterEditionViaTokenArgs
> {
  return combineCodec(
    getMintNewEditionFromMasterEditionViaTokenArgsEncoder(),
    getMintNewEditionFromMasterEditionViaTokenArgsDecoder()
  );
}
