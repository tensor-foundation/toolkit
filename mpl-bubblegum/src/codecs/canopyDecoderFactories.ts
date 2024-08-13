import {
  getArrayDecoder,
  getStructDecoder,
  getU8Decoder,
} from '@solana/web3.js';

export const getCanopyDecoderFactory = (canopyDepth: number) => {
  const canopyBytesSize = Math.max(((1 << (canopyDepth + 1)) - 2) * 32, 0);
  return getStructDecoder([
    ['canopyBytes', getArrayDecoder(getU8Decoder(), { size: canopyBytesSize })],
  ]);
};
