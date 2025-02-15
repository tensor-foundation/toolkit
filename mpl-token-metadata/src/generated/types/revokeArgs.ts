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

export enum RevokeArgs {
  CollectionV1,
  SaleV1,
  TransferV1,
  DataV1,
  UtilityV1,
  StakingV1,
  StandardV1,
  LockedTransferV1,
  ProgrammableConfigV1,
  MigrationV1,
  AuthorityItemV1,
  DataItemV1,
  CollectionItemV1,
  ProgrammableConfigItemV1,
  PrintDelegateV1,
}

export type RevokeArgsArgs = RevokeArgs;

export function getRevokeArgsEncoder(): Encoder<RevokeArgsArgs> {
  return getEnumEncoder(RevokeArgs);
}

export function getRevokeArgsDecoder(): Decoder<RevokeArgs> {
  return getEnumDecoder(RevokeArgs);
}

export function getRevokeArgsCodec(): Codec<RevokeArgsArgs, RevokeArgs> {
  return combineCodec(getRevokeArgsEncoder(), getRevokeArgsDecoder());
}
