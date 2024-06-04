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
import {
  Authority,
  AuthorityArgs,
  ExternalPluginAdapterSchema,
  ExternalPluginAdapterSchemaArgs,
  getAuthorityDecoder,
  getAuthorityEncoder,
  getExternalPluginAdapterSchemaDecoder,
  getExternalPluginAdapterSchemaEncoder,
} from '.';

export type DataStore = {
  dataAuthority: Authority;
  schema: ExternalPluginAdapterSchema;
};

export type DataStoreArgs = {
  dataAuthority: AuthorityArgs;
  schema: ExternalPluginAdapterSchemaArgs;
};

export function getDataStoreEncoder(): Encoder<DataStoreArgs> {
  return getStructEncoder([
    ['dataAuthority', getAuthorityEncoder()],
    ['schema', getExternalPluginAdapterSchemaEncoder()],
  ]);
}

export function getDataStoreDecoder(): Decoder<DataStore> {
  return getStructDecoder([
    ['dataAuthority', getAuthorityDecoder()],
    ['schema', getExternalPluginAdapterSchemaDecoder()],
  ]);
}

export function getDataStoreCodec(): Codec<DataStoreArgs, DataStore> {
  return combineCodec(getDataStoreEncoder(), getDataStoreDecoder());
}