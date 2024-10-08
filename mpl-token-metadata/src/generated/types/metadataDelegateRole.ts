/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export enum MetadataDelegateRole {
  AuthorityItem,
  Collection,
  Use,
  Data,
  ProgrammableConfig,
  DataItem,
  CollectionItem,
  ProgrammableConfigItem,
}

export type MetadataDelegateRoleArgs = MetadataDelegateRole;

export function getMetadataDelegateRoleEncoder(): Encoder<MetadataDelegateRoleArgs> {
  return getEnumEncoder(MetadataDelegateRole);
}

export function getMetadataDelegateRoleDecoder(): Decoder<MetadataDelegateRole> {
  return getEnumDecoder(MetadataDelegateRole);
}

export function getMetadataDelegateRoleCodec(): Codec<
  MetadataDelegateRoleArgs,
  MetadataDelegateRole
> {
  return combineCodec(
    getMetadataDelegateRoleEncoder(),
    getMetadataDelegateRoleDecoder()
  );
}
