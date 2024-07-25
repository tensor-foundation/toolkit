import {
  addDecoderSizePrefix,
  Decoder,
  getArrayDecoder,
  getStructDecoder,
  getU32Decoder,
  getUtf8Decoder,
} from '@solana/web3.js';
import { createHash } from 'crypto';
import { toAddress } from '../../addresses';
import { MetadataPointer } from './metadataPointer';
import { AdditionalMetadata, TokenMetadata } from './tokenMetadata';
import { TransferHook } from './transferHook';

export * from './metadataPointer';
export * from './transferHook';

export enum ExtensionType {
  Uninitialized = 0,
  TransferFeeConfig = 1,
  TransferFeeAmount = 2,
  MintCloseAuthority = 3,
  ConfidentialTransferMint = 4,
  ConfidentialTransferAccount = 5,
  DefaultAccountState = 6,
  ImmutableOwner = 7,
  MemoTransfer = 8,
  NonTransferable = 9,
  InterestBearingConfig = 10,
  CpiGuard = 11,
  PermanentDelegate = 12,
  NonTransferableAccount = 13,
  TransferHook = 14,
  TransferHookAccount = 15,
  ConfidentialTransferFeeConfig = 16,
  ConfidentialTransferFeeAmount = 17,
  MetadataPointer = 18,
  TokenMetadata = 19,
  GroupPointer = 20,
  TokenGroup = 21,
  GroupMemberPointer = 22,
  TokenGroupMember = 23,
}

export const TOKEN_METADATA_DISCS: { [key: string]: Uint8Array } = {
  initialize: new Uint8Array([210, 225, 30, 162, 88, 184, 77, 141]),
  update: new Uint8Array([221, 233, 49, 45, 181, 202, 220, 200]),
  remove: new Uint8Array([234, 18, 32, 56, 89, 141, 37, 181]),
  updateAuthority: new Uint8Array([215, 228, 166, 228, 84, 100, 86, 123]),
  emit: new Uint8Array([250, 166, 180, 250, 13, 12, 184, 70]),
};

export function getDiscriminator(input: string): Uint8Array {
  // Create a SHA256 hash of the input string
  const hash = createHash('sha256').update(input).digest();

  // Take the first 8 bytes of the hash
  return new Uint8Array(hash.slice(0, 8));
}

export function numberToExtensionType(
  value: number
): ExtensionType | undefined {
  if (value in ExtensionType) {
    return value as ExtensionType;
  }
  return undefined;
}

type ExtensionTypeMap = {
  [ExtensionType.MetadataPointer]: MetadataPointer;
  [ExtensionType.TransferHook]: TransferHook;
  [ExtensionType.TokenMetadata]: TokenMetadata;
};

function deserializeMetadataPointer(
  extensionBytes: Uint8Array
): MetadataPointer {
  const authority = toAddress(extensionBytes.slice(0, 32));
  const metadata = toAddress(extensionBytes.slice(32, 64));
  return { authority, metadata };
}

function deserializeTransferHook(extensionBytes: Uint8Array): TransferHook {
  const authority = toAddress(extensionBytes.slice(0, 32));
  const programId = toAddress(extensionBytes.slice(32, 64));
  return { authority, programId };
}

function deserializeTokenMetadata(extensionBytes: Uint8Array): TokenMetadata {
  const updateAuthority = toAddress(extensionBytes.slice(0, 32));
  const mint = toAddress(extensionBytes.slice(32, 64));
  const name = getUtf8Decoder().decode(extensionBytes);
  const symbol = getUtf8Decoder().decode(extensionBytes);
  const uri = getUtf8Decoder().decode(extensionBytes);
  const additionalMetadata =
    getAdditionalMetadataDecoder().decode(extensionBytes);

  return { updateAuthority, mint, name, symbol, uri, additionalMetadata };
}

function getAdditionalMetadataDecoder(): Decoder<AdditionalMetadata[]> {
  return getArrayDecoder(
    getStructDecoder([
      ['key', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
      ['value', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ])
  );
}

export function deserializeExtension<T extends keyof ExtensionTypeMap>(
  data: Uint8Array,
  extensionType: T
): ExtensionTypeMap[T] | null {
  const extensionBytes = findExtension(data, extensionType);
  if (!extensionBytes) {
    return null;
  }

  switch (extensionType) {
    case ExtensionType.MetadataPointer:
      return deserializeMetadataPointer(extensionBytes) as ExtensionTypeMap[T];
    case ExtensionType.TransferHook:
      return deserializeTransferHook(extensionBytes) as ExtensionTypeMap[T];
    case ExtensionType.TokenMetadata:
      return deserializeTokenMetadata(extensionBytes) as ExtensionTypeMap[T];
    // Add other cases as needed
    default:
      throw new Error(
        `Unsupported extension type: ${ExtensionType[extensionType]}`
      );
  }
}

const findExtension = (
  account: Uint8Array,
  extensionType: ExtensionType
): Uint8Array | null => {
  // Base account + type byte
  const baseAccountLength = 166;
  let offset = baseAccountLength;

  while (offset < account.length) {
    // Read extension type (2 bytes), little-endian
    const currentExtensionType = account[offset] | (account[offset + 1] << 8);
    offset += 2;

    // Read extension length (2 bytes), little-endian
    const extensionLength = account[offset] | (account[offset + 1] << 8);
    offset += 2;

    // Check if this is the extension we're looking for
    if (currentExtensionType === extensionType) {
      // Return the extension data
      return account.slice(offset, offset + extensionLength);
    }

    // Move to the next extension
    offset += extensionLength;
  }

  // Extension not found
  return null;
};
