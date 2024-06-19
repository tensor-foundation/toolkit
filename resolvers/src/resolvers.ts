import { Address, ProgramDerivedAddress, address } from '@solana/web3.js';
import {
  ResolvedAccount,
  TokenStandard,
  expectAddress,
  findAssociatedTokenAccountPda,
  findEditionPda,
  findExtraAccountMetasPda,
  findMetadataPda,
  findNftReceiptPda,
  findTokenRecordPda,
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
          token: expectAddress(accounts.ownerAta?.value),
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
          token: expectAddress(accounts.listAta?.value),
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
          token: expectAddress(accounts.bidAta?.value),
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
          token: expectAddress(accounts.buyerAta?.value),
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
          token: expectAddress(accounts.sellerAta?.value),
        }),
      }
    : { value: null };
};

/* Resolve Token Record from source token account. */
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

/* Resolve Token Record from source associated token account. */
export const resolveSourceAtaTokenRecordFromTokenStandard = async ({
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
          token: expectAddress(accounts.sourceAta?.value),
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
          token: expectAddress(accounts.destinationAta?.value),
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
          token: expectAddress(accounts.poolAta?.value),
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
      { programAddress: address('TAMMqgJYcquwwj2tCdNUerh4C2bJjmghijVziSEf5tA') }
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
