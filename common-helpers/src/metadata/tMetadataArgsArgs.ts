import { DAS } from "helius-sdk";
import { TMetadataArgsArgs } from "../shared-types";
import { findMetadataArgs, metadataArgsToTMetadataArgArgs } from "./metadataArgs";

// retrieves tMetadataArgsArgs from DAS assetFields input
export function getTMetadataArgsArgs(assetFields: DAS.GetAssetResponse): TMetadataArgsArgs {
    return metadataArgsToTMetadataArgArgs(findMetadataArgs(assetFields));
} 