import {
  getAddressDecoder,
  getStructDecoder,
  getUtf8Decoder,
  getU8Decoder,
  getU16Decoder,
  getU32Decoder,
  getU64Decoder,
  getBooleanDecoder,
  getArrayDecoder,
  getEnumDecoder,
  getDiscriminatedUnionDecoder,
  getNullableDecoder,
  Decoder,
  addDecoderSizePrefix,
  Address,
} from '@solana/web3.js';
import {
  TCollection,
  TUses,
  getTCollectionDecoder,
  getTUsesDecoder,
} from '../../shared-types';
import type { TCreator } from './metadataArgsEncoder';

enum TTokenStandardWithProgrammable {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
  ProgrammableNonFungible,
}

enum Key {
  Uninitialized,
  EditionV1,
  MasterEditionV1,
  ReservationListV1,
  MetadataV1,
  ReservationListV2,
  MasterEditionV2,
  EditionMarker,
  UseAuthorityRecord,
  CollectionAuthorityRecord,
  TokenOwnedEscrow,
  TokenRecord,
  MetadataDelegate,
  EditionMarkerV2,
}

export type MetadataData = {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: TCreator[] | null;
};

export type ProgrammableConfigRecord = {
  ruleSet: Address | null;
};

export type ProgrammableConfig = ProgrammableConfigRecord & {
  __kind: 'V1';
};

export type CollectionDetails =
  | { __kind: 'V1'; size: bigint }
  | { __kind: 'V2'; padding: Array<number> };

export type Metadata = {
  key: Key;
  updateAuthority: Address;
  mint: Address;
  data: MetadataData;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number | null;
  tokenStandard: TTokenStandardWithProgrammable | null;
  collection: TCollection | null;
  uses: TUses | null;
  collectionDetails: CollectionDetails | null;
  programmableConfig: ProgrammableConfig | null;
};

export function getMetadataDecoder(): Decoder<Metadata> {
  return getStructDecoder([
    ['key', getEnumDecoder(Key)],
    ['updateAuthority', getAddressDecoder()],
    ['mint', getAddressDecoder()],
    ['data', getMetadataDataDecoder()],
    ['primarySaleHappened', getBooleanDecoder()],
    ['isMutable', getBooleanDecoder()],
    ['editionNonce', getNullableDecoder(getU8Decoder())],
    [
      'tokenStandard',
      getNullableDecoder(getEnumDecoder(TTokenStandardWithProgrammable)),
    ],
    ['collection', getNullableDecoder(getTCollectionDecoder())],
    ['uses', getNullableDecoder(getTUsesDecoder())],
    ['collectionDetails', getNullableDecoder(getCollectionDetailsDecoder())],
    ['programmableConfig', getNullableDecoder(getProgrammableConfigDecoder())],
  ]);
}

export function getCollectionDetailsDecoder(): Decoder<CollectionDetails> {
  return getDiscriminatedUnionDecoder([
    ['V1', getStructDecoder([['size', getU64Decoder()]])],
    ['V2', getStructDecoder([['padding', getArrayDecoder(getU8Decoder())]])],
  ]);
}

export function getProgrammableConfigDecoder(): Decoder<ProgrammableConfig> {
  return getDiscriminatedUnionDecoder([
    ['V1', getProgrammableConfigRecordDecoder()],
  ]);
}

export function getProgrammableConfigRecordDecoder(): Decoder<ProgrammableConfigRecord> {
  return getStructDecoder([
    ['ruleSet', getNullableDecoder(getAddressDecoder())],
  ]);
}

export function getMetadataDataDecoder(): Decoder<MetadataData> {
  return getStructDecoder([
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['creators', getNullableDecoder(getArrayDecoder(getTCreatorDecoder()))],
  ]);
}

export function getTCreatorDecoder(): Decoder<TCreator> {
  return getStructDecoder([
    ['address', getAddressDecoder()],
    ['verified', getBooleanDecoder()],
    ['share', getU8Decoder()],
  ]);
}
