/* eslint-disable no-extra-semi */
import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  ProgramDerivedAddress,
} from '@solana/web3.js';

export * from './market';

export async function getLogAuthority(): Promise<ProgramDerivedAddress> {
  const programAddress =
    'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY' as Address<'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY'>;

  return await getProgramDerivedAddress({
    programAddress,
    seeds: [getUtf8Encoder().encode('log')],
  });
}

export interface MintVaultSeeds {
  market: Address;
  mint: Address;
}

export async function findMintVaultPda(
  seeds: MintVaultSeeds
): Promise<ProgramDerivedAddress> {
  const programAddress =
    'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY' as Address<'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY'>;

  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('vault'),
      getAddressEncoder().encode(seeds.market),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export interface SeatSeeds {
  market: Address;
  trader: Address;
}

export async function findSeatPda(
  seeds: SeatSeeds
): Promise<ProgramDerivedAddress> {
  const programAddress =
    'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY' as Address<'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY'>;

  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('seat'),
      getAddressEncoder().encode(seeds.market),
      getAddressEncoder().encode(seeds.trader),
    ],
  });
}
