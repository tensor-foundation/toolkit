import { Address, ProgramDerivedAddress, address } from '@solana/web3.js';
import {
  ResolvedAccount,
  TokenStandard,
  expectAddress,
  findAssociatedTokenAccountPda,
  findEditionPda,
  findExtraAccountMetasPda,
  findFeeVaultPda,
  findMetadataPda,
  findNftReceiptPda,
  findTokenRecordPda,
  findTreeAuthorityPda,
  findTswapNftDepositReceiptPda,
  findTswapNftEscrowPda,
  findTswapSingleListingPda,
  findTswapSolEscrowPda,
  findWnsApprovePda,
  findWnsDistributionPda,
} from './index';

export const resolveMetadata = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findMetadataPda({
      mint: expectAddress(accounts.mint?.value),
    }),
  };
};

export const resolveEditionFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  switch (args.tokenStandard) {
    case TokenStandard.NonFungible:
    case TokenStandard.NonFungibleEdition:
    case TokenStandard.ProgrammableNonFungible:
    case TokenStandard.ProgrammableNonFungibleEdition:
      return {
        value: await findEditionPda({
          mint: expectAddress(accounts.mint?.value),
        }),
      };
    default:
      return { value: null };
  }
};

export const resolveOwnerTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.ownerTa?.value),
        }),
      }
    : { value: null };
};

export const resolveTakerTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.takerTa?.value),
        }),
      }
    : { value: null };
};

export const resolveListTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.listTa?.value),
        }),
      }
    : { value: null };
};

export const resolveBidTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.bidTa?.value),
        }),
      }
    : { value: null };
};

export const resolveBuyerTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.buyerTa?.value),
        }),
      }
    : { value: null };
};

export const resolveSellerTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.sellerTa?.value),
        }),
      }
    : { value: null };
};

export const resolveSourceTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.sourceTa?.value),
        }),
      }
    : { value: null };
};

export const resolveDestinationTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.destinationTa?.value),
        }),
      }
    : { value: null };
};

export const resolvePoolTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.poolTa?.value),
        }),
      }
    : { value: null };
};

export const resolveTokenMetadataProgramFromTokenStandard = ({
  args,
}: {
  args: { tokenStandard?: TokenStandard | undefined };
}): Partial<{ value: Address<string> | null }> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value:
          'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>,
      }
    : { value: null };
};

export const resolveAuthorizationRulesProgramFromTokenStandard = ({
  args,
}: {
  args: { tokenStandard?: TokenStandard | undefined };
}): Partial<{ value: Address<string> | null }> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value:
          'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg' as Address<'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'>,
      }
    : { value: null };
};

export const resolveSysvarInstructionsFromTokenStandard = ({
  args,
}: {
  args: { tokenStandard?: TokenStandard | undefined };
}): Partial<{ value: Address<string> | null }> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value:
          'Sysvar1nstructions1111111111111111111111111' as Address<'Sysvar1nstructions1111111111111111111111111'>,
      }
    : { value: null };
};

export const resolveListAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.listState?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveBidAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.bidState?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveOwnerAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.owner?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveBuyerAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.buyer?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveSellerAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.seller?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveTakerAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.taker?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveSourceAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.source?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveDestinationAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.destination?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolvePoolAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.pool?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveOwnerCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.owner?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolveFeeVaultCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.feeVault?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolvePayerCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.payer?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolveDistributionCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.distribution?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolveMakerBrokerCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  if (!accounts.makerBroker.value) {
    return { value: null };
  }
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.makerBroker?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolveTakerBrokerCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  if (!accounts.takerBroker.value) {
    return { value: null };
  }
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.takerBroker?.value),
      mint: expectAddress(accounts.currency?.value),
      tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
    }),
  };
};

export const resolvePoolNftReceipt = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findNftReceiptPda(
      {
        mint: expectAddress(accounts.mint?.value),
        state: expectAddress(accounts.pool?.value),
      },
      { programAddress: address('TAMM6ub33ij1mbetoMyVBLeKY5iP41i4UPUJQGkhfsg') }
    ),
  };
};

export const resolveOrderNftReceipt = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findNftReceiptPda(
      {
        mint: expectAddress(accounts.mint?.value),
        state: expectAddress(accounts.orderState?.value),
      },
      { programAddress: address('TLoCKic2wGJm7VhZKumih4Lc35fUhYqVMgA4j389Buk') }
    ),
  };
};

