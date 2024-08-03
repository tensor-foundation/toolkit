import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  ProgramDerivedAddress,
} from '@solana/web3.js';

export type DistributionAccountSeeds = {
  collection: Address;
  paymentMint: Address;
};

export function findDistributionAccountPda(
  seeds: DistributionAccountSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay' as Address<'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay'>,
  } = config;
  return getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.collection),
      getAddressEncoder().encode(seeds.paymentMint),
    ],
  });
}
