import {
  getCreateAccountInstruction,
  getTransferSolInstruction,
} from '@solana-program/system';
import {
  AuthorityType,
  findAssociatedTokenPda,
  getCreateAssociatedTokenInstructionAsync,
} from '@solana-program/token';
import { fromLegacyPublicKey } from '@solana/compat';
import {
  AccountRole,
  Address,
  Commitment,
  Decoder,
  Encoder,
  IAccountMeta,
  ProgramDerivedAddress,
  TransactionSigner,
  appendTransactionMessageInstructions,
  fixDecoderSize,
  generateKeyPairSigner,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Encoder,
  none,
  pipe,
} from '@solana/web3.js';
import { AccountMeta, TransactionInstruction } from '@solana/web3.js-legacy';
import {
  LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
  TOKEN22_PROGRAM_ID,
} from '../programIds';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';
import { fromIInstructionToTransactionInstruction } from '../shared';
import {
  METADATA_POINTER_EXTENSION_LENGTH,
  TRANSFER_HOOK_EXTENSION_LENGTH,
  getInitializeMetadataPointerInstruction,
  getInitializeTransferHookInstruction,
} from './extensions';
import {
  TokenMetadataInstructionArgs,
  getInitializeTokenMetadataInstruction,
  getTokenMetadataArgsEncoder,
  getUpdateFieldInstruction,
} from './extensions/tokenMetadata';
import { getInitializeExtraMetasAccountInstruction } from './initializeExtraMetasAccount';
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

interface T22NftReturn {
  mint: Address;
  ownerAta: Address;
  extraMetasDataLength: number;
  extraAccountMetas: IAccountMeta[];
}

export const createT22NftWithRoyalties = async (
  args: T22NftArgs
): Promise<T22NftReturn> => {
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

  // // Setup the mint account with metadata pointer and metadata extension.
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

  const [extraAccountMetasAccount] = await findExtraAccountMetaAddress(
    { mint: mint.address },
    LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID
  );

  const extraAccountMetaList = {
    extraAccounts: [],
  };

  const initializeMetasIx = getInitializeExtraMetasAccountInstruction({
    extraAccountMetasAccount,
    mint: mint.address,
    authority: mintAuthority,
    extraAccountMetaList,
  });

  // 35 for each extra account meta, 8 for state discriminator, 4 for TVL length, 4 for list/vector length
  // two mandatory extra metas
  const extraMetasDataLength =
    35 * (extraAccountMetaList.extraAccounts.length + 2) + 16;

  const extraMetasRent = await client.rpc
    .getMinimumBalanceForRentExemption(BigInt(extraMetasDataLength))
    .send();

  // Update the fields on the metadata account for Libreplex-style royalties,
  // create the token account for the owner, and mint the NFT to the owner.
  // Initialize the extra metas account on the Libreplex transfer hook program, and
  // finally, set the mint authority to null.
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
    getTransferSolInstruction({
      source: payer,
      destination: extraAccountMetasAccount,
      amount: extraMetasRent,
    }),
    initializeMetasIx,
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

  const instruction =
    fromIInstructionToTransactionInstruction(initializeMetasIx);

  // Decode the extra account metas.
  const extraAccountMetas = await getTransferHookExtraAccounts(
    client,
    mint.address,
    instruction,
    LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
    'confirmed'
  );

  return {
    mint: mint.address,
    ownerAta,
    extraMetasDataLength,
    extraAccountMetas,
  };
};

export async function getTransferHookExtraAccounts(
  client: Client,
  mint: Address,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instruction: TransactionInstruction,
  tansferHookProgramId: Address,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  commitment?: Commitment
) {
  const [address] = await findExtraAccountMetaAddress(
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
        fromLegacyPublicKey(instruction.programId)
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

export async function findExtraAccountMetaAddress(
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

export async function findGlobalDenyListAddress(): Promise<ProgramDerivedAddress> {
  return await getProgramDerivedAddress({
    programAddress: LIBREPLEX_TRANSFER_HOOK_PROGRAM_ID,
    seeds: [getUtf8Encoder().encode('global_deny_list')],
  });
}

export interface ExtraAccountMeta {
  discriminator: number;
  addressConfig: Address;
  isSigner: boolean;
  isWritable: boolean;
}

export interface ExtraAccountMetaList {
  extraAccounts: ExtraAccountMeta[];
}

export interface ExtraAccountMetaAccountData {
  extraAccountsList: ExtraAccountMetaList;
}

export function getExtraAccountMetas(data: Buffer): ExtraAccountMeta[] {
  const decoder = getExtraAccountMetaAccountDataDecoder();
  const decodedData = decoder.decode(data);
  return decodedData.extraAccountsList.extraAccounts.slice(
    0,
    decodedData.extraAccountsList.extraAccounts.length
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
    ['extraAccounts', getArrayDecoder(getExtraAccountMetaDecoder())],
  ]);
}

export function getExtraAccountMetaAccountDataDecoder(): Decoder<ExtraAccountMetaAccountData> {
  return getStructDecoder([
    ['instructionDiscriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['tlvLength', getU32Decoder()],
    ['extraAccountsList', getExtraAccountMetaListDecoder()],
  ]);
}

export function getExtraAccountMetaListEncoder(): Encoder<ExtraAccountMetaList> {
  return getStructEncoder([
    ['extraAccounts', getArrayEncoder(getExtraAccountMetaEncoder())],
  ]);
}

export function getExtraAccountMetaEncoder(): Encoder<ExtraAccountMeta> {
  return getStructEncoder([
    ['discriminator', getU8Encoder()],
    ['addressConfig', getAddressEncoder()],
    ['isSigner', getBooleanEncoder()],
    ['isWritable', getBooleanEncoder()],
  ]);
}

export async function resolveExtraAccountMeta(
  client: Client,
  extraMeta: ExtraAccountMeta,
  previousMetas: AccountMeta[],
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
    programAddress = fromLegacyPublicKey(previousMetas[accountIndex]);
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
