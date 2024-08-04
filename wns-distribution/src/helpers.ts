import {
  address,
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  ProgramDerivedAddress,
} from '@solana/web3.js';

export type WnsDistributionSeeds = {
  /** The address of the collection account */
  collection: Address;

  /** The address of the payment mint account */
  paymentMint?: Address | null;
};

export function findWnsDistributionPda(
  seeds: WnsDistributionSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay' as Address<'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay'>,
  } = config;
  return getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.collection),
      getAddressEncoder().encode(
        seeds.paymentMint ?? address('11111111111111111111111111111111')
      ),
    ],
  });
}
