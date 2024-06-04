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

export enum DataState {
  AccountState,
  LedgerState,
}

export type DataStateArgs = DataState;

export function getDataStateEncoder(): Encoder<DataStateArgs> {
  return getEnumEncoder(DataState);
}

export function getDataStateDecoder(): Decoder<DataState> {
  return getEnumDecoder(DataState);
}

export function getDataStateCodec(): Codec<DataStateArgs, DataState> {
  return combineCodec(getDataStateEncoder(), getDataStateDecoder());
}