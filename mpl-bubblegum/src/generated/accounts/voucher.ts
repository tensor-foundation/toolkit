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
  getAddressDecoder,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  transformEncoder,
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
import {
  getLeafSchemaDecoder,
  getLeafSchemaEncoder,
  type LeafSchema,
  type LeafSchemaArgs,
} from '../types';

export const VOUCHER_DISCRIMINATOR = new Uint8Array([
  191, 204, 149, 234, 213, 165, 13, 65,
]);

export function getVoucherDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(VOUCHER_DISCRIMINATOR);
}

export type Voucher = {
  discriminator: ReadonlyUint8Array;
  leafSchema: LeafSchema;
  index: number;
  merkleTree: Address;
};

export type VoucherArgs = {
  leafSchema: LeafSchemaArgs;
  index: number;
  merkleTree: Address;
};

export function getVoucherEncoder(): Encoder<VoucherArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['leafSchema', getLeafSchemaEncoder()],
      ['index', getU32Encoder()],
      ['merkleTree', getAddressEncoder()],
    ]),
    (value) => ({ ...value, discriminator: VOUCHER_DISCRIMINATOR })
  );
}

export function getVoucherDecoder(): Decoder<Voucher> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['leafSchema', getLeafSchemaDecoder()],
    ['index', getU32Decoder()],
    ['merkleTree', getAddressDecoder()],
  ]);
}

export function getVoucherCodec(): Codec<VoucherArgs, Voucher> {
  return combineCodec(getVoucherEncoder(), getVoucherDecoder());
}

export function decodeVoucher<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Voucher, TAddress>;
export function decodeVoucher<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Voucher, TAddress>;
export function decodeVoucher<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Voucher, TAddress> | MaybeAccount<Voucher, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getVoucherDecoder()
  );
}

export async function fetchVoucher<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Voucher, TAddress>> {
  const maybeAccount = await fetchMaybeVoucher(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeVoucher<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Voucher, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeVoucher(maybeAccount);
}

export async function fetchAllVoucher(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Voucher>[]> {
  const maybeAccounts = await fetchAllMaybeVoucher(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeVoucher(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Voucher>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeVoucher(maybeAccount));
}

export function getVoucherSize(): number {
  return 213;
}
