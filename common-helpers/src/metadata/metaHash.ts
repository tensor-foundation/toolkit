import { DAS } from "helius-sdk";
import { computeMetadataArgsHash, findMetadataArgs } from "./metadataArgs";

// retrieves metaHash from DAS assetFields input
export function getMetaHash(assetFields: DAS.GetAssetResponse): Uint8Array {
    return computeMetadataArgsHash(findMetadataArgs(assetFields));
}