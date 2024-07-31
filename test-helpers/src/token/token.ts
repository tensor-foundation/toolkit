import { getCreateAccountInstruction } from '@solana-program/system';
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeAccountInstruction,
  getMintSize,
  getTokenSize,
} from '@solana-program/token';
import {
  Address,
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  generateKeyPairSigner,
  KeyPairSigner,
  none,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '../programIds';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';
import { getInitializeMint2Instruction } from './initializeMint';
import { getMintToInstruction } from './mintTo';

export interface TokenArgs {
  client: Client;
  payer: TransactionSigner;
  mint: Address;
  owner: Address;
  tokenProgram?: Address;
}

export interface MintArgs {
  client: Client;
  payer: TransactionSigner;
  mintAuthority: Address;
  freezeAuthority: Address | null;
  decimals?: number;
  tokenProgram?: Address;
}

export const createMint = async (args: MintArgs): Promise<Address> => {
  const {
    client,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals = 0,
    tokenProgram = TOKEN_PROGRAM_ID,
  } = args;

  const space = BigInt(getMintSize());

  const [transactionMessage, rent, mint] = await Promise.all([
    createDefaultTransaction(client, payer),
    client.rpc.getMinimumBalanceForRentExemption(space).send(),
    generateKeyPairSigner(),
  ]);

  const instructions = [
    getCreateAccountInstruction({
      payer,
      newAccount: mint,
      lamports: rent,
      space,
      programAddress: tokenProgram,
    }),
    getInitializeMint2Instruction({
      mint: mint.address,
      mintAuthority,
      decimals,
      freezeAuthority: freezeAuthority ?? none(),
      tokenProgram,
    }),
  ];

  await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return mint.address;
};

export const createToken = async (args: TokenArgs): Promise<Address> => {
  const { client, payer, mint, owner, tokenProgram = TOKEN_PROGRAM_ID } = args;

  const space = BigInt(getTokenSize());

  const [transactionMessage, rent, token] = await Promise.all([
    createDefaultTransaction(client, payer),
    client.rpc.getMinimumBalanceForRentExemption(space).send(),
    generateKeyPairSigner(),
  ]);

  const instructions = [
    getCreateAccountInstruction({
      payer,
      newAccount: token,
      lamports: rent,
      space,
      programAddress: tokenProgram,
    }),
    getInitializeAccountInstruction({ account: token.address, mint, owner }),
  ];

  await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return token.address;
};

export const createAta = async (args: TokenArgs): Promise<Address> => {
  const { client, payer, mint, owner, tokenProgram = TOKEN_PROGRAM_ID } = args;

  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner,
    tokenProgram,
  });

  const ix = await getCreateAssociatedTokenInstructionAsync({
    payer,
    ata: ownerAta,
    owner,
    mint,
    tokenProgram,
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(ix, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return ownerAta;
};

export interface Mint {
  mint: Address;
  decimals: number;
}

export interface CreateAndMintToArgs {
  client: Client;
  mintAuthority: KeyPairSigner;
  payer?: KeyPairSigner;
  recipient?: Address;
  decimals?: number;
  initialSupply?: bigint;
  tokenProgram?: Address;
}

export const createAndMintTo = async (
  args: CreateAndMintToArgs
): Promise<[Mint, Address | null]> => {
  const {
    client,
    mintAuthority,
    recipient = mintAuthority.address,
    payer = mintAuthority,
    decimals = 0,
    initialSupply = 0n,
    tokenProgram = TOKEN_PROGRAM_ID,
  } = args;

  const mint = await createMint({
    client,
    payer,
    mintAuthority: mintAuthority.address,
    freezeAuthority: null,
    decimals,
    tokenProgram,
  });

  let ata = null;

  if (initialSupply > 0n) {
    ata = await createAta({
      client,
      payer,
      mint,
      owner: recipient,
      tokenProgram,
    });

    const mintToIx = getMintToInstruction({
      mint,
      token: ata,
      mintAuthority,
      amount: initialSupply,
      tokenProgram,
    });

    await pipe(
      await createDefaultTransaction(client, payer),
      (tx) => appendTransactionMessageInstruction(mintToIx, tx),
      (tx) => signAndSendTransaction(client, tx)
    );
  }

  return [{ mint, decimals }, ata];
};
