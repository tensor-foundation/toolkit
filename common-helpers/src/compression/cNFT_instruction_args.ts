import { address, Address, getAddressEncoder } from "@solana/addresses";
import type { TMetadataArgsArgs } from "../shared-types";
import { Rpc, SolanaRpcApi } from "@solana/web3.js";
import { getCanopyDepth } from "./merkleTree";
import { getTMetadataArgsArgs } from "../metadata/tMetadataArgsArgs";
import { DAS } from "helius-sdk";
import { getMetaHash } from "../metadata";

export type CNFTTransferArgs = {
    root: Uint8Array;
    merkleTree: Address;
    proof: Address[] | undefined;
    index: number;
    tMetadataArgsArgs: TMetadataArgsArgs;
    canopyDepth: number;
}

export type CNFTInstructionArgs = CNFTTransferArgs & {
    metaHash: Uint8Array;
    creatorShares: Uint8Array;
    creatorVerified: boolean[];
    sellerFeeBasisPoints: number;
    dataHash: Uint8Array;
    creatorHash: Uint8Array;
    creators: Array<[Address, number]> | undefined;
}

export async function getCNFTArgs(rpc: Rpc<SolanaRpcApi>, mint: Address, assetFields: DAS.GetAssetResponse, proofFields: DAS.GetAssetProofResponse): Promise<CNFTInstructionArgs> {
    if (!assetFields.compression) {
        throw new Error(`${mint} is not compressed.`);
    }
    // 1. get metadata related fields
    const metaHash = getMetaHash(assetFields);
    const creatorShares = assetFields.creators ? Uint8Array.from(assetFields.creators.map((c: DAS.Creators) => c.share)) : new Uint8Array();
    const creatorVerified = assetFields.creators ? assetFields.creators.map((c: DAS.Creators) => c.verified) : [];
    const sellerFeeBasisPoints = assetFields.royalty ? assetFields.royalty.basis_points : 0;

    // 2. get dataHash and creatorHash fields
    const dataHash = getAddressEncoder().encode(
        address(assetFields.compression.data_hash),
    );
    const creatorHash = getAddressEncoder().encode(
        address(assetFields.compression.creator_hash),
    );

    // get creators (used as remaining accounts)
    const creators: Array<[Address, number]> | undefined = assetFields.creators?.map((c: DAS.Creators) => [address(c.address), c.share]);

    // 3. get common cNFT transfer fields
    const { root, merkleTree, proof, index, tMetadataArgsArgs, canopyDepth } = await getCNFTTransferArgs(rpc, assetFields, proofFields);
    return {
        metaHash,
        creatorShares,
        creatorVerified,
        sellerFeeBasisPoints,
        dataHash,
        creatorHash,
        creators,
        root,
        merkleTree,
        proof,
        index,
        tMetadataArgsArgs,
        canopyDepth
    };
}

export async function getCNFTTransferArgs(rpc: Rpc<SolanaRpcApi>, assetFields: DAS.GetAssetResponse, proofFields: DAS.GetAssetProofResponse): Promise<CNFTTransferArgs> {
    if (!assetFields.compression) {
        throw new Error(`${assetFields.id} is not compressed.`);
    }
    // 1. get merkleTree related fields
    const merkleTree = address(proofFields.tree_id);
    const proof = proofFields.proof.map((proof: string) => address(proof));
    const root = getAddressEncoder().encode(address(proofFields.root));
    const index = assetFields.compression.leaf_id;

    // 2. construct TMetadataArgsArgs
    const tMetadataArgsArgs: TMetadataArgsArgs | null = getTMetadataArgsArgs(assetFields);
    if (!tMetadataArgsArgs) {
        throw new Error("could not retrieve correct tMetadataArgsArgs");
    }
    // 3. get canopyDepth for shortened proofPath (w/o that most constructed ixs will be too large to fit in a tx)
    const canopyDepth = await getCanopyDepth(rpc, merkleTree);
    return { root, merkleTree, proof, index, tMetadataArgsArgs, canopyDepth };
}
