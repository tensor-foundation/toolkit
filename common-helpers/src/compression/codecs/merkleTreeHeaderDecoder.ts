import { 
    getAddressDecoder, 
    getStructDecoder, 
    getU8Decoder, 
    getU32Decoder, 
    getU64Decoder, 
    getArrayDecoder, 
    getEnumDecoder, 
    getDiscriminatedUnionDecoder, 
    Address,
    VariableSizeDecoder,
    Decoder
} from "@solana/web3.js";


enum CompressionAccountType {
    Uninitialized,
    ConcurrentMerkleTree,
};

type ConcurrentMerkleTreeHeader = {
    accountType: CompressionAccountType;
    header: ConcurrentMerkleTreeHeaderDataRecord;
};

type ConcurrentMerkleTreeHeaderDataRecord = ConcurrentMerkleTreeHeaderDataV1 & {
    __kind: 'V1';
};

type ConcurrentMerkleTreeHeaderDataV1 = {
    maxBufferSize: number;
    maxDepth: number;
    authority: Address;
    creationSlot: bigint;
    padding: number[];
};

export function getConcurrentMerkleTreeHeaderDecoder(): VariableSizeDecoder<ConcurrentMerkleTreeHeader> {
    return getStructDecoder([
        ['accountType', getCompressionAccountTypeDecoder()],
        ['header', getConcurrentMerkleTreeHeaderDataDecoder()],
    ]);
}

function getCompressionAccountTypeDecoder(): Decoder<CompressionAccountType> {
    return getEnumDecoder(CompressionAccountType);
}

function getConcurrentMerkleTreeHeaderDataDecoder(): Decoder<ConcurrentMerkleTreeHeaderDataRecord> {
    return getDiscriminatedUnionDecoder([
        [
            'V1', 
            getConcurrentMerkleTreeHeaderDataV1Decoder()
        ]
    ]);
}

function getConcurrentMerkleTreeHeaderDataV1Decoder(): Decoder<ConcurrentMerkleTreeHeaderDataV1> {
    return getStructDecoder([
        ['maxBufferSize', getU32Decoder()],
        ['maxDepth', getU32Decoder()],
        ['authority', getAddressDecoder()],
        ['creationSlot', getU64Decoder()],
        ['padding', getArrayDecoder(getU8Decoder(), { size: 6 })],
    ]);
}