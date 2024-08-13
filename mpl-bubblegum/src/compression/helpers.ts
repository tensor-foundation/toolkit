import {
  Address,
  ProgramDerivedAddress,
  getProgramDerivedAddress,
  getAddressEncoder,
} from '@solana/web3.js';
import {
  getCanopyDecoderFactory,
  getConcurrentMerkleTreeDecoderFactory,
} from '../codecs';

export function getConcurrentMerkleTreeAccountSize(
  maxDepth: number,
  maxBufferSize: number,
  canopyDepth?: number,
  headerVersion = 'V1'
): number {
  if (headerVersion != 'V1') {
    throw Error('Unsupported header version');
  }

  // The additional 2 bytes are needed for
  // - the account disciminant  (1 byte)
  // - the header version       (1 byte)
  return (
    2 +
    54 + // concurrentMerkleTreeHeaderDataV1Beet.byteSize shoule be constant for V1
    getConcurrentMerkleTreeDecoderFactory(maxDepth, maxBufferSize).fixedSize +
    (canopyDepth ? getCanopyDecoderFactory(canopyDepth).fixedSize : 0)
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
