/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Account,
  Address,
  Codec,
  Decoder,
  EncodedAccount,
  Encoder,
  FetchAccountConfig,
  FetchAccountsConfig,
  MaybeAccount,
  MaybeEncodedAccount,
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  getArrayDecoder,
  getArrayEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/web3.js';
import { Key, KeyArgs, getKeyDecoder, getKeyEncoder } from '../types';

export type EditionMarker = { key: Key; ledger: Array<number> };

export type EditionMarkerArgs = { key: KeyArgs; ledger: Array<number> };

export function getEditionMarkerEncoder(): Encoder<EditionMarkerArgs> {
  return getStructEncoder([
    ['key', getKeyEncoder()],
    ['ledger', getArrayEncoder(getU8Encoder(), { size: 31 })],
  ]);
}

export function getEditionMarkerDecoder(): Decoder<EditionMarker> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['ledger', getArrayDecoder(getU8Decoder(), { size: 31 })],
  ]);
}

export function getEditionMarkerCodec(): Codec<
  EditionMarkerArgs,
  EditionMarker
> {
  return combineCodec(getEditionMarkerEncoder(), getEditionMarkerDecoder());
}

export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<EditionMarker, TAddress>;
export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<EditionMarker, TAddress>;
export function decodeEditionMarker<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<EditionMarker, TAddress> | MaybeAccount<EditionMarker, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getEditionMarkerDecoder()
  );
}

export async function fetchEditionMarker<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<EditionMarker, TAddress>> {
  const maybeAccount = await fetchMaybeEditionMarker(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeEditionMarker<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<EditionMarker, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeEditionMarker(maybeAccount);
}

export async function fetchAllEditionMarker(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<EditionMarker>[]> {
  const maybeAccounts = await fetchAllMaybeEditionMarker(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeEditionMarker(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<EditionMarker>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeEditionMarker(maybeAccount));
}

export function getEditionMarkerSize(): number {
  return 32;
}
