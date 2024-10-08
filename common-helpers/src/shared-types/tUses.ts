import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
} from '@solana/web3.js';
import {
  TUseMethod,
  TUseMethodArgs,
  getTUseMethodDecoder,
  getTUseMethodEncoder,
} from '.';

export type TUses = { useMethod: TUseMethod; remaining: bigint; total: bigint };

export type TUsesArgs = {
  useMethod: TUseMethodArgs;
  remaining: number | bigint;
  total: number | bigint;
};

export function getTUsesEncoder(): Encoder<TUsesArgs> {
  return getStructEncoder([
    ['useMethod', getTUseMethodEncoder()],
    ['remaining', getU64Encoder()],
    ['total', getU64Encoder()],
  ]);
}

export function getTUsesDecoder(): Decoder<TUses> {
  return getStructDecoder([
    ['useMethod', getTUseMethodDecoder()],
    ['remaining', getU64Decoder()],
    ['total', getU64Decoder()],
  ]);
}

export function getTUsesCodec(): Codec<TUsesArgs, TUses> {
  return combineCodec(getTUsesEncoder(), getTUsesDecoder());
}
