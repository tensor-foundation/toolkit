import {
  Codec,
  Decoder,
  Encoder,
  Option,
  OptionOrNullable,
  combineCodec,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStringDecoder,
  getStringEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/codecs';
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
  creatorShares: Uint8Array;
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
  creatorShares: Uint8Array;
  creatorVerified: Array<boolean>;
};

export function getTMetadataArgsEncoder(): Encoder<TMetadataArgsArgs> {
  return getStructEncoder([
    ['name', getStringEncoder()],
    ['symbol', getStringEncoder()],
    ['uri', getStringEncoder()],
    ['sellerFeeBasisPoints', getU16Encoder()],
    ['primarySaleHappened', getBooleanEncoder()],
    ['isMutable', getBooleanEncoder()],
    ['editionNonce', getOptionEncoder(getU8Encoder())],
    ['tokenStandard', getOptionEncoder(getTTokenStandardEncoder())],
    ['collection', getOptionEncoder(getTCollectionEncoder())],
    ['uses', getOptionEncoder(getTUsesEncoder())],
    ['tokenProgramVersion', getTTokenProgramVersionEncoder()],
    ['creatorShares', getBytesEncoder({ size: getU32Encoder() })],
    ['creatorVerified', getArrayEncoder(getBooleanEncoder())],
  ]);
}

export function getTMetadataArgsDecoder(): Decoder<TMetadataArgs> {
  return getStructDecoder([
    ['name', getStringDecoder()],
    ['symbol', getStringDecoder()],
    ['uri', getStringDecoder()],
    ['sellerFeeBasisPoints', getU16Decoder()],
    ['primarySaleHappened', getBooleanDecoder()],
    ['isMutable', getBooleanDecoder()],
    ['editionNonce', getOptionDecoder(getU8Decoder())],
    ['tokenStandard', getOptionDecoder(getTTokenStandardDecoder())],
    ['collection', getOptionDecoder(getTCollectionDecoder())],
    ['uses', getOptionDecoder(getTUsesDecoder())],
    ['tokenProgramVersion', getTTokenProgramVersionDecoder()],
    ['creatorShares', getBytesDecoder({ size: getU32Decoder() })],
    ['creatorVerified', getArrayDecoder(getBooleanDecoder())],
  ]);
}

export function getTMetadataArgsCodec(): Codec<
  TMetadataArgsArgs,
  TMetadataArgs
> {
  return combineCodec(getTMetadataArgsEncoder(), getTMetadataArgsDecoder());
}
