/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
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
import {
  getAuthorityDecoder,
  getAuthorityEncoder,
  getPluginDecoder,
  getPluginEncoder,
  type Authority,
  type AuthorityArgs,
  type Plugin,
  type PluginArgs,
} from '.';

export type HashablePluginSchema = {
  index: bigint;
  authority: Authority;
  plugin: Plugin;
};

export type HashablePluginSchemaArgs = {
  index: number | bigint;
  authority: AuthorityArgs;
  plugin: PluginArgs;
};

export function getHashablePluginSchemaEncoder(): Encoder<HashablePluginSchemaArgs> {
  return getStructEncoder([
    ['index', getU64Encoder()],
    ['authority', getAuthorityEncoder()],
    ['plugin', getPluginEncoder()],
  ]);
}

export function getHashablePluginSchemaDecoder(): Decoder<HashablePluginSchema> {
  return getStructDecoder([
    ['index', getU64Decoder()],
    ['authority', getAuthorityDecoder()],
    ['plugin', getPluginDecoder()],
  ]);
}

export function getHashablePluginSchemaCodec(): Codec<
  HashablePluginSchemaArgs,
  HashablePluginSchema
> {
  return combineCodec(
    getHashablePluginSchemaEncoder(),
    getHashablePluginSchemaDecoder()
  );
}
