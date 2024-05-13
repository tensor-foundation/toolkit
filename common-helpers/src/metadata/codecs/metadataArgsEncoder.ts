
import {
    getTTokenStandardEncoder,
    getTCollectionEncoder,
    getTUsesEncoder,
    getTTokenProgramVersionEncoder,
    TTokenProgramVersionArgs,
    TUsesArgs,
    TCollectionArgs,
    TTokenStandardArgs,
} from "../../shared-types";
import {
    Encoder,
    getStructEncoder,
    getUtf8Encoder
} from "@solana/codecs";
import {
    getU8Encoder,
    getU16Encoder,
    getU32Encoder,
} from "@solana/codecs-numbers";
import {
    getBooleanEncoder,
    getNullableEncoder,
    getArrayEncoder,
} from "@solana/codecs-data-structures";
import { getBase58Encoder } from "@solana/codecs-strings";
import { addEncoderSizePrefix } from "../../internal_helpers";

export type TCreator = {
    address: string,
    verified: boolean,
    share: number
}
export type MetadataArgs = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    primarySaleHappened: boolean;
    isMutable: boolean;
    /** nonce for easy calculation of editions, if present */
    editionNonce: number | null;
    /** Since we cannot easily change Metadata, we add the new DataV2 fields here at the end. */
    tokenStandard: TTokenStandardArgs | null;
    /** Collection */
    collection: TCollectionArgs | null;
    /** Uses */
    uses: TUsesArgs | null;
    tokenProgramVersion: TTokenProgramVersionArgs;
    creators: TCreator[];
}

export function getMetadataArgsEncoder(): Encoder<MetadataArgs> {
    return getStructEncoder([
        // adds 4 bytes (U32 equiv) offset containing size before each variable sized utf8 string (name, symbol, uri)
        ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
        ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
        ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
        ['sellerFeeBasisPoints', getU16Encoder()],
        ['primarySaleHappened', getBooleanEncoder()],
        ['isMutable', getBooleanEncoder()],
        ['editionNonce', getNullableEncoder(getU8Encoder())],
        ['tokenStandard', getNullableEncoder(getTTokenStandardEncoder())],
        ['collection', getNullableEncoder(getTCollectionEncoder())],
        ['uses', getNullableEncoder(getTUsesEncoder())],
        ['tokenProgramVersion', getTTokenProgramVersionEncoder()],
        ['creators', getArrayEncoder(getTCreatorEncoder())],
    ]);
}

function getTCreatorEncoder(): Encoder<TCreator> {
    return getStructEncoder([
        ['address', getBase58Encoder()],
        ['verified', getBooleanEncoder()],
        ['share', getU8Encoder()],
    ]);
}