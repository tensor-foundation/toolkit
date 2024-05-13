import {
    getAddressDecoder,
} from "@solana/addresses";
import {
    getTCollectionDecoder,
    getTUsesDecoder,
} from "../../shared-types";
import {
    getStructDecoder,
    getUtf8Decoder,
} from "@solana/codecs";
import {
    getU8Decoder,
    getU16Decoder,
    getU32Decoder,
    getU64Decoder,
} from "@solana/codecs-numbers";
import {
    getBooleanDecoder,
    getArrayDecoder,
    getScalarEnumDecoder,
    getDataEnumDecoder,
    getNullableDecoder,
} from "@solana/codecs-data-structures";
import { addDecoderSizePrefix } from "../../internal_helpers";

enum TTokenStandardWithProgrammable {
    NonFungible,
    FungibleAsset,
    Fungible,
    NonFungibleEdition,
    ProgrammableNonFungible,
}

enum Key {
    Uninitialized,
    EditionV1,
    MasterEditionV1,
    ReservationListV1,
    MetadataV1,
    ReservationListV2,
    MasterEditionV2,
    EditionMarker,
    UseAuthorityRecord,
    CollectionAuthorityRecord,
    TokenOwnedEscrow,
    TokenRecord,
    MetadataDelegate,
    EditionMarkerV2,
}

export function getMetadataDecoder() {
    return getStructDecoder([
        ['key', getScalarEnumDecoder(Key)],
        ['updateAuthority', getAddressDecoder()],
        ['mint', getAddressDecoder()],
        ['data', getMetadataDataDecoder()],
        ['primarySaleHappened', getBooleanDecoder()],
        ['isMutable', getBooleanDecoder()],
        ['editionNonce', getNullableDecoder(getU8Decoder())],
        ['tokenStandard', getNullableDecoder(getScalarEnumDecoder(TTokenStandardWithProgrammable))],
        ['collection', getNullableDecoder(getTCollectionDecoder())],
        ['uses', getNullableDecoder(getTUsesDecoder())],
        ['collectionDetails', getNullableDecoder(getCollectionDetailsDecoder())],
        ['programmableConfig', getNullableDecoder(getProgrammableConfigDecoder())],
    ]);
}

function getCollectionDetailsDecoder() {
    return getDataEnumDecoder([
        ['V1', getU64Decoder()]
    ]);
}

function getProgrammableConfigDecoder() {
    return getDataEnumDecoder([
        ['V1', getProgrammableConfigRecordDecoder()]
    ]);
}

function getProgrammableConfigRecordDecoder() {
    return getStructDecoder([
        ['ruleSet', getNullableDecoder(getAddressDecoder())]
    ])
}

function getMetadataDataDecoder() {
    return getStructDecoder([
        ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
        ['sellerFeeBasisPoints', getU16Decoder()],
        ['creators', getNullableDecoder(getArrayDecoder(getTCreatorDecoder()))]
    ]);
}

function getTCreatorDecoder() {
    return getStructDecoder([
        ['address', getAddressDecoder()],
        ['verified', getBooleanDecoder()],
        ['share', getU8Decoder()],
    ]);
}