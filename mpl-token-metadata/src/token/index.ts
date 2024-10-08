import {
  Address,
  ProgramDerivedAddress,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_ACCOUNTS_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@tensor-foundation/test-helpers';

export type AtaSeeds = {
  /** The address of the owner of the associated token account */
  owner: Address;
  /** The address of the mint account */
  mint: Address;
  /** The address of the token program */
  tokenProgram?: Address;
};

// Find the associated token account address for a given owner, mint and token program.
export const findAtaPda = async (
  seeds: AtaSeeds
): Promise<ProgramDerivedAddress> => {
  return await getProgramDerivedAddress({
    seeds: [
      getAddressEncoder().encode(seeds.owner),
      getAddressEncoder().encode(seeds.tokenProgram ?? TOKEN_PROGRAM_ID),
      getAddressEncoder().encode(seeds.mint),
    ],
    programAddress: ASSOCIATED_TOKEN_ACCOUNTS_PROGRAM_ID,
  });
};
