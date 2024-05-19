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
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
} from '@solana/web3.js';
import { Key, KeyArgs, getKeyDecoder, getKeyEncoder } from '../types';

export type Counter = { key: Key; authority: Address; value: number };

export type CounterArgs = { key: KeyArgs; authority: Address; value: number };

export function getCounterEncoder(): Encoder<CounterArgs> {
  return getStructEncoder([
    ['key', getKeyEncoder()],
    ['authority', getAddressEncoder()],
    ['value', getU32Encoder()],
  ]);
}

export function getCounterDecoder(): Decoder<Counter> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['authority', getAddressDecoder()],
    ['value', getU32Decoder()],
  ]);
}

export function getCounterCodec(): Codec<CounterArgs, Counter> {
  return combineCodec(getCounterEncoder(), getCounterDecoder());
}

export function decodeCounter<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Counter, TAddress>;
export function decodeCounter<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Counter, TAddress>;
export function decodeCounter<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Counter, TAddress> | MaybeAccount<Counter, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getCounterDecoder()
  );
}

export async function fetchCounter<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Counter, TAddress>> {
  const maybeAccount = await fetchMaybeCounter(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeCounter<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Counter, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeCounter(maybeAccount);
}

export async function fetchAllCounter(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Counter>[]> {
  const maybeAccounts = await fetchAllMaybeCounter(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeCounter(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Counter>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeCounter(maybeAccount));
}

export function getCounterSize(): number {
  return 37;
}
