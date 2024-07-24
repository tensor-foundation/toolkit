/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Address,
  containsBytes,
  fixEncoderSize,
  getBytesEncoder,
} from '@solana/web3.js';
import {
  ParsedBurnInstruction,
  ParsedCancelRedeemInstruction,
  ParsedCompressInstruction,
  ParsedCreateTreeInstruction,
  ParsedDecompressV1Instruction,
  ParsedDelegateInstruction,
  ParsedMintToCollectionV1Instruction,
  ParsedMintV1Instruction,
  ParsedRedeemInstruction,
  ParsedSetAndVerifyCollectionInstruction,
  ParsedSetDecompressableStateInstruction,
  ParsedSetDecompressibleStateInstruction,
  ParsedSetTreeDelegateInstruction,
  ParsedTransferInstruction,
  ParsedUnverifyCollectionInstruction,
  ParsedUnverifyCreatorInstruction,
  ParsedUpdateMetadataInstruction,
  ParsedVerifyCollectionInstruction,
  ParsedVerifyCreatorInstruction,
} from '../instructions';

export const BUBBLEGUM_PROGRAM_ADDRESS =
  'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY' as Address<'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY'>;

export enum BubblegumAccount {
  TreeConfig,
  Voucher,
}

export function identifyBubblegumAccount(
  account: { data: Uint8Array } | Uint8Array
): BubblegumAccount {
  const data = account instanceof Uint8Array ? account : account.data;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([122, 245, 175, 248, 171, 34, 0, 207])
      ),
      0
    )
  ) {
    return BubblegumAccount.TreeConfig;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([191, 204, 149, 234, 213, 165, 13, 65])
      ),
      0
    )
  ) {
    return BubblegumAccount.Voucher;
  }
  throw new Error(
    'The provided account could not be identified as a bubblegum account.'
  );
}

export enum BubblegumInstruction {
  Burn,
  CancelRedeem,
  Compress,
  CreateTree,
  DecompressV1,
  Delegate,
  MintToCollectionV1,
  MintV1,
  Redeem,
  SetAndVerifyCollection,
  SetDecompressableState,
  SetDecompressibleState,
  SetTreeDelegate,
  Transfer,
  UnverifyCollection,
  UnverifyCreator,
  VerifyCollection,
  VerifyCreator,
  UpdateMetadata,
}

export function identifyBubblegumInstruction(
  instruction: { data: Uint8Array } | Uint8Array
): BubblegumInstruction {
  const data =
    instruction instanceof Uint8Array ? instruction : instruction.data;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([116, 110, 29, 56, 107, 219, 42, 93])
      ),
      0
    )
  ) {
    return BubblegumInstruction.Burn;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([111, 76, 232, 50, 39, 175, 48, 242])
      ),
      0
    )
  ) {
    return BubblegumInstruction.CancelRedeem;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([82, 193, 176, 117, 176, 21, 115, 253])
      ),
      0
    )
  ) {
    return BubblegumInstruction.Compress;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([165, 83, 136, 142, 89, 202, 47, 220])
      ),
      0
    )
  ) {
    return BubblegumInstruction.CreateTree;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([54, 85, 76, 70, 228, 250, 164, 81])
      ),
      0
    )
  ) {
    return BubblegumInstruction.DecompressV1;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([90, 147, 75, 178, 85, 88, 4, 137])
      ),
      0
    )
  ) {
    return BubblegumInstruction.Delegate;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([153, 18, 178, 47, 197, 158, 86, 15])
      ),
      0
    )
  ) {
    return BubblegumInstruction.MintToCollectionV1;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([145, 98, 192, 118, 184, 147, 118, 104])
      ),
      0
    )
  ) {
    return BubblegumInstruction.MintV1;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([184, 12, 86, 149, 70, 196, 97, 225])
      ),
      0
    )
  ) {
    return BubblegumInstruction.Redeem;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([235, 242, 121, 216, 158, 234, 180, 234])
      ),
      0
    )
  ) {
    return BubblegumInstruction.SetAndVerifyCollection;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([18, 135, 238, 168, 246, 195, 61, 115])
      ),
      0
    )
  ) {
    return BubblegumInstruction.SetDecompressableState;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([82, 104, 152, 6, 149, 111, 100, 13])
      ),
      0
    )
  ) {
    return BubblegumInstruction.SetDecompressibleState;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([253, 118, 66, 37, 190, 49, 154, 102])
      ),
      0
    )
  ) {
    return BubblegumInstruction.SetTreeDelegate;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([163, 52, 200, 231, 140, 3, 69, 186])
      ),
      0
    )
  ) {
    return BubblegumInstruction.Transfer;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([250, 251, 42, 106, 41, 137, 186, 168])
      ),
      0
    )
  ) {
    return BubblegumInstruction.UnverifyCollection;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([107, 178, 57, 39, 105, 115, 112, 152])
      ),
      0
    )
  ) {
    return BubblegumInstruction.UnverifyCreator;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([56, 113, 101, 253, 79, 55, 122, 169])
      ),
      0
    )
  ) {
    return BubblegumInstruction.VerifyCollection;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([52, 17, 96, 132, 71, 4, 85, 194])
      ),
      0
    )
  ) {
    return BubblegumInstruction.VerifyCreator;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([170, 182, 43, 239, 97, 78, 225, 186])
      ),
      0
    )
  ) {
    return BubblegumInstruction.UpdateMetadata;
  }
  throw new Error(
    'The provided instruction could not be identified as a bubblegum instruction.'
  );
}

export type ParsedBubblegumInstruction<
  TProgram extends string = 'BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY',
> =
  | ({
      instructionType: BubblegumInstruction.Burn;
    } & ParsedBurnInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.CancelRedeem;
    } & ParsedCancelRedeemInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.Compress;
    } & ParsedCompressInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.CreateTree;
    } & ParsedCreateTreeInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.DecompressV1;
    } & ParsedDecompressV1Instruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.Delegate;
    } & ParsedDelegateInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.MintToCollectionV1;
    } & ParsedMintToCollectionV1Instruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.MintV1;
    } & ParsedMintV1Instruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.Redeem;
    } & ParsedRedeemInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.SetAndVerifyCollection;
    } & ParsedSetAndVerifyCollectionInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.SetDecompressableState;
    } & ParsedSetDecompressableStateInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.SetDecompressibleState;
    } & ParsedSetDecompressibleStateInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.SetTreeDelegate;
    } & ParsedSetTreeDelegateInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.Transfer;
    } & ParsedTransferInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.UnverifyCollection;
    } & ParsedUnverifyCollectionInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.UnverifyCreator;
    } & ParsedUnverifyCreatorInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.VerifyCollection;
    } & ParsedVerifyCollectionInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.VerifyCreator;
    } & ParsedVerifyCreatorInstruction<TProgram>)
  | ({
      instructionType: BubblegumInstruction.UpdateMetadata;
    } & ParsedUpdateMetadataInstruction<TProgram>);