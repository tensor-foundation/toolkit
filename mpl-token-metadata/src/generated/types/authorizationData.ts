/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';
import {
  getPayloadDecoder,
  getPayloadEncoder,
  type Payload,
  type PayloadArgs,
} from '.';

export type AuthorizationData = { payload: Payload };

export type AuthorizationDataArgs = { payload: PayloadArgs };

export function getAuthorizationDataEncoder(): Encoder<AuthorizationDataArgs> {
  return getStructEncoder([['payload', getPayloadEncoder()]]);
}

export function getAuthorizationDataDecoder(): Decoder<AuthorizationData> {
  return getStructDecoder([['payload', getPayloadDecoder()]]);
}

export function getAuthorizationDataCodec(): Codec<
  AuthorizationDataArgs,
  AuthorizationData
> {
  return combineCodec(
    getAuthorizationDataEncoder(),
    getAuthorizationDataDecoder()
  );
}
