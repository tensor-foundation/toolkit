/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export enum BubblegumEventType {
  Uninitialized,
  LeafSchemaEvent,
}

export type BubblegumEventTypeArgs = BubblegumEventType;

export function getBubblegumEventTypeEncoder(): Encoder<BubblegumEventTypeArgs> {
  return getEnumEncoder(BubblegumEventType);
}

export function getBubblegumEventTypeDecoder(): Decoder<BubblegumEventType> {
  return getEnumDecoder(BubblegumEventType);
}

export function getBubblegumEventTypeCodec(): Codec<
  BubblegumEventTypeArgs,
  BubblegumEventType
> {
  return combineCodec(
    getBubblegumEventTypeEncoder(),
    getBubblegumEventTypeDecoder()
  );
}
