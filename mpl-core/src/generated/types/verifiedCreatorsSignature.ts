/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/web3.js';

export type VerifiedCreatorsSignature = { address: Address; verified: boolean };

export type VerifiedCreatorsSignatureArgs = VerifiedCreatorsSignature;

export function getVerifiedCreatorsSignatureEncoder(): Encoder<VerifiedCreatorsSignatureArgs> {
  return getStructEncoder([
    ['address', getAddressEncoder()],
    ['verified', getBooleanEncoder()],
  ]);
}

export function getVerifiedCreatorsSignatureDecoder(): Decoder<VerifiedCreatorsSignature> {
  return getStructDecoder([
    ['address', getAddressDecoder()],
    ['verified', getBooleanDecoder()],
  ]);
}

export function getVerifiedCreatorsSignatureCodec(): Codec<
  VerifiedCreatorsSignatureArgs,
  VerifiedCreatorsSignature
> {
  return combineCodec(
    getVerifiedCreatorsSignatureEncoder(),
    getVerifiedCreatorsSignatureDecoder()
  );
}