export const resolveWnsApprovePda = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findWnsApprovePda({
      mint: expectAddress(accounts.mint?.value),
    }),
  };
};

export const resolveWnsDistributionPda = async ({
  args,
}: {
  args: { collection: Address; paymentMint?: Address | null };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findWnsDistributionPda({
      collection: expectAddress(args.collection),
      paymentMint: args.paymentMint,
    }),
  };
};

export const resolveWnsExtraAccountMetasPda = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findExtraAccountMetasPda(
      {
        mint: expectAddress(accounts.mint?.value),
      },
      { programAddress: expectAddress(accounts.wnsProgram?.value) }
    ),
  };
};

export const resolveTreeAuthorityPda = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findTreeAuthorityPda(
      {
        merkleTree: expectAddress(accounts.merkleTree?.value),
      },
      { programAddress: expectAddress(accounts.bubblegumProgram?.value) }
    ),
  };
};

export const resolveOrderAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findAssociatedTokenAccountPda({
      owner: expectAddress(accounts.orderVault?.value),
      mint: expectAddress(accounts.mint?.value),
      tokenProgram: expectAddress(accounts.tokenProgram?.value),
    }),
  };
};

export const resolveOrderTokenRecordFromTokenStandard = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { tokenStandard?: TokenStandard | undefined };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return args.tokenStandard === TokenStandard.ProgrammableNonFungible ||
    args.tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
    ? {
        value: await findTokenRecordPda({
          mint: expectAddress(accounts.mint?.value),
          token: expectAddress(accounts.orderVaultTa?.value),
        }),
      }
    : { value: null };
};

export const resolveTswapNftEscrowPda = async ({
  args,
}: {
  args: { mint: Address };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findTswapNftEscrowPda({
      mint: expectAddress(args.mint),
    }),
  };
};

export const resolveTswapNftDepositReceiptPda = async ({
  args,
}: {
  args: { mint: Address };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findTswapNftDepositReceiptPda({
      mint: expectAddress(args.mint),
    }),
  };
};

export const resolveTswapSolEscrowPda = async ({
  args,
}: {
  args: { pool: Address };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findTswapSolEscrowPda({
      pool: expectAddress(args.pool),
    }),
  };
};

export const resolveTswapSingleListingPda = async ({
  args,
}: {
  args: { mint: Address };
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findTswapSingleListingPda({
      mint: expectAddress(args.mint),
    }),
  };
};

export const resolveEscrowProgramFromSharedEscrow = ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Partial<{ value: Address<string> | null }> => {
  return accounts.sharedEscrow?.value
    ? {
        value: address('TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN'),
      }
    : { value: null };
};

export const resolveBrokersCurrencyAta = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Address[]> => {
  const brokers = [accounts.makerBroker, accounts.takerBroker].filter(
    (broker) => broker.value
  );
  if (brokers.length === 0) {
    return [];
  }
  return await Promise.all(
    brokers.map(
      async (broker) =>
        (
          await findAssociatedTokenAccountPda({
            owner: expectAddress(broker.value),
            mint: expectAddress(accounts.currency?.value),
            tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
          })
        )[0]
    )
  );
};

export const resolveCreatorsCurrencyAta = async ({
  accounts,
  args,
}: {
  accounts: Record<string, ResolvedAccount>;
  args: { creators: Array<Address> };
}): Promise<Address[]> => {
  return await Promise.all(
    args.creators.map(
      async (creator) =>
        (
          await findAssociatedTokenAccountPda({
            owner: expectAddress(creator),
            mint: expectAddress(accounts.currency?.value),
            tokenProgram: expectAddress(accounts.currencyTokenProgram?.value),
          })
        )[0]
    )
  );
};

export const resolveFeeVaultPdaFromListState = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findFeeVaultPda({
      address: expectAddress(accounts.listState?.value),
    }),
  };
};

export const resolveFeeVaultPdaFromBidState = async ({
  accounts,
}: {
  accounts: Record<string, ResolvedAccount>;
}): Promise<Partial<{ value: ProgramDerivedAddress | null }>> => {
  return {
    value: await findFeeVaultPda({
      address: expectAddress(accounts.bidState?.value),
    }),
  };
};
