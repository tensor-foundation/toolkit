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
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
} from '@solana/web3.js';

export type PathNode = { node: ReadonlyUint8Array; index: number };

export type PathNodeArgs = PathNode;

export function getPathNodeEncoder(): Encoder<PathNodeArgs> {
  return getStructEncoder([
    ['node', fixEncoderSize(getBytesEncoder(), 32)],
    ['index', getU32Encoder()],
  ]);
}

export function getPathNodeDecoder(): Decoder<PathNode> {
  return getStructDecoder([
    ['node', fixDecoderSize(getBytesDecoder(), 32)],
    ['index', getU32Decoder()],
  ]);
}

export function getPathNodeCodec(): Codec<PathNodeArgs, PathNode> {
  return combineCodec(getPathNodeEncoder(), getPathNodeDecoder());
}
