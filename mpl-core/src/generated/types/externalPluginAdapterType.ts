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

export enum ExternalPluginAdapterType {
  LifecycleHook,
  Oracle,
  DataStore,
}

export type ExternalPluginAdapterTypeArgs = ExternalPluginAdapterType;

export function getExternalPluginAdapterTypeEncoder(): Encoder<ExternalPluginAdapterTypeArgs> {
  return getEnumEncoder(ExternalPluginAdapterType);
}

export function getExternalPluginAdapterTypeDecoder(): Decoder<ExternalPluginAdapterType> {
  return getEnumDecoder(ExternalPluginAdapterType);
}

export function getExternalPluginAdapterTypeCodec(): Codec<
  ExternalPluginAdapterTypeArgs,
  ExternalPluginAdapterType
> {
  return combineCodec(
    getExternalPluginAdapterTypeEncoder(),
    getExternalPluginAdapterTypeDecoder()
  );
}
