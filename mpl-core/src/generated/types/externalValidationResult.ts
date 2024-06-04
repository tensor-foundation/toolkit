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

export enum ExternalValidationResult {
  Approved,
  Rejected,
  Pass,
}

export type ExternalValidationResultArgs = ExternalValidationResult;

export function getExternalValidationResultEncoder(): Encoder<ExternalValidationResultArgs> {
  return getEnumEncoder(ExternalValidationResult);
}

export function getExternalValidationResultDecoder(): Decoder<ExternalValidationResult> {
  return getEnumDecoder(ExternalValidationResult);
}

export function getExternalValidationResultCodec(): Codec<
  ExternalValidationResultArgs,
  ExternalValidationResult
> {
  return combineCodec(
    getExternalValidationResultEncoder(),
    getExternalValidationResultDecoder()
  );
}