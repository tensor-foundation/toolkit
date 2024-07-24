import {
    getAddressDecoder,
    getStructDecoder,
    getU32Decoder,
    getU64Decoder,
    getArrayDecoder,
    getU8Decoder,
    Address,
    ProgramDerivedAddress,
    getProgramDerivedAddress,
    getAddressEncoder,
} from '@solana/web3.js';

export function getConcurrentMerkleTreeAccountSize(
    maxDepth: number,
    maxBufferSize: number,
    canopyDepth?: number,
    headerVersion = 'V1',
): number {
    if (headerVersion != 'V1') {
        throw Error('Unsupported header version');
    }

    // The additional 2 bytes are needed for
    // - the account disciminant  (1 byte)
    // - the header version       (1 byte)
    return (
        2 +
        64 + // concurrentMerkleTreeHeaderDataV1Beet.byteSize (?)
        getConcurrentMerkleTreeDecoderFactory(maxDepth, maxBufferSize).fixedSize +
        (canopyDepth ? getCanopyDecoderFactory(canopyDepth).fixedSize : 0)
    );
}

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

export const getCanopyDecoderFactory = (canopyDepth: number) => {
    const idkwhatthisis = Math.max(((1 << (canopyDepth + 1)) - 2) * 32, 0);
    return getStructDecoder([
        ['canopyBytes', getArrayDecoder(getU8Decoder(), { size: idkwhatthisis })]
    ],
    );
}

export type TreeAuthoritySeeds = {
    /** The address of the merkle tree */
    merkleTree: Address;
};

export async function findTreeAuthorityPda(
    seeds: TreeAuthoritySeeds,
    config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
    const {
        programAddress = 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY' as Address<'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'>,
    } = config;
    return await getProgramDerivedAddress({
        programAddress,
        seeds: [getAddressEncoder().encode(seeds.merkleTree)],
    });
}
