/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
  type Option,
  type OptionOrNullable,
} from '@solana/web3.js';
import { MetadataSeeds, findMetadataPda } from '../pdas';
import {
  getCollectionDecoder,
  getCollectionDetailsDecoder,
  getCollectionDetailsEncoder,
  getCollectionEncoder,
  getCreatorDecoder,
  getCreatorEncoder,
  getKeyDecoder,
  getKeyEncoder,
  getProgrammableConfigDecoder,
  getProgrammableConfigEncoder,
  getTokenStandardDecoder,
  getTokenStandardEncoder,
  getUsesDecoder,
  getUsesEncoder,
  type Collection,
  type CollectionArgs,
  type CollectionDetails,
  type CollectionDetailsArgs,
  type Creator,
  type CreatorArgs,
  type Key,
  type KeyArgs,
  type ProgrammableConfig,
  type ProgrammableConfigArgs,
  type TokenStandard,
  type TokenStandardArgs,
  type Uses,
  type UsesArgs,
} from '../types';

export type Metadata = {
  key: Key;
  updateAuthority: Address;
  mint: Address;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Option<Array<Creator>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: Option<number>;
  tokenStandard: Option<TokenStandard>;
  collection: Option<Collection>;
  uses: Option<Uses>;
  collectionDetails: Option<CollectionDetails>;
  programmableConfig: Option<ProgrammableConfig>;
};

export type MetadataArgs = {
  key: KeyArgs;
  updateAuthority: Address;
  mint: Address;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: OptionOrNullable<Array<CreatorArgs>>;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: OptionOrNullable<number>;
  tokenStandard: OptionOrNullable<TokenStandardArgs>;
  collection: OptionOrNullable<CollectionArgs>;
  uses: OptionOrNullable<UsesArgs>;
  collectionDetails: OptionOrNullable<CollectionDetailsArgs>;
  programmableConfig: OptionOrNullable<ProgrammableConfigArgs>;
};

export function getMetadataEncoder(): Encoder<MetadataArgs> {
  return getStructEncoder([
    ['key', getKeyEncoder()],
    ['updateAuthority', getAddressEncoder()],
    ['mint', getAddressEncoder()],
    ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ['sellerFeeBasisPoints', getU16Encoder()],
    ['creators', getOptionEncoder(getArrayEncoder(getCreatorEncoder()))],
    ['primarySaleHappened', getBooleanEncoder()],
    ['isMutable', getBooleanEncoder()],
    ['editionNonce', getOptionEncoder(getU8Encoder())],
    ['tokenStandard', getOptionEncoder(getTokenStandardEncoder())],
    ['collection', getOptionEncoder(getCollectionEncoder())],
    ['uses', getOptionEncoder(getUsesEncoder())],
    ['collectionDetails', getOptionEncoder(getCollectionDetailsEncoder())],
    ['programmableConfig', getOptionEncoder(getProgrammableConfigEncoder())],
  ]);
}

export function getMetadataDecoder(): Decoder<Metadata> {
  return getStructDecoder([
    ['key', getKeyDecoder()],
    ['updateAuthority', getAddressDecoder()],
    ['mint', getAddressDecoder()],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['creators', getOptionDecoder(getArrayDecoder(getCreatorDecoder()))],
    ['primarySaleHappened', getBooleanDecoder()],
    ['isMutable', getBooleanDecoder()],
    ['editionNonce', getOptionDecoder(getU8Decoder())],
    ['tokenStandard', getOptionDecoder(getTokenStandardDecoder())],
    ['collection', getOptionDecoder(getCollectionDecoder())],
    ['uses', getOptionDecoder(getUsesDecoder())],
    ['collectionDetails', getOptionDecoder(getCollectionDetailsDecoder())],
    ['programmableConfig', getOptionDecoder(getProgrammableConfigDecoder())],
  ]);
}

export function getMetadataCodec(): Codec<MetadataArgs, Metadata> {
  return combineCodec(getMetadataEncoder(), getMetadataDecoder());
}

export function decodeMetadata<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Metadata, TAddress>;
export function decodeMetadata<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Metadata, TAddress>;
export function decodeMetadata<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Metadata, TAddress> | MaybeAccount<Metadata, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getMetadataDecoder()
  );
}

export async function fetchMetadata<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Metadata, TAddress>> {
  const maybeAccount = await fetchMaybeMetadata(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeMetadata<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Metadata, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeMetadata(maybeAccount);
}

export async function fetchAllMetadata(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Metadata>[]> {
  const maybeAccounts = await fetchAllMaybeMetadata(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeMetadata(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Metadata>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeMetadata(maybeAccount));
}

export async function fetchMetadataFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: MetadataSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Account<Metadata>> {
  const maybeAccount = await fetchMaybeMetadataFromSeeds(rpc, seeds, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeMetadataFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: MetadataSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAccount<Metadata>> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findMetadataPda(seeds, { programAddress });
  return await fetchMaybeMetadata(rpc, address, fetchConfig);
}
