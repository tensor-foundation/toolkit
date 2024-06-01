import {
  Codec,
  Decoder,
  Encoder,
  Option,
  OptionOrNullable,
  ReadonlyUint8Array,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
} from '@solana/web3.js';
import {
  TCollection,
  TCollectionArgs,
  TTokenProgramVersion,
  TTokenProgramVersionArgs,
  TTokenStandard,
  TTokenStandardArgs,
  TUses,
  TUsesArgs,
  getTCollectionDecoder,
  getTCollectionEncoder,
  getTTokenProgramVersionDecoder,
  getTTokenProgramVersionEncoder,
  getTTokenStandardDecoder,
  getTTokenStandardEncoder,
  getTUsesDecoder,
  getTUsesEncoder,
} from '.';

export type TMetadataArgs = {
  /** The name of the asset */
  name: string;
  /** The symbol for the asset */
  symbol: string;
  /** URI pointing to JSON representing the asset */
  uri: string;
  /** Royalty basis points that goes to creators in secondary sales (0-10000) */
  sellerFeeBasisPoints: number;
  primarySaleHappened: boolean;
  isMutable: boolean;
  /** nonce for easy calculation of editions, if present */
  editionNonce: Option<number>;
  /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
  tokenStandard: Option<TTokenStandard>;
  /** Collection */
  collection: Option<TCollection>;
  /** Uses */
  uses: Option<TUses>;
  tokenProgramVersion: TTokenProgramVersion;
  creatorShares: ReadonlyUint8Array;
  creatorVerified: Array<boolean>;
};

export type TMetadataArgsArgs = {
  /** The name of the asset */
  name: string;
  /** The symbol for the asset */
  symbol: string;
  /** URI pointing to JSON representing the asset */
  uri: string;
  /** Royalty basis points that goes to creators in secondary sales (0-10000) */
  sellerFeeBasisPoints: number;
  primarySaleHappened: boolean;
  isMutable: boolean;
  /** nonce for easy calculation of editions, if present */
  editionNonce: OptionOrNullable<number>;
  /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
  tokenStandard: OptionOrNullable<TTokenStandardArgs>;
  /** Collection */
  collection: OptionOrNullable<TCollectionArgs>;
  /** Uses */
  uses: OptionOrNullable<TUsesArgs>;
  tokenProgramVersion: TTokenProgramVersionArgs;
  creatorShares: ReadonlyUint8Array;
  creatorVerified: Array<boolean>;
};

export function getTMetadataArgsEncoder(): Encoder<TMetadataArgsArgs> {
  return getStructEncoder([
    ['name', getUtf8Encoder()],
    ['symbol', getUtf8Encoder()],
    ['uri', getUtf8Encoder()],
    ['sellerFeeBasisPoints', getU16Encoder()],
    ['primarySaleHappened', getBooleanEncoder()],
    ['isMutable', getBooleanEncoder()],
    ['editionNonce', getOptionEncoder(getU8Encoder())],
    ['tokenStandard', getOptionEncoder(getTTokenStandardEncoder())],
    ['collection', getOptionEncoder(getTCollectionEncoder())],
    ['uses', getOptionEncoder(getTUsesEncoder())],
    ['tokenProgramVersion', getTTokenProgramVersionEncoder()],
    ['creatorShares', fixEncoderSize(getBytesEncoder(), 32)],
    ['creatorVerified', getArrayEncoder(getBooleanEncoder())],
  ]);
}

export function getTMetadataArgsDecoder(): Decoder<TMetadataArgs> {
  return getStructDecoder([
    ['name', getUtf8Decoder()],
    ['symbol', getUtf8Decoder()],
    ['uri', getUtf8Decoder()],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['primarySaleHappened', getBooleanDecoder()],
    ['isMutable', getBooleanDecoder()],
    ['editionNonce', getOptionDecoder(getU8Decoder())],
    ['tokenStandard', getOptionDecoder(getTTokenStandardDecoder())],
    ['collection', getOptionDecoder(getTCollectionDecoder())],
    ['uses', getOptionDecoder(getTUsesDecoder())],
    ['tokenProgramVersion', getTTokenProgramVersionDecoder()],
    ['creatorShares', fixDecoderSize(getBytesDecoder(), 32)],
    ['creatorVerified', getArrayDecoder(getBooleanDecoder())],
  ]);
}

export function getTMetadataArgsCodec(): Codec<
  TMetadataArgsArgs,
  TMetadataArgs
> {
  return combineCodec(getTMetadataArgsEncoder(), getTMetadataArgsDecoder());
}
