import {
  Address,
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
} from '@solana/addresses';
import { KeyPairSigner, generateKeyPairSigner } from '@solana/signers';
import { appendTransactionInstruction, pipe } from '@solana/web3.js';
import { OptionOrNullable } from '@solana/codecs';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
} from '../setup';
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

const ATA_PROGRAM_ID = address('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const TOKEN_PROGRAM_ID = address('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const TOKEN_22_PROGRAM_ID = address(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

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
    tokenProgramId: TOKEN_22_PROGRAM_ID,
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

  const { authority, owner } = accounts;
  let { tokenProgramId, payer, mint } = accounts;

  // const client = createDefaultSolanaClient();

  if (payer === null) {
    payer = authority;
  }

  if (tokenProgramId === undefined) {
    tokenProgramId = TOKEN_PROGRAM_ID;
  }

  if (mint === undefined) {
    mint = await generateKeyPairSigner();
  }

  const [metadata] = await findMetadataPda({ mint: mint.address });
  const [masterEdition] = await findMasterEditionPda({ mint: mint.address });
  const [token] = await getProgramDerivedAddress({
    seeds: [
      getAddressEncoder().encode(owner.address),
      getAddressEncoder().encode(tokenProgramId),
      getAddressEncoder().encode(mint.address),
    ],
    programAddress: ATA_PROGRAM_ID,
  });

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
