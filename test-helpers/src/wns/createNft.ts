import { getSetComputeUnitLimitInstruction } from '@solana-program/compute-budget';
import { findAssociatedTokenPda } from '@solana-program/token';
import {
  Address,
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  generateKeyPairSigner,
  IAccountMeta,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import {
  findExtraMetasAccountPda,
  findGroupPda,
  findManagerPda,
  findMemberPda,
  getAddMintToGroupInstruction,
  getAddRoyaltiesInstruction,
  getCreateGroupAccountInstruction,
  getCreateMintAccountInstruction,
  WEN_NEW_STANDARD_PROGRAM_ADDRESS,
} from '@tensor-foundation/wen-new-standard';
import {
  findWnsDistributionPda,
  getInitializeDistributionInstruction,
} from '@tensor-foundation/wen-royalty-distribution';
import { SYSTEM_PROGRAM_ID, TOKEN22_PROGRAM_ID } from '../programIds';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';
import { fromIInstructionToTransactionInstruction } from '../shared';
import {
  findExtraAccountMetaAddress,
  getInitializeExtraMetasAccountInstruction,
  getTransferHookExtraAccounts,
} from '../token';

export interface CreateNftArgs {
  client: Client;
  owner: Address;
  authority: TransactionSigner;
  payer?: TransactionSigner;
  mint?: TransactionSigner;
  group?: Address;
  data?: NftData;
  paymentMint?: Address;
}

export interface NftData {
  name: string;
  symbol: string;
  uri: string;
  royaltyBasisPoints: number;
  creators: Array<{ address: Address; share: number }>;
}

export interface CreateGroupArgs {
  client: Client;
  payer: TransactionSigner;
  authority: TransactionSigner;
  owner: Address;
  mint?: TransactionSigner;
  paymentMint?: Address;
  data?: GroupData;
}

export interface GroupData {
  name: string;
  symbol: string;
  uri: string;
  maxSize: number;
}

const testGroupData: GroupData = {
  name: 'Test WNS Collection',
  symbol: 'TWNS',
  uri: 'https://example.com/wns',
  maxSize: 10,
};

export interface GroupReturn {
  mint: Address;
  group: Address;
  distribution: Address;
}

export async function createGroupWithRoyalties(
  args: CreateGroupArgs
): Promise<GroupReturn> {
  const {
    client,
    payer,
    authority,
    owner,
    mint = await generateKeyPairSigner(), // Collection mint
    paymentMint,
    data = testGroupData,
  } = args;

  const { name, symbol, uri, maxSize } = data;

  const [ownerAta] = await findAssociatedTokenPda({
    owner: owner,
    mint: mint.address,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  const [manager] = await findManagerPda();
  const [group] = await findGroupPda({
    mint: mint.address,
  });
  const [distributionAccount] = await findWnsDistributionPda({
    collection: mint.address,
    paymentMint: paymentMint ?? SYSTEM_PROGRAM_ID,
  });

  const instructions = [
    getSetComputeUnitLimitInstruction({
      units: 250_000,
    }),
    getCreateGroupAccountInstruction({
      payer,
      authority,
      receiver: owner,
      group,
      mint,
      mintTokenAccount: ownerAta,
      manager,
      name,
      symbol,
      uri,
      maxSize,
    }),
    getInitializeDistributionInstruction({
      payer,
      groupMint: mint.address,
      distributionAccount,
      paymentMint: paymentMint ?? SYSTEM_PROGRAM_ID,
    }),
  ];

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return { group, mint: mint.address, distribution: distributionAccount };
}

const testNftData: NftData = {
  name: 'Test WNS',
  symbol: 'TWNS',
  uri: 'https://example.com/wns',
  royaltyBasisPoints: 500,
  creators: [],
};

// Creates a WNS NFT, minting it to the ATA of the owner.
export async function createNft(args: CreateNftArgs): Promise<{
  mint: Address;
  ownerAta: Address;
  extraAccountMetas: IAccountMeta[];
}> {
  const {
    client,
    mint = await generateKeyPairSigner(), // NFT mint, not the collection mint
    authority,
    payer = authority,
    owner,
    group,
    data = {
      ...testNftData,
      creators: [{ address: authority.address, share: 100 }],
    },
  } = args;

  const [manager] = await findManagerPda();

  const [ownerAta] = await findAssociatedTokenPda({
    mint: mint.address,
    owner,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  const [member] = await findMemberPda({
    mint: mint.address,
  });
  const [extraMetasAccount] = await findExtraMetasAccountPda({
    mint: mint.address,
  });

  const instructions = [
    getCreateMintAccountInstruction({
      payer,
      authority,
      receiver: owner,
      mint,
      mintTokenAccount: ownerAta,
      manager,
      name: data.name,
      symbol: data.symbol,
      uri: data.uri,
      permanentDelegate: null,
    }),
    getAddRoyaltiesInstruction({
      payer,
      authority: authority,
      mint: mint.address,
      extraMetasAccount,
      args: {
        royaltyBasisPoints: data.royaltyBasisPoints,
        creators: data.creators,
      },
    }),
  ];

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    group
      ? (tx) =>
          appendTransactionMessageInstruction(
            getAddMintToGroupInstruction({
              payer,
              authority: authority,
              group,
              member,
              mint: mint.address,
              manager,
            }),
            tx
          )
      : (tx) => tx,
    (tx) => signAndSendTransaction(client, tx)
  );

  // Hacky--there's probably a better way to do this.

  const [extraAccountMetasAccount] = await findExtraAccountMetaAddress(
    { mint: mint.address },
    WEN_NEW_STANDARD_PROGRAM_ADDRESS
  );

  const extraAccountMetaList = {
    extraAccounts: [],
  };

  const initializeMetasIx = getInitializeExtraMetasAccountInstruction({
    extraAccountMetasAccount,
    mint: mint.address,
    authority,
    extraAccountMetaList,
  });

  const instruction =
    fromIInstructionToTransactionInstruction(initializeMetasIx);

  // Decode the extra account metas.
  const extraAccountMetas = await getTransferHookExtraAccounts(
    client,
    mint.address,
    instruction,
    WEN_NEW_STANDARD_PROGRAM_ADDRESS,
    'confirmed'
  );

  return { mint: mint.address, ownerAta, extraAccountMetas };
}

export async function createWnsNftInGroup(args: CreateNftArgs) {
  const { client, owner, authority, payer = authority, paymentMint } = args;

  const { group, distribution } = await createGroupWithRoyalties({
    client,
    payer,
    authority,
    owner,
    paymentMint,
  });

  const { mint, ownerAta, extraAccountMetas } = await createNft({
    client,
    owner,
    authority,
    group,
  });

  return { mint, ownerAta, group, distribution, extraAccountMetas };
}
