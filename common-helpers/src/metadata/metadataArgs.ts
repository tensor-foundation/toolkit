/* eslint @typescript-eslint/no-unused-vars: "off" */
import { address, getAddressEncoder } from '@solana/web3.js';
import BN from 'bn.js';
import { DAS } from 'helius-sdk';
import { keccak_256 } from 'js-sha3';
import {
  TCollection,
  TMetadataArgsArgs,
  TTokenProgramVersion,
  TTokenStandard,
  TUseMethod,
  TUses,
} from '../shared-types';
import {
  MetadataArgs,
  TCreator,
  getMetadataArgsEncoder,
} from './codecs/metadataArgsEncoder';

// metadataArgs shouldn't get exported since they
// are only used as intermediate to hash

// constructs metadataArgs by comparing its hash against the given datahash
export function findMetadataArgs(
  assetFields: DAS.GetAssetResponse
): MetadataArgs {
  if (!assetFields.compression) {
    throw new Error(`${assetFields.id} is not compressed.`);
  }
  const sellerFeeBasisPointsBuffer = assetFields.royalty
    ? new BN(assetFields.royalty.basis_points).toBuffer('le', 2)
    : Buffer.from([0]);
  const dataHashBuffer = new Uint8Array(
    getAddressEncoder().encode(address(assetFields.compression.data_hash))
  );
  const metadataArgs = convertAssetFieldsToMetadataArgs(assetFields);
  const originalMetadata = { ...metadataArgs };

  // hash function on top of candidate metaHash to compare against dataHash
  const makeDataHash = (metadataArgs: MetadataArgs) =>
    Buffer.from(
      keccak_256.digest(
        Buffer.concat([
          computeMetadataArgsHash(metadataArgs),
          sellerFeeBasisPointsBuffer,
        ])
      )
    );

  // try original metadataArgs
  let hash = makeDataHash(metadataArgs);
  if (hash.equals(dataHashBuffer)) {
    return metadataArgs;
  }

  // try tokenStandard = null
  metadataArgs.tokenStandard = null;
  hash = makeDataHash(metadataArgs);
  if (hash.equals(dataHashBuffer)) {
    return metadataArgs;
  }

  // try name + uri = "", tokenStandard = null
  metadataArgs.name = '';
  metadataArgs.uri = '';
  hash = makeDataHash(metadataArgs);
  if (hash.equals(dataHashBuffer)) {
    return metadataArgs;
  }

  // try name + uri = "", tokenStandard = 0
  metadataArgs.tokenStandard = 0;
  hash = makeDataHash(metadataArgs);
  if (hash.equals(dataHashBuffer)) {
    return metadataArgs;
  }

  // try reversing creators
  metadataArgs.creators.reverse();
  metadataArgs.name = originalMetadata.name;
  metadataArgs.uri = originalMetadata.uri;
  metadataArgs.tokenStandard = originalMetadata.tokenStandard;
  hash = makeDataHash(metadataArgs);
  if (hash.equals(dataHashBuffer)) {
    return metadataArgs;
  }

  // can't match - throw error
  throw new Error("Couldn't find a matching configuration of metadataArgs.");
}

// converts assetFields (retrieved from DAS) to metadataArgs
function convertAssetFieldsToMetadataArgs(
  assetFields: DAS.GetAssetResponse
): MetadataArgs {
  const {
    compression,
    content,
    royalty,
    creators,
    uses,
    grouping,
    supply,
    ownership: { owner, delegate },
    mutable,
  } = assetFields;
  const coll = grouping
    ? grouping.find((group: DAS.Grouping) => group.group_key === 'collection')
        ?.group_value
    : '';
  const tokenStandard = content ? content.metadata.token_standard : '';

  return {
    name: content?.metadata?.name ?? '',
    symbol: content?.metadata?.symbol ?? ' ',
    uri: content?.json_uri ?? '',
    sellerFeeBasisPoints: royalty?.basis_points ?? 0,
    creators: creators ?? [],
    primarySaleHappened: royalty?.primary_sale_happened ?? false,
    isMutable: mutable,
    editionNonce: supply?.edition_nonce != null ? supply!.edition_nonce : null,
    tokenStandard:
      tokenStandard === 'Fungible'
        ? TTokenStandard.Fungible
        : tokenStandard === 'NonFungibleEdition'
          ? TTokenStandard.NonFungibleEdition
          : tokenStandard === 'FungibleAsset'
            ? TTokenStandard.FungibleAsset
            : tokenStandard === 'NonFungible'
              ? TTokenStandard.NonFungible
              : null,
    collection: coll ? ({ key: coll, verified: true } as TCollection) : null,
    uses: uses
      ? ({
          useMethod:
            uses.use_method === 'Burn'
              ? TUseMethod.Burn
              : uses.use_method === 'Multiple'
                ? 1
                : TUseMethod.Single,
          remaining: BigInt(uses.remaining),
          total: BigInt(uses.total),
        } as TUses)
      : null,
    // currently always Original for cNFTs
    //TODO: check if retrievable from assetFields
    tokenProgramVersion: TTokenProgramVersion.Original,
  };
}

// hashes metadataArgs to metaHash
export function computeMetadataArgsHash(metadataArgs: MetadataArgs) {
  const serializedMetadataArgs = getMetadataArgsEncoder().encode(metadataArgs);
  return Buffer.from(keccak_256.digest(serializedMetadataArgs));
}

// converts between metadataArgs and TMetadataArgsArgs
export function metadataArgsToTMetadataArgsArgs(
  metadataArgs: MetadataArgs
): TMetadataArgsArgs {
  const tMetadataArgsArgs: TMetadataArgsArgs = {
    name: metadataArgs.name,
    symbol: metadataArgs.symbol,
    uri: metadataArgs.uri,
    sellerFeeBasisPoints: metadataArgs.sellerFeeBasisPoints,
    primarySaleHappened: metadataArgs.primarySaleHappened,
    isMutable: metadataArgs.isMutable,
    editionNonce: metadataArgs.editionNonce,
    tokenStandard: metadataArgs.tokenStandard,
    collection: metadataArgs.collection,
    uses: metadataArgs.uses,
    tokenProgramVersion: metadataArgs.tokenProgramVersion,
    creatorShares: Buffer.from(
      metadataArgs.creators.map((creator: TCreator) => creator.share)
    ),
    creatorVerified: metadataArgs.creators.map(
      (creator: TCreator) => creator.verified
    ),
  };
  return tMetadataArgsArgs;
}
