/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getBooleanDecoder,
  getBooleanEncoder,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU128Decoder,
  getU128Encoder,
  getU64Decoder,
  getU64Encoder,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
  type Option,
  type OptionOrNullable,
} from '@solana/web3.js';
import {
  getSelfTradeBehaviorDecoder,
  getSelfTradeBehaviorEncoder,
  getSideDecoder,
  getSideEncoder,
  type SelfTradeBehavior,
  type SelfTradeBehaviorArgs,
  type Side,
  type SideArgs,
} from '.';

export type OrderPacket =
  | {
      __kind: 'PostOnly';
      side: Side;
      priceInTicks: bigint;
      numBaseLots: bigint;
      clientOrderId: bigint;
      rejectPostOnly: boolean;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: Option<bigint>;
      lastValidUnixTimestampInSeconds: Option<bigint>;
      failSilentlyOnInsufficientFunds: boolean;
    }
  | {
      __kind: 'Limit';
      side: Side;
      priceInTicks: bigint;
      numBaseLots: bigint;
      selfTradeBehavior: SelfTradeBehavior;
      matchLimit: Option<bigint>;
      clientOrderId: bigint;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: Option<bigint>;
      lastValidUnixTimestampInSeconds: Option<bigint>;
      failSilentlyOnInsufficientFunds: boolean;
    }
  | {
      __kind: 'ImmediateOrCancel';
      side: Side;
      priceInTicks: Option<bigint>;
      numBaseLots: bigint;
      numQuoteLots: bigint;
      minBaseLotsToFill: bigint;
      minQuoteLotsToFill: bigint;
      selfTradeBehavior: SelfTradeBehavior;
      matchLimit: Option<bigint>;
      clientOrderId: bigint;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: Option<bigint>;
      lastValidUnixTimestampInSeconds: Option<bigint>;
    };

export type OrderPacketArgs =
  | {
      __kind: 'PostOnly';
      side: SideArgs;
      priceInTicks: number | bigint;
      numBaseLots: number | bigint;
      clientOrderId: number | bigint;
      rejectPostOnly: boolean;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: OptionOrNullable<number | bigint>;
      lastValidUnixTimestampInSeconds: OptionOrNullable<number | bigint>;
      failSilentlyOnInsufficientFunds: boolean;
    }
  | {
      __kind: 'Limit';
      side: SideArgs;
      priceInTicks: number | bigint;
      numBaseLots: number | bigint;
      selfTradeBehavior: SelfTradeBehaviorArgs;
      matchLimit: OptionOrNullable<number | bigint>;
      clientOrderId: number | bigint;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: OptionOrNullable<number | bigint>;
      lastValidUnixTimestampInSeconds: OptionOrNullable<number | bigint>;
      failSilentlyOnInsufficientFunds: boolean;
    }
  | {
      __kind: 'ImmediateOrCancel';
      side: SideArgs;
      priceInTicks: OptionOrNullable<number | bigint>;
      numBaseLots: number | bigint;
      numQuoteLots: number | bigint;
      minBaseLotsToFill: number | bigint;
      minQuoteLotsToFill: number | bigint;
      selfTradeBehavior: SelfTradeBehaviorArgs;
      matchLimit: OptionOrNullable<number | bigint>;
      clientOrderId: number | bigint;
      useOnlyDepositedFunds: boolean;
      lastValidSlot: OptionOrNullable<number | bigint>;
      lastValidUnixTimestampInSeconds: OptionOrNullable<number | bigint>;
    };

export function getOrderPacketEncoder(): Encoder<OrderPacketArgs> {
  return getDiscriminatedUnionEncoder([
    [
      'PostOnly',
      getStructEncoder([
        ['side', getSideEncoder()],
        ['priceInTicks', getU64Encoder()],
        ['numBaseLots', getU64Encoder()],
        ['clientOrderId', getU128Encoder()],
        ['rejectPostOnly', getBooleanEncoder()],
        ['useOnlyDepositedFunds', getBooleanEncoder()],
        ['lastValidSlot', getOptionEncoder(getU64Encoder())],
        ['lastValidUnixTimestampInSeconds', getOptionEncoder(getU64Encoder())],
        ['failSilentlyOnInsufficientFunds', getBooleanEncoder()],
      ]),
    ],
    [
      'Limit',
      getStructEncoder([
        ['side', getSideEncoder()],
        ['priceInTicks', getU64Encoder()],
        ['numBaseLots', getU64Encoder()],
        ['selfTradeBehavior', getSelfTradeBehaviorEncoder()],
        ['matchLimit', getOptionEncoder(getU64Encoder())],
        ['clientOrderId', getU128Encoder()],
        ['useOnlyDepositedFunds', getBooleanEncoder()],
        ['lastValidSlot', getOptionEncoder(getU64Encoder())],
        ['lastValidUnixTimestampInSeconds', getOptionEncoder(getU64Encoder())],
        ['failSilentlyOnInsufficientFunds', getBooleanEncoder()],
      ]),
    ],
    [
      'ImmediateOrCancel',
      getStructEncoder([
        ['side', getSideEncoder()],
        ['priceInTicks', getOptionEncoder(getU64Encoder())],
        ['numBaseLots', getU64Encoder()],
        ['numQuoteLots', getU64Encoder()],
        ['minBaseLotsToFill', getU64Encoder()],
        ['minQuoteLotsToFill', getU64Encoder()],
        ['selfTradeBehavior', getSelfTradeBehaviorEncoder()],
        ['matchLimit', getOptionEncoder(getU64Encoder())],
        ['clientOrderId', getU128Encoder()],
        ['useOnlyDepositedFunds', getBooleanEncoder()],
        ['lastValidSlot', getOptionEncoder(getU64Encoder())],
        ['lastValidUnixTimestampInSeconds', getOptionEncoder(getU64Encoder())],
      ]),
    ],
  ]);
}

