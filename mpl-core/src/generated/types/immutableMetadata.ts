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

export type ImmutableMetadata = {};

export type ImmutableMetadataArgs = ImmutableMetadata;

export function getImmutableMetadataEncoder(): Encoder<ImmutableMetadataArgs> {
  return getStructEncoder([]);
}

export function getImmutableMetadataDecoder(): Decoder<ImmutableMetadata> {
  return getStructDecoder([]);
}

export function getImmutableMetadataCodec(): Codec<
  ImmutableMetadataArgs,
  ImmutableMetadata
> {
  return combineCodec(
    getImmutableMetadataEncoder(),
    getImmutableMetadataDecoder()
  );
}