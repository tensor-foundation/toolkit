import { Rpc, SolanaRpcApi, Address } from "@solana/web3.js";
import { getConcurrentMerkleTreeDecoderFactory } from "./codecs/merkleTreeDecoderFactories";
import { getConcurrentMerkleTreeHeaderDecoder } from "./codecs/merkleTreeHeaderDecoder";

// https://github.com/solana-labs/solana-program-library/blob/3e35101763097b5b3d21686191132e5d930f5b23/account-compression/sdk/src/accounts/ConcurrentMerkleTreeAccount.ts#L140
// translated from beets to equivalent codecs based decoders
export async function getCanopyDepth(rpc: Rpc<SolanaRpcApi>, merkleTree: Address): Promise<number> {
    const merkleTreeData = await rpc.getAccountInfo(merkleTree, { encoding: 'base64' }).send().then((result: any) => result.value.data[0]);
    const merkleTreeDataBytes = Buffer.from(merkleTreeData, 'base64');
    var currOffset = 0;
    const [merkleTreeHeader, headerOffset] = getConcurrentMerkleTreeHeaderDecoder().read(merkleTreeDataBytes, currOffset);
    currOffset = headerOffset;
    const { maxDepth, maxBufferSize } = merkleTreeHeader.header;
    const [, treeOffset] = getConcurrentMerkleTreeDecoderFactory(maxDepth, maxBufferSize).read(merkleTreeDataBytes, currOffset);
    const canopyDepth = getCanopyDepthFromCanopyByteLength(merkleTreeDataBytes.length - treeOffset);
    return canopyDepth;
}

// https://github.com/solana-labs/solana-program-library/blob/3e35101763097b5b3d21686191132e5d930f5b23/account-compression/sdk/src/accounts/ConcurrentMerkleTreeAccount.ts#L133
function getCanopyDepthFromCanopyByteLength(canopyByteLength: number): number {
    if (canopyByteLength === 0) {
        return 0;
    }
    return Math.log2(canopyByteLength / 32 + 2) - 1;
}
