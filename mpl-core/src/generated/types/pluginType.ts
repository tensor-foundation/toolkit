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

export enum PluginType {
  Royalties,
  FreezeDelegate,
  BurnDelegate,
  TransferDelegate,
  UpdateDelegate,
  PermanentFreezeDelegate,
  Attributes,
  PermanentTransferDelegate,
  PermanentBurnDelegate,
  Edition,
  MasterEdition,
  AddBlocker,
  ImmutableMetadata,
  VerifiedCreators,
  Autograph,
}

export type PluginTypeArgs = PluginType;

export function getPluginTypeEncoder(): Encoder<PluginTypeArgs> {
  return getEnumEncoder(PluginType);
}

export function getPluginTypeDecoder(): Decoder<PluginType> {
  return getEnumDecoder(PluginType);
}

export function getPluginTypeCodec(): Codec<PluginTypeArgs, PluginType> {
  return combineCodec(getPluginTypeEncoder(), getPluginTypeDecoder());
}
