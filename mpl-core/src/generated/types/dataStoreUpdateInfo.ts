/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  type Codec,
  type Decoder,
  type Encoder,
  type Option,
  type OptionOrNullable,
} from '@solana/web3.js';
import {
  getExternalPluginAdapterSchemaDecoder,
  getExternalPluginAdapterSchemaEncoder,
  type ExternalPluginAdapterSchema,
  type ExternalPluginAdapterSchemaArgs,
} from '.';

export type DataStoreUpdateInfo = {
  schema: Option<ExternalPluginAdapterSchema>;
};

export type DataStoreUpdateInfoArgs = {
  schema: OptionOrNullable<ExternalPluginAdapterSchemaArgs>;
};

export function getDataStoreUpdateInfoEncoder(): Encoder<DataStoreUpdateInfoArgs> {
  return getStructEncoder([
    ['schema', getOptionEncoder(getExternalPluginAdapterSchemaEncoder())],
  ]);
}

export function getDataStoreUpdateInfoDecoder(): Decoder<DataStoreUpdateInfo> {
  return getStructDecoder([
    ['schema', getOptionDecoder(getExternalPluginAdapterSchemaDecoder())],
  ]);
}

export function getDataStoreUpdateInfoCodec(): Codec<
  DataStoreUpdateInfoArgs,
  DataStoreUpdateInfo
> {
  return combineCodec(
    getDataStoreUpdateInfoEncoder(),
    getDataStoreUpdateInfoDecoder()
  );
}
