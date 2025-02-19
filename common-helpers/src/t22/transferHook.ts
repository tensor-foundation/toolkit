import {
  AccountRole,
  Address,
  Decoder,
  GetAccountInfoApi,
  IAccountMeta,
  IInstruction,
  ProgramDerivedAddress,
  ReadonlyUint8Array,
  Rpc,
  address,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getBooleanDecoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getU32Decoder,
  getU64Decoder,
  getU8Decoder,
  getUtf8Encoder,
  isSome,
} from "@solana/web3.js";
import { getMintDecoder, Mint } from "@solana-program/token-2022";
import { DEFAULT_ADDRESS } from "../constants";

export type TransferHook = {
  program: Address;
  remainingAccounts?: IAccountMeta[] | null;
} | null;

export async function getTransferHook({
  mint,
  rpc,
}: {
  mint: Address;
  rpc: Rpc<GetAccountInfoApi>;
}): Promise<TransferHook> {
  const mintAccData = await rpc.getAccountInfo(mint, { encoding: "base64" }).send();
  if (!mintAccData.value?.data) return null;
  const mintAcc = getMintDecoder().decode(Buffer.from(mintAccData.value?.data[0], "base64"));
  // transfer hook
  const transferHook = isSome(mintAcc.extensions)
    ? mintAcc.extensions.value.find((e) => e.__kind === "TransferHook")
    : undefined;
  if (!transferHook) return null;
  // remaining accounts from metadata
  const metadataAccountAddress = isSome(mintAcc.extensions)
    ? mintAcc.extensions.value.find((e) => e.__kind === "MetadataPointer")?.metadataAddress
    : undefined;
  let metadataAccount: Mint | undefined;
  if (metadataAccountAddress && isSome(metadataAccountAddress)) {
    if (metadataAccountAddress.value === mint) {
      metadataAccount = mintAcc;
    } else {
      const metadataAccountData = await rpc
        .getAccountInfo(metadataAccountAddress.value, { encoding: "base64" })
        .send();
      if (!metadataAccountData.value?.data) return null;
      metadataAccount = getMintDecoder().decode(
        Buffer.from(metadataAccountData.value?.data[0], "base64")
      );
    }
  }
  const additionalMetadata =
    metadataAccount && isSome(metadataAccount.extensions)
      ? metadataAccount.extensions.value.find((e) => e.__kind === "TokenMetadata")
          ?.additionalMetadata
      : undefined;
  const remainingAccounts = additionalMetadata
    ? Object.keys(additionalMetadata).reduce<IAccountMeta[]>((acc, cur) => {
        if (!cur.startsWith("_ro_")) return acc;
        const pk = cur.replace("_ro_", "");
        return [
          ...acc,
          {
            address: address(pk),
            role: AccountRole.WRITABLE,
          },
        ];
      }, [])
    : null;
  return {
    program: transferHook?.programId,
    remainingAccounts,
  };
}

export async function getTransferHookExtraAccounts({
  mint,
  rpc,
  transferHookProgramId,
  instruction,
}: {
  mint: Address;
  rpc: Rpc<GetAccountInfoApi>;
  transferHookProgramId: Address;
  instruction: IInstruction;
}): Promise<IAccountMeta[]> {
  const [extraAccountMetaAddress] = await getExtraAccountMetaAddress(mint, transferHookProgramId);

  const extraMetas: IAccountMeta[] = [
    {
      address: transferHookProgramId,
      role: AccountRole.READONLY,
    },
  ];

  const extraAccountMetaData = await rpc
    .getAccountInfo(extraAccountMetaAddress, { encoding: "base64" })
    .send();
  if (!extraAccountMetaData.value?.data) return extraMetas;

  const extraAccountMetas = getExtraAccountMetas(
    Buffer.from(extraAccountMetaData.value?.data[0], "base64")
  );
  for (const extraAccountMeta of extraAccountMetas) {
    extraMetas.push(
      await resolveExtraAccountMeta(
        rpc,
        extraAccountMeta,
        instruction.accounts?.map((a) => ({ address: a.address, role: a.role })) || [],
        instruction.data,
        instruction.programAddress
      )
    );
  }
  extraMetas.push({
    address: extraAccountMetaAddress,
    role: AccountRole.READONLY,
  });

  return extraMetas;
}

