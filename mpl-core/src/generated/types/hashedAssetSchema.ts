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
  ReadonlyUint8Array,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getArrayDecoder,
  getArrayEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/web3.js';

export type HashedAssetSchema = {
  assetHash: ReadonlyUint8Array;
  pluginHashes: Array<ReadonlyUint8Array>;
};

export type HashedAssetSchemaArgs = HashedAssetSchema;

export function getHashedAssetSchemaEncoder(): Encoder<HashedAssetSchemaArgs> {
  return getStructEncoder([
    ['assetHash', fixEncoderSize(getBytesEncoder(), 32)],
    ['pluginHashes', getArrayEncoder(fixEncoderSize(getBytesEncoder(), 32))],
  ]);
}

export function getHashedAssetSchemaDecoder(): Decoder<HashedAssetSchema> {
  return getStructDecoder([
    ['assetHash', fixDecoderSize(getBytesDecoder(), 32)],
    ['pluginHashes', getArrayDecoder(fixDecoderSize(getBytesDecoder(), 32))],
  ]);
}

export function getHashedAssetSchemaCodec(): Codec<
  HashedAssetSchemaArgs,
  HashedAssetSchema
> {
  return combineCodec(
    getHashedAssetSchemaEncoder(),
    getHashedAssetSchemaDecoder()
  );
}
