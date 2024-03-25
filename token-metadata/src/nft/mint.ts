import {
  Address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/addresses';
import { KeyPairSigner, generateKeyPairSigner } from '@solana/signers';
import { appendTransactionInstruction, pipe } from '@solana/web3.js';
import { OptionOrNullable } from '@solana/codecs';
import {
  ASSOCIATED_TOKEN_ACCOUNTS_PROGRAM_ID,
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
  TOKEN_PROGRAM_ID,
  TOKEN22_PROGRAM_ID,
} from '@tensor-foundation/test-helpers';
import {
  getCreateV1Instruction,
  findMetadataPda,
  findMasterEditionPda,
  TokenStandard,
  Creator,
  Collection,
  Uses,
  CollectionDetails,
  PrintSupplyArgs,
  getMintV1Instruction,
  printSupply,
  findTokenRecordPda,
} from '../generated';

export interface NftData {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[];
  primarySaleHappened?: boolean;
  isMutable?: boolean;
  tokenStandard?: TokenStandard;
  collection?: Collection;
  uses?: Uses;
  collectionDetails?: CollectionDetails;
  ruleSet?: Address;
  decimals?: number;
  printSupply?: OptionOrNullable<PrintSupplyArgs>;
  isCollection?: boolean;
}

// Create a default NFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the mint address of the NFT.
export const createDefaultNft = async (
  client: Client,
  authority: KeyPairSigner<string>,
  owner: KeyPairSigner,
  payer: KeyPairSigner | null
): Promise<Address> => {
  const data: NftData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: 'https://example.com/nft',
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    printSupply: printSupply('Zero'),
  };

  const accounts = {
    authority,
    owner,
    payer,
    tokenProgramId: TOKEN_PROGRAM_ID,
  };

  return await mintNft(client, accounts, data);
};

// Create a default pNFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the mint address of the NFT.
export const createDefaultpNft = async (
  client: Client,
  authority: KeyPairSigner<string>,
  owner: KeyPairSigner,
  payer: KeyPairSigner | null
): Promise<Address> => {
  const data: NftData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: 'https://example.com/nft',
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    printSupply: printSupply('Zero'),
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  };

  const accounts = {
    authority,
    owner,
    payer,
    tokenProgramId: TOKEN_PROGRAM_ID,
  };

  return await mintNft(client, accounts, data);
};

// Create a default pNFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the mint address of the NFT.
export const createDefaultToken22pNft = async (
  client: Client,
  authority: KeyPairSigner<string>,
  owner: KeyPairSigner,
  payer: KeyPairSigner | null
): Promise<Address> => {
  const data: NftData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: 'https://example.com/nft',
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    printSupply: printSupply('Zero'),
    tokenStandard: TokenStandard.ProgrammableNonFungible,
  };

  const accounts = {
    authority,
    owner,
    payer,
    tokenProgramId: TOKEN22_PROGRAM_ID,
  };

  return await mintNft(client, accounts, data);
};

export interface MintNftAccounts {
  authority: KeyPairSigner;
  owner: KeyPairSigner;
  payer: KeyPairSigner | null;
  mint?: KeyPairSigner;
  tokenProgramId?: Address;
}

// Create a default Token 22 NFT with example data. Useful for creating throw-away NFTs
// for testing.
// Returns the mint and metadat addresses of the NFT.
export const createDefaultToken22Nft = async (
  client: Client,
  authority: KeyPairSigner,
  owner: KeyPairSigner,
  payer: KeyPairSigner | null
): Promise<Address> => {
  const data: NftData = {
    name: 'Example NFT',
    symbol: 'EXNFT',
    uri: 'https://example.com/nft',
    sellerFeeBasisPoints: 500,
    creators: [
      {
        address: authority.address,
        verified: true,
        share: 100,
      },
    ],
    printSupply: printSupply('Zero'),
  };

  const accounts = {
    authority,
    owner,
    payer,
    tokenProgramId: TOKEN22_PROGRAM_ID,
  };

  return await mintNft(client, accounts, data);
};

// Create a new NFT on the local validator and return the mint address.
export const mintNft = async (
  client: Client,
  accounts: MintNftAccounts,
  data: NftData
): Promise<Address> => {
  const {
    name,
    symbol,
    uri,
    sellerFeeBasisPoints,
    creators,
    primarySaleHappened = false,
    isMutable = true,
    tokenStandard = TokenStandard.NonFungible,
    collection = null,
    uses = null,
    collectionDetails = null,
    ruleSet = null,
    decimals = null,
    printSupply,
    isCollection = false,
  } = data;

  const { authority, owner, tokenProgramId } = accounts;
  let { payer, mint } = accounts;

  // const client = createDefaultSolanaClient();

  if (payer === null) {
    payer = authority;
  }

  if (mint === undefined) {
    mint = await generateKeyPairSigner();
  }

  const [metadata] = await findMetadataPda({ mint: mint.address });
  const [masterEdition] = await findMasterEditionPda({ mint: mint.address });
  const [token] = await getProgramDerivedAddress({
    seeds: [
      getAddressEncoder().encode(owner.address),
      getAddressEncoder().encode(tokenProgramId ?? TOKEN_PROGRAM_ID),
      getAddressEncoder().encode(mint.address),
    ],
    programAddress: ASSOCIATED_TOKEN_ACCOUNTS_PROGRAM_ID,
  });

  let tokenRecord = undefined;
  if (tokenStandard === TokenStandard.ProgrammableNonFungible) {
    [tokenRecord] = await findTokenRecordPda({ mint: mint.address, token });
  }

  const createIx = getCreateV1Instruction({
    metadata,
    masterEdition,
    mint,
    payer,
    authority,
    updateAuthority: authority,
    name,
    symbol,
    uri,
    sellerFeeBasisPoints,
    creators,
    primarySaleHappened,
    isMutable,
    tokenStandard,
    collection,
    uses,
    collectionDetails,
    ruleSet,
    decimals,
    printSupply,
    isCollection,
    splTokenProgram: tokenProgramId,
  });

  const mintIx = getMintV1Instruction({
    token,
    tokenOwner: owner.address,
    metadata,
    masterEdition,
    mint: mint.address,
    authority,
    payer,
    tokenStandard,
    tokenRecord,
    splTokenProgram: tokenProgramId,
  });

  await pipe(
    await createDefaultTransaction(client, owner.address),
    (tx) => appendTransactionInstruction(createIx, tx),
    (tx) => appendTransactionInstruction(mintIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return mint.address;
};
