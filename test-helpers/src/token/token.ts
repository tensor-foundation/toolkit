import { getCreateAccountInstruction } from '@solana-program/system';
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
  getInitializeAccountInstruction,
  getMintSize,
  getTokenSize,
} from '@solana-program/token';
import {
  address,
  Address,
  appendTransactionMessageInstruction,
  appendTransactionMessageInstructions,
  Base64EncodedDataResponse,
  generateKeyPairSigner,
  KeyPairSigner,
  none,
  pipe,
  TransactionSigner,
} from '@solana/web3.js';
import { ExecutionContext } from 'ava';
import bs58 from 'bs58';
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

export interface TokenNftOwnedByParams {
  t: ExecutionContext;
  client: Client;
  mint: Address;
  owner: Address;
  tokenProgram?: Address;
}

const TOKEN_OWNER_START_INDEX = 32;
const TOKEN_OWNER_END_INDEX = 64;
const TOKEN_AMOUNT_START_INDEX = 64;

export function getTokenAmount(data: Base64EncodedDataResponse): BigInt {
  const buffer = Buffer.from(String(data), 'base64');
  return buffer.readBigUInt64LE(TOKEN_AMOUNT_START_INDEX);
}

export function getTokenOwner(data: Base64EncodedDataResponse): Address {
  const buffer = Buffer.from(String(data), 'base64');
  const base58string = bs58.encode(
    buffer.subarray(TOKEN_OWNER_START_INDEX, TOKEN_OWNER_END_INDEX)
  );
  return address(base58string);
}

// Asserts that a token-based NFT is owned by a specific address by deriving
// the ATA for the owner and checking the amount and owner of the token.
export async function assertTokenNftOwnedBy(params: TokenNftOwnedByParams) {
  const { t, client, mint, owner, tokenProgram = TOKEN_PROGRAM_ID } = params;

  const [ownerAta] = await findAssociatedTokenPda({
    mint,
    owner,
    tokenProgram,
  });
  const ownerAtaAccount = await client.rpc
    .getAccountInfo(ownerAta, { encoding: 'base64' })
    .send();

  const data = ownerAtaAccount!.value!.data;

  const postBuyTokenAmount = getTokenAmount(data);
  const postBuyTokenOwner = getTokenOwner(data);

  t.assert(postBuyTokenAmount === 1n);
  t.assert(postBuyTokenOwner === owner);
}
