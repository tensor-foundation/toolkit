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
  getArrayDecoder,
  getArrayEncoder,
  getStructDecoder,
  getStructEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export type UpdateDelegate = { additionalDelegates: Array<Address> };

export type UpdateDelegateArgs = UpdateDelegate;

export function getUpdateDelegateEncoder(): Encoder<UpdateDelegateArgs> {
  return getStructEncoder([
    ['additionalDelegates', getArrayEncoder(getAddressEncoder())],
  ]);
}

export function getUpdateDelegateDecoder(): Decoder<UpdateDelegate> {
  return getStructDecoder([
    ['additionalDelegates', getArrayDecoder(getAddressDecoder())],
  ]);
}

export function getUpdateDelegateCodec(): Codec<
  UpdateDelegateArgs,
  UpdateDelegate
> {
  return combineCodec(getUpdateDelegateEncoder(), getUpdateDelegateDecoder());
}
