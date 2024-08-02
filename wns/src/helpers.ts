/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { findAssociatedTokenPda } from '@solana-program/token';
import {
  Address,
  appendTransactionMessageInstructions,
  generateKeyPairSigner,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
  TOKEN22_PROGRAM_ID,
} from '@tensor-foundation/test-helpers';
import {
  findExtraMetasAccountPda,
  findGroupPda,
  findManagerPda,
  getAddRoyaltiesInstruction,
  getCreateGroupAccountInstruction,
  getCreateMintAccountInstruction,
} from './generated';

export interface CreateNftArgs {
  client: Client;
  payer?: TransactionSigner;
  mint?: TransactionSigner;
  authority: TransactionSigner;
  owner: Address;
  data?: NftData;
}

export interface NftData {
  name: string;
  symbol: string;
  uri: string;
  royaltyBasisPoints: number;
  creators: Array<{ address: Address; share: number }>;
}

const testNftData: NftData = {
  name: 'Test WNS',
  symbol: 'TWNS',
  uri: 'https://example.com/wns',
  royaltyBasisPoints: 500,
  creators: [],
};

export interface CreateGroupArgs {
  client: Client;
  payer: TransactionSigner;
  authority: TransactionSigner;
  owner: Address;
  mint?: TransactionSigner;
  data: GroupData;
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

// eslint-disable-next-line @typescript-eslint/require-await
export async function createGroupWithRoyalties(
  args: CreateGroupArgs
): Promise<void> {
  const {
    client,
    payer,
    authority,
    owner,
    mint = await generateKeyPairSigner(),
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

  const instructions = [
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
    getAddDistribut,
  ];
}

// Creates a WNS NFT, minting it to the ATA of the owner.
export async function createNft(
  args: CreateNftArgs
): Promise<{ mint: Address; ownerAta: Address }> {
  const {
    client,
    mint = await generateKeyPairSigner(),
    authority,
    payer = authority,
    owner,
    data = {
      ...testNftData,
      creators: [{ address: authority.address, share: 100 }],
    },
  } = args;

  const [ownerAta] = await findAssociatedTokenPda({
    owner: owner,
    mint: mint.address,
    tokenProgram: TOKEN22_PROGRAM_ID,
  });

  const [manager] = await findManagerPda();

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
      authority,
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
    (tx) => signAndSendTransaction(client, tx)
  );

  return { mint: mint.address, ownerAta };
}
