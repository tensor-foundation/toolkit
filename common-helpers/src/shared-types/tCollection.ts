import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getBooleanDecoder,
  getBooleanEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/web3.js';

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
