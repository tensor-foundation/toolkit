import {
  Address,
  appendTransactionMessageInstruction,
  generateKeyPairSigner,
  KeyPairSigner,
  none,
  OptionOrNullable,
  pipe,
} from '@solana/web3.js';
import {
  Client,
  createDefaultTransaction,
  signAndSendTransaction,
  TOKEN_PROGRAM_ID,
} from '@tensor-foundation/test-helpers';
import {
  Collection,
  CollectionDetails,
  Creator,
  findMasterEditionPda,
  findMetadataPda,
  findTokenRecordPda,
  getCreateV1Instruction,
  getMintV1Instruction,
  printSupply,
  PrintSupplyArgs,
  TokenStandard,
  Uses,
} from '../generated';
import { findAtaPda } from '../token';

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
}

export type Nft = {
  mint: Address;
  metadata: Address;
  masterEdition: Address;
  token: Address;
  tokenRecord?: Address;
};

export type CreateNftArgs = {
  client: Client;
  payer: KeyPairSigner | null;
  authority: KeyPairSigner;
  owner: KeyPairSigner;
  creators?: Creator[] | null;
  data?: NftData;
  standard?: TokenStandard;
  tokenProgram?: Address;
};

// Create a default NFT with example data. Useful for creating throw-away NFTs
// for testing. TokenStandard defaults to NonFungible.
// Returns the mint address of the NFT.
export const createDefaultNft = async (args: CreateNftArgs): Promise<Nft> => {
  const {
    client,
    payer,
    authority,
    owner,
    creators,
    standard = TokenStandard.NonFungible,
    tokenProgram = TOKEN_PROGRAM_ID,
  } = args;

  let { data } = args;

  if (!data) {
    data = {
      name: 'Example NFT',
      symbol: 'EXNFT',
      uri: 'https://example.com/nft',
      sellerFeeBasisPoints: 500,
      creators: creators
        ? creators
        : [
            {
              address: authority.address,
              verified: true,
              share: 100,
            },
          ],
      printSupply: printSupply('Zero'),
      tokenStandard: standard,
    };
  }

  // In case user provides two contradictory standards.
  if (data.tokenStandard != standard) {
    throw new Error('Token standard mismatch');
  }

  const accounts = {
    authority,
    owner,
    payer,
    tokenProgramId: tokenProgram,
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

// Create a new NFT and return the addresses associated with it.
export const mintNft = async (
  client: Client,
  accounts: MintNftAccounts,
  data: NftData
): Promise<Nft> => {
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
  const [token] = await findAtaPda({
    owner: owner.address,
    mint: mint.address,
    tokenProgramId: tokenProgramId,
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
    printSupply: printSupply ?? none(),
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
    tokenRecord,
    splTokenProgram: tokenProgramId,
    amount: 1,
    authorizationData: null,
  });

  await pipe(
    await createDefaultTransaction(client, payer),
    (tx) => appendTransactionMessageInstruction(createIx, tx),
    (tx) => appendTransactionMessageInstruction(mintIx, tx),
    (tx) => signAndSendTransaction(client, tx)
  );

  return {
    mint: mint.address,
    metadata,
    masterEdition,
    token,
    tokenRecord,
  };
};
