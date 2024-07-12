import { getCreateAccountInstruction } from '@solana-program/system';
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeAccountInstruction,
  getInitializeMintInstruction,
  getMintSize,
  getMintToInstruction,
  getTokenSize,
} from '@solana-program/token';
import {
  Address,
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  generateKeyPairSigner,
  KeyPairSigner,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '../programIds';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';

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
  decimals?: number;
  tokenProgram?: Address;
}

export const createMint = async (args: MintArgs): Promise<Address> => {
  const {
    client,
    payer,
    mintAuthority,
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
    getInitializeMintInstruction({
      mint: mint.address,
      decimals,
      mintAuthority,
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
    owner,
    tokenProgram,
    mint,
  });

  const ix = await getCreateAssociatedTokenInstructionAsync({
    payer,
    ata: ownerAta,
    owner,
    mint,
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
): Promise<Mint> => {
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
    decimals,
    tokenProgram,
  });

  if (initialSupply > 0n) {
    const ata = await createAta({ client, payer, mint, owner: recipient });

    const mintToIx = getMintToInstruction({
      mint,
      token: ata,
      mintAuthority,
      amount: initialSupply,
    });

    await pipe(
      await createDefaultTransaction(client, payer),
      (tx) => appendTransactionMessageInstruction(mintToIx, tx),
      (tx) => signAndSendTransaction(client, tx)
    );
  }

  return { mint, decimals };
};
