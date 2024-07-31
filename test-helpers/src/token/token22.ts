/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCreateAccountInstruction } from '@solana-program/system';
import {
  AuthorityType,
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
} from '@solana-program/token';
import {
  AccountRole,
  Address,
  appendTransactionMessageInstructions,
  Commitment,
  Decoder,
  fixDecoderSize,
  generateKeyPairSigner,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getBooleanDecoder,
  getBytesDecoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getU32Decoder,
  getU8Decoder,
  getUtf8Encoder,
  IAccountMeta,
  none,
  pipe,
  ProgramDerivedAddress,
  ReadonlyUint8Array,
  TransactionSigner,
} from '@solana/web3.js';
import {
  LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
  TOKEN22_PROGRAM_ID,
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
import { unpackSeeds } from './seeds';
import { getSetAuthorityInstruction } from './setAuthorityT22';
import { MintArgs } from './token';

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

export const createMintWithMetadataPointer = async (
  args: Omit<MintArgs, 'tokenProgram'>
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
  args: Omit<MintArgs, 'tokenProgram'>
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

  await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(instructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return mint.address;
};

// Create T22 NFT but w/o transfer hook, for testing.
export const createT22Nft = async (
  args: Omit<T22NftArgs, 'royalties'>
): Promise<[Address, Address]> => {
  const {
    client,
    payer,
    owner,
    mintAuthority,
    freezeAuthority,
    decimals = 0,
    data,
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

  await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(mintInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  const [ownerAta] = await findAssociatedTokenPda({
    mint: mint.address,
    owner,
    tokenProgram,
  });

  // Update the fields on the metadata account for Libreplex-style royalties,
  // create the token account for the owner, and mint the NFT to the owner.
  // Finally, set the mint authority to null.
  const updateInstructions = [
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
    getSetAuthorityInstruction({
      owned: mint.address,
      owner: mintAuthority,
      authorityType: AuthorityType.MintTokens,
      newAuthority: none(),
    }),
  ];

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(updateInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return [mint.address, ownerAta];
};

export const createT22NftWithRoyalties = async (
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
    BigInt(TRANSFER_HOOK_EXTENSION_LENGTH) + // TRANSFER_HOOK_SIZE
    BigInt(METADATA_POINTER_EXTENSION_LENGTH) + // METADATA_POINTER_SIZE
    2n * 2n + // TYPE_SIZE
    2n * 2n; // LENGTH_SIZE

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
    getInitializeTransferHookInstruction({
      tokenProgram,
      mint: mint.address,
      programId: LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
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

  await pipe(
    transactionMessage,
    (tx) => appendTransactionMessageInstructions(mintInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  const [ownerAta] = await findAssociatedTokenPda({
    mint: mint.address,
    owner,
    tokenProgram,
  });

  // Update the fields on the metadata account for Libreplex-style royalties,
  // create the token account for the owner, and mint the NFT to the owner.
  // Finally, set the mint authority to null.
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
    getSetAuthorityInstruction({
      owned: mint.address,
      owner: mintAuthority,
      authorityType: AuthorityType.MintTokens,
      newAuthority: none(),
    }),
  ];

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstructions(updateInstructions, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return [mint.address, ownerAta];
};

interface TransactionInstruction {
  data: Buffer;
  keys: IAccountMeta[];
  programId: Address;
}

export async function getTransferHookExtraAccounts(
  client: Client,
  mint: Address,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instruction: TransactionInstruction,
  tansferHookProgramId: Address,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  commitment?: Commitment
) {
  const [address] = await getExtraAccountMetaAddress(
    { mint },
    tansferHookProgramId
  );
  const account = (
    await client.rpc
      .getAccountInfo(address, { commitment, encoding: 'base64' })
      .send()
  ).value;

  // Start with transfer hook program ID....
  const extraMetas: IAccountMeta[] = [
    {
      address: tansferHookProgramId,
      role: AccountRole.READONLY,
    },
  ];

  // if we don't have the account, no extra accounts to add
  if (account == null) {
    return extraMetas;
  }

  const data = Buffer.from(account.data[0], 'base64');

  // ...otherwise get the additional accounts and add them
  for (const extraAccountMeta of getExtraAccountMetas(data)) {
    extraMetas.push(
      await resolveExtraAccountMeta(
        client,
        extraAccountMeta,
        instruction.keys,
        instruction.data,
        instruction.programId
      )
    );
  }

  // add the extra account meta
  extraMetas.push({
    address,
    role: AccountRole.READONLY,
  });

  return extraMetas;
}

export interface ExtraAccountMetaSeeds {
  mint: Address;
}

export async function getExtraAccountMetaAddress(
  seeds: ExtraAccountMetaSeeds,
  programAddress: Address
): Promise<ProgramDerivedAddress> {
  return await getProgramDerivedAddress({
    programAddress,
    seeds: [
      getUtf8Encoder().encode('extra-account-metas'),
      getAddressEncoder().encode(seeds.mint),
    ],
  });
}

export interface ExtraAccountMeta {
  discriminator: number;
  addressConfig: Address;
  isSigner: boolean;
  isWritable: boolean;
}

export interface ExtraAccountMetaList {
  count: number;
  extraAccounts: ExtraAccountMeta[];
}

export interface ExtraAccountMetaAccountData {
  instructionDiscriminator: ReadonlyUint8Array;
  length: number;
  extraAccountsList: ExtraAccountMetaList;
}

export function getExtraAccountMetas(data: Buffer): ExtraAccountMeta[] {
  const decoder = getExtraAccountMetaAccountDataDecoder();
  const decodedData = decoder.decode(data);
  return decodedData.extraAccountsList.extraAccounts.slice(
    0,
    decodedData.extraAccountsList.count
  );
}

export function getExtraAccountMetaDecoder(): Decoder<ExtraAccountMeta> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['addressConfig', getAddressDecoder()],
    ['isSigner', getBooleanDecoder()],
    ['isWritable', getBooleanDecoder()],
  ]);
}

export function getExtraAccountMetaListDecoder(): Decoder<ExtraAccountMetaList> {
  return getStructDecoder([
    ['count', getU32Decoder()],
    ['extraAccounts', getArrayDecoder(getExtraAccountMetaDecoder())],
  ]);
}

export function getExtraAccountMetaAccountDataDecoder(): Decoder<ExtraAccountMetaAccountData> {
  return getStructDecoder([
    ['instructionDiscriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['length', getU32Decoder()],
    ['extraAccountsList', getExtraAccountMetaListDecoder()],
  ]);
}

export async function resolveExtraAccountMeta(
  client: Client,
  extraMeta: ExtraAccountMeta,
  previousMetas: IAccountMeta[],
  instructionData: Uint8Array,
  transferHookProgramId: Address
): Promise<IAccountMeta> {
  if (extraMeta.discriminator === 0) {
    return {
      address: extraMeta.addressConfig,
      role: extraMeta.isWritable
        ? extraMeta.isSigner
          ? AccountRole.WRITABLE_SIGNER
          : AccountRole.WRITABLE
        : extraMeta.isSigner
          ? AccountRole.READONLY_SIGNER
          : AccountRole.READONLY,
    };
  }

  let programAddress: Address;

  if (extraMeta.discriminator === 1) {
    programAddress = transferHookProgramId;
  } else {
    const accountIndex = extraMeta.discriminator - (1 << 7);
    if (previousMetas.length <= accountIndex) {
      throw new Error('Token transfer hook not found!');
    }
    programAddress = previousMetas[accountIndex].address;
  }

  const addressBytes = new Uint8Array(
    getAddressEncoder().encode(extraMeta.addressConfig)
  );

  const seeds = await unpackSeeds(
    client,
    addressBytes,
    previousMetas,
    instructionData
  );
  const [address] = await getProgramDerivedAddress({ seeds, programAddress });

  return {
    address,
    role: extraMeta.isWritable
      ? extraMeta.isSigner
        ? AccountRole.WRITABLE_SIGNER
        : AccountRole.WRITABLE
      : extraMeta.isSigner
        ? AccountRole.READONLY_SIGNER
        : AccountRole.READONLY,
  };
}