async function getExtraAccountMetaAddress(
  mint: Address,
  programId: Address
): Promise<ProgramDerivedAddress> {
  return await getProgramDerivedAddress({
    programAddress: programId,
    seeds: [getUtf8Encoder().encode("extra-account-metas"), getAddressEncoder().encode(mint)],
  });
}

// translated from https://github.com/solana-labs/solana-program-library/blob/0ab6ed7869679c0f5e2a72068e7a4e0591076d1f/token/js/src/extensions/transferHook/state.ts
export async function resolveExtraAccountMeta(
  rpc: Rpc<GetAccountInfoApi>,
  extraAccountMeta: ExtraAccountMeta,
  previousMetas: IAccountMeta[],
  data: IInstruction["data"] = new Uint8Array(),
  transferHookProgramId: IInstruction["programAddress"]
): Promise<IAccountMeta> {
  if (extraAccountMeta.discriminator === 0) {
    return {
      address: extraAccountMeta.addressConfig,
      role: (Number(extraAccountMeta.isSigner) << 1) | Number(extraAccountMeta.isWritable),
    };
  }

  let programId: Address<string> = DEFAULT_ADDRESS;

  if (extraAccountMeta.discriminator === 1) {
    programId = transferHookProgramId;
  } else {
    const accountIndex = extraAccountMeta.discriminator - (1 << 7);
    if (previousMetas.length <= Number(accountIndex)) {
      throw new Error("TokenTransferHookAccountNotFound");
    }
    programId = previousMetas[Number(accountIndex)].address;
  }

  const seeds = await unpackSeeds(
    new Uint8Array(getAddressEncoder().encode(extraAccountMeta.addressConfig)),
    previousMetas,
    Buffer.from(data),
    rpc
  );
  const pubkey = await getProgramDerivedAddress({
    programAddress: programId,
    seeds: seeds,
  });

  return {
    address: pubkey[0],
    role: (Number(extraAccountMeta.isSigner) << 1) | Number(extraAccountMeta.isWritable),
  };
}

export function getExtraAccountMetas(accountData: ReadonlyUint8Array): ExtraAccountMeta[] {
  const extraAccountMetaAccountData = getExtraAccountMetaAccountDataDecoder().decode(
    new Uint8Array(accountData)
  );
  const extraAccountsList = extraAccountMetaAccountData.extraAccountsList;
  return extraAccountsList.accounts.slice(0, extraAccountsList.count);
}

export type ExtraAccountMetaAccountData = {
  instructionDiscriminator: bigint; //u64
  length: number; //u32
  extraAccountsList: ExtraAccountMetaList;
};

export type ExtraAccountMetaList = {
  count: number; //u32
  accounts: ExtraAccountMeta[];
};

function getExtraAccountMetaDecoder(): Decoder<ExtraAccountMeta> {
  return getStructDecoder([
    ["discriminator", getU8Decoder()],
    ["addressConfig", getAddressDecoder()],
    ["isSigner", getBooleanDecoder()],
    ["isWritable", getBooleanDecoder()],
  ]);
}

function getExtraAccountMetaListDecoder(): Decoder<ExtraAccountMetaList> {
  return getStructDecoder([
    ["count", getU32Decoder()],
    ["accounts", getArrayDecoder(getExtraAccountMetaDecoder(), { size: "remainder" })],
  ]);
}

export interface ExtraAccountMeta {
  discriminator: number;
  addressConfig: Address;
  isSigner: boolean;
  isWritable: boolean;
}

function getExtraAccountMetaAccountDataDecoder(): Decoder<ExtraAccountMetaAccountData> {
  return getStructDecoder([
    ["instructionDiscriminator", getU64Decoder()],
    ["length", getU32Decoder()],
    ["extraAccountsList", getExtraAccountMetaListDecoder()],
  ]);
}

// translated (mostly yoinked) from https://github.com/solana-labs/solana-program-library/blob/0ab6ed7869679c0f5e2a72068e7a4e0591076d1f/token/js/src/extensions/transferHook/seeds.ts
interface Seed {
  data: Buffer;
  packedLength: number;
}

