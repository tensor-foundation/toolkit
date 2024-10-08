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
  Option,
  OptionOrNullable,
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
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

export type DataStoreInitInfo = {
  dataAuthority: Authority;
  initPluginAuthority: Option<Authority>;
  schema: Option<ExternalPluginAdapterSchema>;
};

export type DataStoreInitInfoArgs = {
  dataAuthority: AuthorityArgs;
  initPluginAuthority: OptionOrNullable<AuthorityArgs>;
  schema: OptionOrNullable<ExternalPluginAdapterSchemaArgs>;
};

export function getDataStoreInitInfoEncoder(): Encoder<DataStoreInitInfoArgs> {
  return getStructEncoder([
    ['dataAuthority', getAuthorityEncoder()],
    ['initPluginAuthority', getOptionEncoder(getAuthorityEncoder())],
    ['schema', getOptionEncoder(getExternalPluginAdapterSchemaEncoder())],
  ]);
}

export function getDataStoreInitInfoDecoder(): Decoder<DataStoreInitInfo> {
  return getStructDecoder([
    ['dataAuthority', getAuthorityDecoder()],
    ['initPluginAuthority', getOptionDecoder(getAuthorityDecoder())],
    ['schema', getOptionDecoder(getExternalPluginAdapterSchemaDecoder())],
  ]);
}

export function getDataStoreInitInfoCodec(): Codec<
  DataStoreInitInfoArgs,
  DataStoreInitInfo
> {
  return combineCodec(
    getDataStoreInitInfoEncoder(),
    getDataStoreInitInfoDecoder()
  );
}
