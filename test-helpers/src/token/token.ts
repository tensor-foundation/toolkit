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
import {
  LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
  TOKEN22_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '../programIds';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';
import {
  getInitializeMetadataPointerInstruction,
  getInitializeTransferHookInstruction,
  METADATA_POINTER_EXTENSION_LENGTH,
  TRANSFER_HOOK_EXTENSION_LENGTH,
} from './extensions';
import {
  getInitializeTokenMetadataInstruction,
  getTokenMetadataArgsEncoder,
  getUpdateFieldInstruction,
  TokenMetadataInstructionArgs,
} from './extensions/tokenMetadata';
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

export interface MetadataMintArgs {
  client: Client;
  payer: TransactionSigner;
  mintAuthority: TransactionSigner;
  freezeAuthority: Address | null;
  decimals?: number;
  tokenProgram?: Address;
  data: TokenMetadataInstructionArgs;
}

export interface T22NftArgs {
  client: Client;
  payer: TransactionSigner;
  owner: Address;
  mintAuthority: TransactionSigner;
  freezeAuthority: Address | null;
  decimals?: number;
  tokenProgram?: Address;
  data: TokenMetadataInstructionArgs;
  royalties: Record<string, string>;
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

export const createMintWithMetadataPointer = async (
  args: MintArgs & Omit<MintArgs, 'tokenProgram'>
): Promise<Address> => {
  const { client, payer, mintAuthority, freezeAuthority, decimals = 0 } = args;
  const tokenProgram = TOKEN22_PROGRAM_ID;

  const space =
    165n + // ACCOUNT_SIZE
    1n + // ACCOUNT_SIZE_TYPE
    BigInt(METADATA_POINTER_EXTENSION_LENGTH) + // METADATA_POINTER_SIZE
    2n + // TYPE_SIZE
    2n; // LENGTH_SIZE

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
    getInitializeMetadataPointerInstruction({
      tokenProgram,
      mint: mint.address,
      metadata: mint.address, // point to self for metadata
    }),
    getInitializeMint2Instruction({
      mint: mint.address,
      mintAuthority,
      freezeAuthority: freezeAuthority ?? none(),
      decimals,
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

export const createMintWithTransferHook = async (
  args: MintArgs & Omit<MintArgs, 'tokenProgram'>
): Promise<Address> => {
  const { client, payer, mintAuthority, freezeAuthority, decimals = 0 } = args;
  const tokenProgram = TOKEN22_PROGRAM_ID;

  const space =
    165n + // ACCOUNT_SIZE
    1n + // ACCOUNT_TYPE_SIZE
    2n + // TYPE_SIZE
    2n + // LENGTH_SIZE
    BigInt(TRANSFER_HOOK_EXTENSION_LENGTH); // TransferHook extension size

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
    getInitializeTransferHookInstruction({
      tokenProgram,
      mint: mint.address,
      programId: LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
    }),
    getInitializeMint2Instruction({
      mint: mint.address,
      mintAuthority,
      freezeAuthority: freezeAuthority ?? none(),
      decimals,
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

export const createMintWithMetadata = async (
  args: MetadataMintArgs
): Promise<Address> => {
  const {
    client,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals = 0,
    data,
  } = args;
  const tokenProgram = TOKEN22_PROGRAM_ID;

  const extensionOverhead = 72n;

  const space =
    165n + // ACCOUNT_SIZE
    1n + // ACCOUNT_SIZE_TYPE
    BigInt(METADATA_POINTER_EXTENSION_LENGTH) + // METADATA_POINTER_SIZE
    2n + // TYPE_SIZE
    2n; // LENGTH_SIZE

  // Token 2022 does the resizing but not lamport transfers for rent.
  const encodedData = getTokenMetadataArgsEncoder().encode(data);
  const rentSpace = space + BigInt(encodedData.length) + extensionOverhead;

  const [transactionMessage, rent, mint] = await Promise.all([
    createDefaultTransaction(client, payer),
    client.rpc.getMinimumBalanceForRentExemption(rentSpace).send(),
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
    getInitializeMetadataPointerInstruction({
      tokenProgram,
      mint: mint.address,
      metadata: mint.address, // point to self for metadata
    }),
    getInitializeMint2Instruction({
      mint: mint.address,
      mintAuthority: mintAuthority.address,
      freezeAuthority: freezeAuthority ?? none(),
      decimals,
      tokenProgram,
    }),
    getInitializeTokenMetadataInstruction({
      mint: mint.address,
      metadata: mint.address,
      mintAuthority,
      updateAuthority: mintAuthority.address,
      data,
    }),
  ];

  const sig = await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  console.log(sig);

  return mint.address;
};

export const createT22Nft = async (
  args: T22NftArgs
): Promise<[Address, Address]> => {
  const {
    client,
    payer,
    owner,
    mintAuthority,
    freezeAuthority,
    decimals = 0,
    data,
    royalties,
  } = args;
  const tokenProgram = TOKEN22_PROGRAM_ID;

  const extensionOverhead = 72n;
  const tokenMetadataRoyaltyFields = 64n;

  const space =
    165n + // ACCOUNT_SIZE
    1n + // ACCOUNT_SIZE_TYPE
    BigInt(METADATA_POINTER_EXTENSION_LENGTH) + // METADATA_POINTER_SIZE
    2n + // TYPE_SIZE
    2n; // LENGTH_SIZE

  // Token 2022 does the resizing but not lamport transfers for rent.
  const encodedData = getTokenMetadataArgsEncoder().encode(data);
  const rentSpace =
    space +
    BigInt(encodedData.length) +
    extensionOverhead +
    tokenMetadataRoyaltyFields;

  const [transactionMessage, rent, mint] = await Promise.all([
    createDefaultTransaction(client, payer),
    client.rpc.getMinimumBalanceForRentExemption(rentSpace).send(),
    generateKeyPairSigner(),
  ]);

  // Setup the mint account with metadata pointer and metadata extension.
  const mintInstructions = [
    getCreateAccountInstruction({
      payer,
      newAccount: mint,
      lamports: rent,
      space,
      programAddress: tokenProgram,
    }),
    getInitializeMetadataPointerInstruction({
      tokenProgram,
      mint: mint.address,
      metadata: mint.address, // point to self for metadata
    }),
    getInitializeMint2Instruction({
      mint: mint.address,
      mintAuthority: mintAuthority.address,
      freezeAuthority: freezeAuthority ?? none(),
      decimals,
      tokenProgram,
    }),
    getInitializeTokenMetadataInstruction({
      mint: mint.address,
      metadata: mint.address,
      mintAuthority,
      updateAuthority: mintAuthority.address,
      data,
    }),
  ];

  const mintSig = await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(mintInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
  console.log(mintSig);

  const [ownerAta] = await findAssociatedTokenPda({
    mint: mint.address,
    owner,
    tokenProgram,
  });

  // Update the fields on the metadata account for Libreplex-style royalties,
  // create the token account for the owner, and mint the NFT to the owner.
  const updateInstructions = [
    getUpdateFieldInstruction({
      metadata: mint.address,
      updateAuthority: mintAuthority,
      data: {
        key: royalties.key,
        value: royalties.value,
      },
    }),
    await getCreateAssociatedTokenInstructionAsync({
      payer,
      owner,
      mint: mint.address,
      tokenProgram,
    }),
    getMintToInstruction({
      mint: mint.address,
      token: ownerAta,
      mintAuthority,
      amount: 1,
      tokenProgram,
    }),
  ];

  const updateSig = await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(updateInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );
  console.log(updateSig);

  return [mint.address, ownerAta];
};
