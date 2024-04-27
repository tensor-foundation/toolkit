import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/addresses';
import { getStringEncoder, getU8Encoder } from '@solana/codecs';
import { TFEES_PROGRAM_ID } from './programIds';

export const findFeeVaultPda = async (stateAccout: Address) => {
  const shard = getAddressEncoder().encode(stateAccout)[31];
  return await getProgramDerivedAddress({
    seeds: [
      getStringEncoder().encode('fee_vault'),
      getU8Encoder().encode(shard),
    ],
    programAddress: TFEES_PROGRAM_ID,
  });
};
