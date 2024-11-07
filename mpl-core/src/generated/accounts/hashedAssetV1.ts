/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
  type ReadonlyUint8Array,
} from '@solana/web3.js';
import { getKeyDecoder, getKeyEncoder, type Key, type KeyArgs } from '../types';

export type HashedAssetV1 = { key: Key; hash: ReadonlyUint8Array };

export type HashedAssetV1Args = { key: KeyArgs; hash: ReadonlyUint8Array };

export function getHashedAssetV1Encoder(): Encoder<HashedAssetV1Args> {
  return getStructEncoder([
    ['key', getKeyEncoder()],
    ['hash', fixEncoderSize(getBytesEncoder(), 32)],
  ]);
}

export function getHashedAssetV1Decoder(): Decoder<HashedAssetV1> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['hash', fixDecoderSize(getBytesDecoder(), 32)],
  ]);
}

export function getHashedAssetV1Codec(): Codec<
  HashedAssetV1Args,
  HashedAssetV1
> {
  return combineCodec(getHashedAssetV1Encoder(), getHashedAssetV1Decoder());
}

export function decodeHashedAssetV1<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<HashedAssetV1, TAddress>;
export function decodeHashedAssetV1<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<HashedAssetV1, TAddress>;
export function decodeHashedAssetV1<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<HashedAssetV1, TAddress> | MaybeAccount<HashedAssetV1, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getHashedAssetV1Decoder()
  );
}

export async function fetchHashedAssetV1<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<HashedAssetV1, TAddress>> {
  const maybeAccount = await fetchMaybeHashedAssetV1(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeHashedAssetV1<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<HashedAssetV1, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeHashedAssetV1(maybeAccount);
}

export async function fetchAllHashedAssetV1(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<HashedAssetV1>[]> {
  const maybeAccounts = await fetchAllMaybeHashedAssetV1(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeHashedAssetV1(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<HashedAssetV1>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeHashedAssetV1(maybeAccount));
}

export function getHashedAssetV1Size(): number {
  return 33;
}
