import { keccak_256 } from 'js-sha3';
import { Creator, MetadataArgs, getMetadataArgsEncoder } from '../generated';
import {
  Address,
  getU16Encoder,
  getAddressEncoder,
  getU64Encoder,
} from '@solana/web3.js';

export function computeCompressedNFTHash(
  assetId: Address,
  owner: Address,
  delegate: Address,
  treeNonce: bigint,
  metadata: MetadataArgs
): Buffer {
  const message = Buffer.concat([
    Buffer.from([0x1]), // All NFTs are version 1 right now
    new Uint8Array(getAddressEncoder().encode(assetId)),
    new Uint8Array(getAddressEncoder().encode(owner)),
    new Uint8Array(getAddressEncoder().encode(delegate)),
    new Uint8Array(getU64Encoder().encode(treeNonce)),
    computeDataHash(
      metadata,
      new Uint8Array(getU16Encoder().encode(metadata.sellerFeeBasisPoints))
    ),
    computeCreatorHash(metadata.creators),
  ]);

  return Buffer.from(keccak_256.digest(message));
}
export const computeDataHash = (
  metadataArgs: MetadataArgs,
  sellerFeeBasisPointsBuffer: Uint8Array
) =>
  Buffer.from(
    keccak_256.digest(
      Buffer.concat([
        computeMetadataArgsHash(metadataArgs),
        sellerFeeBasisPointsBuffer,
      ])
    )
  );

export function computeMetadataArgsHash(metadataArgs: MetadataArgs) {
  const serializedMetadataArgs = getMetadataArgsEncoder().encode(metadataArgs);
  return Buffer.from(keccak_256.digest(serializedMetadataArgs));
}

export function computeCreatorHash(creators: Creator[]) {
  const bufferOfCreatorData = Buffer.concat(
    creators.map((creator) => {
      return Buffer.concat([
        new Uint8Array(getAddressEncoder().encode(creator.address)),
        Buffer.from([creator.verified ? 1 : 0]),
        Buffer.from([creator.share]),
      ]);
    })
  );
  return Buffer.from(keccak_256.digest(bufferOfCreatorData));
}
