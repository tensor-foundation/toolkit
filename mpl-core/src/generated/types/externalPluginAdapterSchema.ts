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

export enum ExternalPluginAdapterSchema {
  Binary,
  Json,
  MsgPack,
}

export type ExternalPluginAdapterSchemaArgs = ExternalPluginAdapterSchema;

export function getExternalPluginAdapterSchemaEncoder(): Encoder<ExternalPluginAdapterSchemaArgs> {
  return getEnumEncoder(ExternalPluginAdapterSchema);
}

export function getExternalPluginAdapterSchemaDecoder(): Decoder<ExternalPluginAdapterSchema> {
  return getEnumDecoder(ExternalPluginAdapterSchema);
}

export function getExternalPluginAdapterSchemaCodec(): Codec<
  ExternalPluginAdapterSchemaArgs,
  ExternalPluginAdapterSchema
> {
  return combineCodec(
    getExternalPluginAdapterSchemaEncoder(),
    getExternalPluginAdapterSchemaDecoder()
  );
}