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
  getU64Decoder,
  getU64Encoder,
} from '@solana/web3.js';
import {
  Authority,
  AuthorityArgs,
  PluginType,
  PluginTypeArgs,
  getAuthorityDecoder,
  getAuthorityEncoder,
  getPluginTypeDecoder,
  getPluginTypeEncoder,
} from '.';

export type RegistryRecord = {
  pluginType: PluginType;
  authority: Authority;
  offset: bigint;
};

export type RegistryRecordArgs = {
  pluginType: PluginTypeArgs;
  authority: AuthorityArgs;
  offset: number | bigint;
};

export function getRegistryRecordEncoder(): Encoder<RegistryRecordArgs> {
  return getStructEncoder([
    ['pluginType', getPluginTypeEncoder()],
    ['authority', getAuthorityEncoder()],
    ['offset', getU64Encoder()],
  ]);
}

export function getRegistryRecordDecoder(): Decoder<RegistryRecord> {
  return getStructDecoder([
    ['pluginType', getPluginTypeDecoder()],
    ['authority', getAuthorityDecoder()],
    ['offset', getU64Decoder()],
  ]);
}

export function getRegistryRecordCodec(): Codec<
  RegistryRecordArgs,
  RegistryRecord
> {
  return combineCodec(getRegistryRecordEncoder(), getRegistryRecordDecoder());
}