export function getOrderPacketDecoder(): Decoder<OrderPacket> {
  return getDiscriminatedUnionDecoder([
    [
      'PostOnly',
      getStructDecoder([
        ['side', getSideDecoder()],
        ['priceInTicks', getU64Decoder()],
        ['numBaseLots', getU64Decoder()],
        ['clientOrderId', getU128Decoder()],
        ['rejectPostOnly', getBooleanDecoder()],
        ['useOnlyDepositedFunds', getBooleanDecoder()],
        ['lastValidSlot', getOptionDecoder(getU64Decoder())],
        ['lastValidUnixTimestampInSeconds', getOptionDecoder(getU64Decoder())],
        ['failSilentlyOnInsufficientFunds', getBooleanDecoder()],
      ]),
    ],
    [
      'Limit',
      getStructDecoder([
        ['side', getSideDecoder()],
        ['priceInTicks', getU64Decoder()],
        ['numBaseLots', getU64Decoder()],
        ['selfTradeBehavior', getSelfTradeBehaviorDecoder()],
        ['matchLimit', getOptionDecoder(getU64Decoder())],
        ['clientOrderId', getU128Decoder()],
        ['useOnlyDepositedFunds', getBooleanDecoder()],
        ['lastValidSlot', getOptionDecoder(getU64Decoder())],
        ['lastValidUnixTimestampInSeconds', getOptionDecoder(getU64Decoder())],
        ['failSilentlyOnInsufficientFunds', getBooleanDecoder()],
      ]),
    ],
    [
      'ImmediateOrCancel',
      getStructDecoder([
        ['side', getSideDecoder()],
        ['priceInTicks', getOptionDecoder(getU64Decoder())],
        ['numBaseLots', getU64Decoder()],
        ['numQuoteLots', getU64Decoder()],
        ['minBaseLotsToFill', getU64Decoder()],
        ['minQuoteLotsToFill', getU64Decoder()],
        ['selfTradeBehavior', getSelfTradeBehaviorDecoder()],
        ['matchLimit', getOptionDecoder(getU64Decoder())],
        ['clientOrderId', getU128Decoder()],
        ['useOnlyDepositedFunds', getBooleanDecoder()],
        ['lastValidSlot', getOptionDecoder(getU64Decoder())],
        ['lastValidUnixTimestampInSeconds', getOptionDecoder(getU64Decoder())],
      ]),
    ],
  ]);
}

export function getOrderPacketCodec(): Codec<OrderPacketArgs, OrderPacket> {
  return combineCodec(getOrderPacketEncoder(), getOrderPacketDecoder());
}

// Data Enum Helpers.
export function orderPacket(
  kind: 'PostOnly',
  data: GetDiscriminatedUnionVariantContent<
    OrderPacketArgs,
    '__kind',
    'PostOnly'
  >
): GetDiscriminatedUnionVariant<OrderPacketArgs, '__kind', 'PostOnly'>;
export function orderPacket(
  kind: 'Limit',
  data: GetDiscriminatedUnionVariantContent<OrderPacketArgs, '__kind', 'Limit'>
): GetDiscriminatedUnionVariant<OrderPacketArgs, '__kind', 'Limit'>;
export function orderPacket(
  kind: 'ImmediateOrCancel',
  data: GetDiscriminatedUnionVariantContent<
    OrderPacketArgs,
    '__kind',
    'ImmediateOrCancel'
  >
): GetDiscriminatedUnionVariant<OrderPacketArgs, '__kind', 'ImmediateOrCancel'>;
export function orderPacket<K extends OrderPacketArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isOrderPacket<K extends OrderPacket['__kind']>(
  kind: K,
  value: OrderPacket
): value is OrderPacket & { __kind: K } {
  return value.__kind === kind;
}
