/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getArrayDecoder,
  getArrayEncoder,
  getStructDecoder,
  getStructEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';
import {
  getCancelOrderParamsDecoder,
  getCancelOrderParamsEncoder,
  type CancelOrderParams,
  type CancelOrderParamsArgs,
} from '.';

export type CancelMultipleOrdersByIdParams = {
  orders: Array<CancelOrderParams>;
};

export type CancelMultipleOrdersByIdParamsArgs = {
  orders: Array<CancelOrderParamsArgs>;
};

export function getCancelMultipleOrdersByIdParamsEncoder(): Encoder<CancelMultipleOrdersByIdParamsArgs> {
  return getStructEncoder([
    ['orders', getArrayEncoder(getCancelOrderParamsEncoder())],
  ]);
}

export function getCancelMultipleOrdersByIdParamsDecoder(): Decoder<CancelMultipleOrdersByIdParams> {
  return getStructDecoder([
    ['orders', getArrayDecoder(getCancelOrderParamsDecoder())],
  ]);
}

export function getCancelMultipleOrdersByIdParamsCodec(): Codec<
  CancelMultipleOrdersByIdParamsArgs,
  CancelMultipleOrdersByIdParams
> {
  return combineCodec(
    getCancelMultipleOrdersByIdParamsEncoder(),
    getCancelMultipleOrdersByIdParamsDecoder()
  );
}
