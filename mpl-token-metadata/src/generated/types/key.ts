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

export enum Key {
  Uninitialized,
  EditionV1,
  MasterEditionV1,
  ReservationListV1,
  MetadataV1,
  ReservationListV2,
  MasterEditionV2,
  EditionMarker,
  UseAuthorityRecord,
  CollectionAuthorityRecord,
  TokenOwnedEscrow,
  TokenRecord,
  MetadataDelegate,
  EditionMarkerV2,
  HolderDelegate,
}

export type KeyArgs = Key;

export function getKeyEncoder(): Encoder<KeyArgs> {
  return getEnumEncoder(Key);
}

export function getKeyDecoder(): Decoder<Key> {
  return getEnumDecoder(Key);
}

export function getKeyCodec(): Codec<KeyArgs, Key> {
  return combineCodec(getKeyEncoder(), getKeyDecoder());
}
