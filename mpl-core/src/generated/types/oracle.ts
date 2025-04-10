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
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type Option,
  type OptionOrNullable,
} from '@solana/web3.js';
import {
  getExtraAccountDecoder,
  getExtraAccountEncoder,
  getValidationResultsOffsetDecoder,
  getValidationResultsOffsetEncoder,
  type ExtraAccount,
  type ExtraAccountArgs,
  type ValidationResultsOffset,
  type ValidationResultsOffsetArgs,
} from '.';

export type Oracle = {
  baseAddress: Address;
  baseAddressConfig: Option<ExtraAccount>;
  resultsOffset: ValidationResultsOffset;
};

export type OracleArgs = {
  baseAddress: Address;
  baseAddressConfig: OptionOrNullable<ExtraAccountArgs>;
  resultsOffset: ValidationResultsOffsetArgs;
};

export function getOracleEncoder(): Encoder<OracleArgs> {
  return getStructEncoder([
    ['baseAddress', getAddressEncoder()],
    ['baseAddressConfig', getOptionEncoder(getExtraAccountEncoder())],
    ['resultsOffset', getValidationResultsOffsetEncoder()],
  ]);
}

export function getOracleDecoder(): Decoder<Oracle> {
  return getStructDecoder([
    ['baseAddress', getAddressDecoder()],
    ['baseAddressConfig', getOptionDecoder(getExtraAccountDecoder())],
    ['resultsOffset', getValidationResultsOffsetDecoder()],
  ]);
}

export function getOracleCodec(): Codec<OracleArgs, Oracle> {
  return combineCodec(getOracleEncoder(), getOracleDecoder());
}
