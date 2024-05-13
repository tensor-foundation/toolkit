import { getAddressDecoder } from "@solana/addresses";
import { getStructDecoder } from "@solana/codecs";
import { getU8Decoder, getU32Decoder, getU64Decoder } from "@solana/codecs-numbers";
import { getArrayDecoder, getScalarEnumDecoder, getDataEnumDecoder } from "@solana/codecs-data-structures";

enum CompressionAccountType {
    Uninitialized,
    ConcurrentMerkleTree,
};

export function getConcurrentMerkleTreeHeaderDecoder() {
    return getStructDecoder([
        ['accountType', getCompressionAccountTypeDecoder()],
        ['header', getConcurrentMerkleTreeHeaderDataDecoder()],
    ]);
}

function getCompressionAccountTypeDecoder() {
    return getScalarEnumDecoder(CompressionAccountType);
}

function getConcurrentMerkleTreeHeaderDataDecoder() {
    return getDataEnumDecoder([
        ['V1', getConcurrentMerkleTreeHeaderDataV1Decoder()]
    ]);
}

function getConcurrentMerkleTreeHeaderDataV1Decoder() {
    return getStructDecoder([
        ['maxBufferSize', getU32Decoder()],
        ['maxDepth', getU32Decoder()],
        ['authority', getAddressDecoder()],
        ['creationSlot', getU64Decoder()],
        ['padding', getArrayDecoder(getU8Decoder(), { size: 6 })],
    ]);
}