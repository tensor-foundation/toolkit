import { fromLegacyPublicKey } from '@solana/compat';
import { AccountMeta } from '@solana/web3.js-legacy';
import { Client } from '../setup';

interface Seed {
  data: Uint8Array;
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
    throw new Error('Transfer hook invalid seed');
  }
  const [length, ...rest] = seeds;
  if (rest.length < length) {
    throw new Error('Transfer hook invalid seed');
  }
  return {
    data: new Uint8Array(rest.slice(0, length)),
    packedLength: DISCRIMINATOR_SPAN + LITERAL_LENGTH_SPAN + length,
  };
}

function unpackSeedInstructionArg(
  seeds: Uint8Array,
  instructionData: Uint8Array
): Seed {
  if (seeds.length < 2) {
    throw new Error('Transfer hook invalid seed');
  }
  const [index, length] = seeds;
  if (instructionData.length < length + index) {
    throw new Error('Transfer hook invalid seed');
  }
  return {
    data: instructionData.slice(index, index + length),
    packedLength:
      DISCRIMINATOR_SPAN +
      INSTRUCTION_ARG_OFFSET_SPAN +
      INSTRUCTION_ARG_LENGTH_SPAN,
  };
}

function unpackSeedAccountKey(
  seeds: Uint8Array,
  previousMetas: AccountMeta[]
): Seed {
  if (seeds.length < 1) {
    throw new Error('Transfer hook invalid seed');
  }
  const [index] = seeds;
  if (previousMetas.length <= index) {
    throw new Error('Transfer hook invalid seed');
  }
  return {
    data: new TextEncoder().encode(
      fromLegacyPublicKey(previousMetas[index].pubkey)
    ),
    packedLength: DISCRIMINATOR_SPAN + ACCOUNT_KEY_INDEX_SPAN,
  };
}

async function unpackSeedAccountData(
  client: Client,
  seeds: Uint8Array,
  previousMetas: AccountMeta[]
): Promise<Seed> {
  if (seeds.length < 3) {
    throw new Error('Transfer hook invalid seed');
  }
  const [accountIndex, dataIndex, length] = seeds;
  if (previousMetas.length <= accountIndex) {
    throw new Error('Transfer hook invalid seed');
  }
  const accountInfo = await client.rpc
    .getAccountInfo(fromLegacyPublicKey(previousMetas[accountIndex].pubkey), {
      encoding: 'base64',
    })
    .send();
  if (accountInfo.value == null) {
    throw new Error('Transfer hook account data not found');
  }
  const accountData = Buffer.from(accountInfo.value.data[0], 'base64');
  if (accountData.length < dataIndex + length) {
    throw new Error('Transfer hook invalid seed');
  }
  return {
    data: accountData.subarray(dataIndex, dataIndex + length),
    packedLength:
      DISCRIMINATOR_SPAN +
      ACCOUNT_DATA_ACCOUNT_INDEX_SPAN +
      ACCOUNT_DATA_OFFSET_SPAN +
      ACCOUNT_DATA_LENGTH_SPAN,
  };
}

async function unpackFirstSeed(
  client: Client,
  seeds: Uint8Array,
  previousMetas: AccountMeta[],
  instructionData: Uint8Array
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
      return await unpackSeedAccountData(client, remaining, previousMetas);
    default:
      throw new Error('Token transfer hook invalid seed');
  }
}

export async function unpackSeeds(
  client: Client,
  seeds: Uint8Array,
  previousMetas: AccountMeta[],
  instructionData: Uint8Array
): Promise<Uint8Array[]> {
  const unpackedSeeds: Uint8Array[] = [];
  let i = 0;
  while (i < 32) {
    const seed = await unpackFirstSeed(
      client,
      seeds.slice(i),
      previousMetas,
      instructionData
    );
    if (seed == null) {
      break;
    }
    unpackedSeeds.push(seed.data);
    i += seed.packedLength;
  }
  return unpackedSeeds;
}
