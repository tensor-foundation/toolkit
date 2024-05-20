import {
  getAddressDecoder,
  getStructDecoder,
  getU32Decoder,
  getU64Decoder,
  getArrayDecoder,
} from '@solana/web3.js';

export function getConcurrentMerkleTreeDecoderFactory(
  maxDepth: number,
  maxBufferSize: number
) {
  return getStructDecoder([
    ['sequenceNumber', getU64Decoder()],
    ['activeIndex', getU64Decoder()],
    ['bufferSize', getU64Decoder()],
    [
      'changeLogs',
      getArrayDecoder(getChangeLogDecoderFactory(maxDepth), {
        size: maxBufferSize,
      }),
    ],
    ['rightMostPath', getPathDecoderFactory(maxDepth)],
  ]);
}

function getChangeLogDecoderFactory(maxDepth: number) {
  return getStructDecoder([
    ['root', getAddressDecoder()],
    ['pathNodes', getArrayDecoder(getAddressDecoder(), { size: maxDepth })],
    ['index', getU32Decoder()],
    ['_padding', getU32Decoder()],
  ]);
}

function getPathDecoderFactory(maxDepth: number) {
  return getStructDecoder([
    ['proof', getArrayDecoder(getAddressDecoder(), { size: maxDepth })],
    ['leaf', getAddressDecoder()],
    ['index', getU32Decoder()],
    ['_padding', getU32Decoder()],
  ]);
}
