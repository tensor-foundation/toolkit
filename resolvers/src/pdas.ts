import {
  Address,
  ProgramDerivedAddress,
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getU8Encoder,
  getUtf8Encoder,
} from '@solana/web3.js';

export type AssociatedTokenAccountSeeds = {
  /** The address of the owner account */
  owner: Address;
  /** The address of the mint account */
  mint: Address;
  /** The address of the token program */
  tokenProgram: Address;
};

export async function findAssociatedTokenAccountPda(
  seeds: AssociatedTokenAccountSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.owner),
      getAddressEncoder().encode(seeds.tokenProgram),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type MetadataSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findMetadataPda(
  seeds: MetadataSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programAddress),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type EditionSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findEditionPda(
  seeds: EditionSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programAddress),
      getAddressEncoder().encode(seeds.mint),
      getUtf8Encoder().encode('edition'),
    ],
  });
}

export type TokenRecordSeeds = {
  /** The address of the mint account */
  mint: Address;
  /** The address of the token account */
  token: Address;
};

export async function findTokenRecordPda(
  seeds: TokenRecordSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programAddress),
      getAddressEncoder().encode(seeds.mint),
      getUtf8Encoder().encode('token_record'),
      getAddressEncoder().encode(seeds.token),
    ],
  });
}

// --- WNS PDAs

export type WnsApproveSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findWnsApprovePda(
  seeds: WnsApproveSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM' as Address<'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('approve-account'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type WnsDistributionSeeds = {
  /** The address of the collection account */
  collection: Address;

  /** The address of the payment mint account */
  paymentMint?: Address | null;
};

export async function findWnsDistributionPda(
  seeds: WnsDistributionSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay' as Address<'diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getAddressEncoder().encode(seeds.collection),
      getAddressEncoder().encode(
        seeds.paymentMint ?? address('11111111111111111111111111111111')
      ),
    ],
  });
}

export type ExtraAccountMetasSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findExtraAccountMetasPda(
  seeds: ExtraAccountMetasSeeds,
  config: { programAddress: Address }
): Promise<ProgramDerivedAddress> {
  return await getProgramDerivedAddress({
    programAddress: config.programAddress,
    seeds: [
      getUtf8Encoder().encode('extra-account-metas'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

// --- FEE VAULT PDA

export type FeeVaultSeeds = {
  /** The address of the state account to derive the shard from: e.g. pool, bid, order etc. */
  address: Address;
};

export async function findFeeVaultPda(
  seeds: FeeVaultSeeds
): Promise<ProgramDerivedAddress> {
  // Last byte of state account address is the fee vault shard number.
  const bytes = getAddressEncoder().encode(seeds.address);
  const lastByte = bytes[bytes.length - 1];

  return await getProgramDerivedAddress({
    programAddress: address('TFEEgwDP6nn1s8mMX2tTNPPz8j2VomkphLUmyxKm17A'),
    seeds: [
      getUtf8Encoder().encode('fee_vault'),
      getU8Encoder().encode(lastByte),
    ],
  });
}

export type NftReceiptSeeds = {
  /** The address of the mint account */
  mint: Address;
  /** The address of the state account */
  state: Address;
};

export async function findNftReceiptPda(
  seeds: NftReceiptSeeds,
  config: { programAddress: Address }
): Promise<ProgramDerivedAddress> {
  return await getProgramDerivedAddress({
    programAddress: config.programAddress,
    seeds: [
      getUtf8Encoder().encode('nft_receipt'),
      getAddressEncoder().encode(seeds.mint),
      getAddressEncoder().encode(seeds.state),
    ],
  });
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

export type TswapNftEscrowSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findTswapNftEscrowPda(
  seeds: TswapNftEscrowSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN' as Address<'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('nft_escrow'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type TswapNftDepositReceiptSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findTswapNftDepositReceiptPda(
  seeds: TswapNftDepositReceiptSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN' as Address<'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('nft_receipt'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export type TswapSolEscrowSeeds = {
  /** The address of the pool account */
  pool: Address;
};

export async function findTswapSolEscrowPda(
  seeds: TswapSolEscrowSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN' as Address<'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('sol_escrow'),
      getAddressEncoder().encode(seeds.pool),
    ],
  });
}

export type TswapSingleListingSeeds = {
  /** The address of the mint account */
  mint: Address;
};

export async function findTswapSingleListingPda(
  seeds: TswapSingleListingSeeds,
  config: { programAddress?: Address | undefined } = {}
): Promise<ProgramDerivedAddress> {
  const {
    programAddress = 'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN' as Address<'TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN'>,
  } = config;
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('single_listing'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}
