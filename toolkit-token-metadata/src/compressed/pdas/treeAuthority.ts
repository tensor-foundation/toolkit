import { Address, ProgramDerivedAddress, address, getAddressEncoder, getProgramDerivedAddress } from "@solana/addresses";

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
    return getProgramDerivedAddress({
        programAddress,
        seeds: [
            getAddressEncoder().encode(seeds.merkleTree),
        ],
    });
};