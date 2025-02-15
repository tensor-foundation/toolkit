/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU64Decoder,
  getU64Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export type ExpiredOrderEvent = {
  index: number;
  makerId: Address;
  orderSequenceNumber: bigint;
  priceInTicks: bigint;
  baseLotsRemoved: bigint;
};

export type ExpiredOrderEventArgs = {
  index: number;
  makerId: Address;
  orderSequenceNumber: number | bigint;
  priceInTicks: number | bigint;
  baseLotsRemoved: number | bigint;
};

export function getExpiredOrderEventEncoder(): Encoder<ExpiredOrderEventArgs> {
  return getStructEncoder([
    ['index', getU16Encoder()],
    ['makerId', getAddressEncoder()],
    ['orderSequenceNumber', getU64Encoder()],
    ['priceInTicks', getU64Encoder()],
    ['baseLotsRemoved', getU64Encoder()],
  ]);
}

export function getExpiredOrderEventDecoder(): Decoder<ExpiredOrderEvent> {
  return getStructDecoder([
    ['index', getU16Decoder()],
    ['makerId', getAddressDecoder()],
    ['orderSequenceNumber', getU64Decoder()],
    ['priceInTicks', getU64Decoder()],
    ['baseLotsRemoved', getU64Decoder()],
  ]);
}

export function getExpiredOrderEventCodec(): Codec<
  ExpiredOrderEventArgs,
  ExpiredOrderEvent
> {
  return combineCodec(
    getExpiredOrderEventEncoder(),
    getExpiredOrderEventDecoder()
  );
}
