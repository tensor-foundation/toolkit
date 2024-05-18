import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getBooleanDecoder,
  getBooleanEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs';

export type TCollection = { verified: boolean; key: Address };

export type TCollectionArgs = TCollection;

export function getTCollectionEncoder(): Encoder<TCollectionArgs> {
  return getStructEncoder([
    ['verified', getBooleanEncoder()],
    ['key', getAddressEncoder()],
  ]);
}

export function getTCollectionDecoder(): Decoder<TCollection> {
  return getStructDecoder([
    ['verified', getBooleanDecoder()],
    ['key', getAddressDecoder()],
  ]);
}

export function getTCollectionCodec(): Codec<TCollectionArgs, TCollection> {
  return combineCodec(getTCollectionEncoder(), getTCollectionDecoder());
}
