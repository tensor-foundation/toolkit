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
  Option,
  OptionOrNullable,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
} from '@solana/web3.js';
import {
  Authority,
  AuthorityArgs,
  ExternalCheckResult,
  ExternalCheckResultArgs,
  ExtraAccount,
  ExtraAccountArgs,
  HookableLifecycleEvent,
  HookableLifecycleEventArgs,
  ValidationResultsOffset,
  ValidationResultsOffsetArgs,
  getAuthorityDecoder,
  getAuthorityEncoder,
  getExternalCheckResultDecoder,
  getExternalCheckResultEncoder,
  getExtraAccountDecoder,
  getExtraAccountEncoder,
  getHookableLifecycleEventDecoder,
  getHookableLifecycleEventEncoder,
  getValidationResultsOffsetDecoder,
  getValidationResultsOffsetEncoder,
} from '.';

export type OracleInitInfo = {
  baseAddress: Address;
  initPluginAuthority: Option<Authority>;
  lifecycleChecks: Array<
    readonly [HookableLifecycleEvent, ExternalCheckResult]
  >;
  baseAddressConfig: Option<ExtraAccount>;
  resultsOffset: Option<ValidationResultsOffset>;
};

export type OracleInitInfoArgs = {
  baseAddress: Address;
  initPluginAuthority: OptionOrNullable<AuthorityArgs>;
  lifecycleChecks: Array<
    readonly [HookableLifecycleEventArgs, ExternalCheckResultArgs]
  >;
  baseAddressConfig: OptionOrNullable<ExtraAccountArgs>;
  resultsOffset: OptionOrNullable<ValidationResultsOffsetArgs>;
};

export function getOracleInitInfoEncoder(): Encoder<OracleInitInfoArgs> {
  return getStructEncoder([
    ['baseAddress', getAddressEncoder()],
    ['initPluginAuthority', getOptionEncoder(getAuthorityEncoder())],
    [
      'lifecycleChecks',
      getArrayEncoder(
        getTupleEncoder([
          getHookableLifecycleEventEncoder(),
          getExternalCheckResultEncoder(),
        ])
      ),
    ],
    ['baseAddressConfig', getOptionEncoder(getExtraAccountEncoder())],
    ['resultsOffset', getOptionEncoder(getValidationResultsOffsetEncoder())],
  ]);
}

export function getOracleInitInfoDecoder(): Decoder<OracleInitInfo> {
  return getStructDecoder([
    ['baseAddress', getAddressDecoder()],
    ['initPluginAuthority', getOptionDecoder(getAuthorityDecoder())],
    [
      'lifecycleChecks',
      getArrayDecoder(
        getTupleDecoder([
          getHookableLifecycleEventDecoder(),
          getExternalCheckResultDecoder(),
        ])
      ),
    ],
    ['baseAddressConfig', getOptionDecoder(getExtraAccountDecoder())],
    ['resultsOffset', getOptionDecoder(getValidationResultsOffsetDecoder())],
  ]);
}

export function getOracleInitInfoCodec(): Codec<
  OracleInitInfoArgs,
  OracleInitInfo
> {
  return combineCodec(getOracleInitInfoEncoder(), getOracleInitInfoDecoder());
}
