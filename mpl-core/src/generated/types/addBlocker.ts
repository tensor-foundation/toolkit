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
  getStructDecoder,
  getStructEncoder,
} from '@solana/web3.js';

export type AddBlocker = {};

export type AddBlockerArgs = AddBlocker;

export function getAddBlockerEncoder(): Encoder<AddBlockerArgs> {
  return getStructEncoder([]);
}

export function getAddBlockerDecoder(): Decoder<AddBlocker> {
  return getStructDecoder([]);
}

export function getAddBlockerCodec(): Codec<AddBlockerArgs, AddBlocker> {
  return combineCodec(getAddBlockerEncoder(), getAddBlockerDecoder());
}