const DISCRIMINATOR_SPAN = 1;
const LITERAL_LENGTH_SPAN = 1;
const INSTRUCTION_ARG_OFFSET_SPAN = 1;
const INSTRUCTION_ARG_LENGTH_SPAN = 1;
const ACCOUNT_KEY_INDEX_SPAN = 1;
const ACCOUNT_DATA_ACCOUNT_INDEX_SPAN = 1;
const ACCOUNT_DATA_OFFSET_SPAN = 1;
const ACCOUNT_DATA_LENGTH_SPAN = 1;

function unpackSeedLiteral(seeds: Uint8Array): Seed {
  if (seeds.length < 1) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  const [length, ...rest] = seeds;
  if (rest.length < length) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  return {
    data: Buffer.from(rest.slice(0, length)),
    packedLength: DISCRIMINATOR_SPAN + LITERAL_LENGTH_SPAN + length,
  };
}

function unpackSeedInstructionArg(seeds: Uint8Array, instructionData: Buffer): Seed {
  if (seeds.length < 2) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  const [index, length] = seeds;
  if (instructionData.length < length + index) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  return {
    data: instructionData.subarray(index, index + length),
    packedLength: DISCRIMINATOR_SPAN + INSTRUCTION_ARG_OFFSET_SPAN + INSTRUCTION_ARG_LENGTH_SPAN,
  };
}

function unpackSeedAccountKey(seeds: Uint8Array, previousMetas: IAccountMeta[]): Seed {
  if (seeds.length < 1) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  const [index] = seeds;
  if (previousMetas.length <= index) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  return {
    data: Buffer.from(getAddressEncoder().encode(previousMetas[index].address)),
    packedLength: DISCRIMINATOR_SPAN + ACCOUNT_KEY_INDEX_SPAN,
  };
}

async function unpackSeedAccountData(
  seeds: Uint8Array,
  previousMetas: IAccountMeta[],
  rpc: Rpc<GetAccountInfoApi>
): Promise<Seed> {
  if (seeds.length < 3) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  const [accountIndex, dataIndex, length] = seeds;
  if (previousMetas.length <= accountIndex) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  const accountInfo = await rpc
    .getAccountInfo(previousMetas[accountIndex].address, { encoding: "base64" })
    .send();
  if (accountInfo == null || !accountInfo.value?.data) {
    throw new Error("TokenTransferHookAccountDataNotFound");
  }
  if (accountInfo.value?.data?.length < dataIndex + length) {
    throw new Error("TokenTransferHookInvalidSeed");
  }
  return {
    data: Buffer.from(accountInfo.value?.data[0]).subarray(dataIndex, dataIndex + length),
    packedLength:
      DISCRIMINATOR_SPAN +
      ACCOUNT_DATA_ACCOUNT_INDEX_SPAN +
      ACCOUNT_DATA_OFFSET_SPAN +
      ACCOUNT_DATA_LENGTH_SPAN,
  };
}

async function unpackFirstSeed(
  seeds: Uint8Array,
  previousMetas: IAccountMeta[],
  instructionData: Buffer,
  rpc: Rpc<GetAccountInfoApi>
): Promise<Seed | null> {
  const [discriminator, ...rest] = seeds;
  const remaining = new Uint8Array(rest);
  switch (discriminator) {
    case 0:
      return null;
    case 1:
      return unpackSeedLiteral(remaining);
    case 2:
      return unpackSeedInstructionArg(remaining, instructionData);
    case 3:
      return unpackSeedAccountKey(remaining, previousMetas);
    case 4:
      return unpackSeedAccountData(remaining, previousMetas, rpc);
    default:
      throw new Error("TokenTransferHookInvalidSeed");
  }
}

async function unpackSeeds(
  seeds: Uint8Array,
  previousMetas: IAccountMeta[],
  instructionData: Buffer,
  rpc: Rpc<GetAccountInfoApi>
): Promise<Buffer[]> {
  const unpackedSeeds: Buffer[] = [];
  let i = 0;
  while (i < 32) {
    const seed = await unpackFirstSeed(seeds.slice(i), previousMetas, instructionData, rpc);
    if (seed == null) {
      break;
    }
    unpackedSeeds.push(seed.data);
    i += seed.packedLength;
  }
  return unpackedSeeds;
}
