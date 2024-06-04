/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import { Address, containsBytes, getU8Encoder } from '@solana/web3.js';
import {
  ParsedAddCollectionExternalPluginAdapterV1Instruction,
  ParsedAddCollectionPluginV1Instruction,
  ParsedAddExternalPluginAdapterV1Instruction,
  ParsedAddPluginV1Instruction,
  ParsedApproveCollectionPluginAuthorityV1Instruction,
  ParsedApprovePluginAuthorityV1Instruction,
  ParsedBurnCollectionV1Instruction,
  ParsedBurnV1Instruction,
  ParsedCollectInstruction,
  ParsedCompressV1Instruction,
  ParsedCreateCollectionV1Instruction,
  ParsedCreateCollectionV2Instruction,
  ParsedCreateV1Instruction,
  ParsedCreateV2Instruction,
  ParsedDecompressV1Instruction,
  ParsedRemoveCollectionExternalPluginAdapterV1Instruction,
  ParsedRemoveCollectionPluginV1Instruction,
  ParsedRemoveExternalPluginAdapterV1Instruction,
  ParsedRemovePluginV1Instruction,
  ParsedRevokeCollectionPluginAuthorityV1Instruction,
  ParsedRevokePluginAuthorityV1Instruction,
  ParsedTransferV1Instruction,
  ParsedUpdateCollectionExternalPluginAdapterV1Instruction,
  ParsedUpdateCollectionPluginV1Instruction,
  ParsedUpdateCollectionV1Instruction,
  ParsedUpdateExternalPluginAdapterV1Instruction,
  ParsedUpdatePluginV1Instruction,
  ParsedUpdateV1Instruction,
  ParsedWriteCollectionExternalPluginAdapterDataV1Instruction,
  ParsedWriteExternalPluginAdapterDataV1Instruction,
} from '../instructions';

export const MPL_CORE_PROGRAM_PROGRAM_ADDRESS =
  'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d' as Address<'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'>;

export enum MplCoreProgramAccount {
  PluginHeaderV1,
  PluginRegistryV1,
  AssetV1,
  CollectionV1,
  HashedAssetV1,
}

export enum MplCoreProgramInstruction {
  CreateV1,
  CreateCollectionV1,
  AddPluginV1,
  AddCollectionPluginV1,
  RemovePluginV1,
  RemoveCollectionPluginV1,
  UpdatePluginV1,
  UpdateCollectionPluginV1,
  ApprovePluginAuthorityV1,
  ApproveCollectionPluginAuthorityV1,
  RevokePluginAuthorityV1,
  RevokeCollectionPluginAuthorityV1,
  BurnV1,
  BurnCollectionV1,
  TransferV1,
  UpdateV1,
  UpdateCollectionV1,
  CompressV1,
  DecompressV1,
  Collect,
  CreateV2,
  CreateCollectionV2,
  AddExternalPluginAdapterV1,
  AddCollectionExternalPluginAdapterV1,
  RemoveExternalPluginAdapterV1,
  RemoveCollectionExternalPluginAdapterV1,
  UpdateExternalPluginAdapterV1,
  UpdateCollectionExternalPluginAdapterV1,
  WriteExternalPluginAdapterDataV1,
  WriteCollectionExternalPluginAdapterDataV1,
}

export function identifyMplCoreProgramInstruction(
  instruction: { data: Uint8Array } | Uint8Array
): MplCoreProgramInstruction {
  const data =
    instruction instanceof Uint8Array ? instruction : instruction.data;
  if (containsBytes(data, getU8Encoder().encode(0), 0)) {
    return MplCoreProgramInstruction.CreateV1;
  }
  if (containsBytes(data, getU8Encoder().encode(1), 0)) {
    return MplCoreProgramInstruction.CreateCollectionV1;
  }
  if (containsBytes(data, getU8Encoder().encode(2), 0)) {
    return MplCoreProgramInstruction.AddPluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(3), 0)) {
    return MplCoreProgramInstruction.AddCollectionPluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(4), 0)) {
    return MplCoreProgramInstruction.RemovePluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(5), 0)) {
    return MplCoreProgramInstruction.RemoveCollectionPluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(6), 0)) {
    return MplCoreProgramInstruction.UpdatePluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(7), 0)) {
    return MplCoreProgramInstruction.UpdateCollectionPluginV1;
  }
  if (containsBytes(data, getU8Encoder().encode(8), 0)) {
    return MplCoreProgramInstruction.ApprovePluginAuthorityV1;
  }
  if (containsBytes(data, getU8Encoder().encode(9), 0)) {
    return MplCoreProgramInstruction.ApproveCollectionPluginAuthorityV1;
  }
  if (containsBytes(data, getU8Encoder().encode(10), 0)) {
    return MplCoreProgramInstruction.RevokePluginAuthorityV1;
  }
  if (containsBytes(data, getU8Encoder().encode(11), 0)) {
    return MplCoreProgramInstruction.RevokeCollectionPluginAuthorityV1;
  }
  if (containsBytes(data, getU8Encoder().encode(12), 0)) {
    return MplCoreProgramInstruction.BurnV1;
  }
  if (containsBytes(data, getU8Encoder().encode(13), 0)) {
    return MplCoreProgramInstruction.BurnCollectionV1;
  }
  if (containsBytes(data, getU8Encoder().encode(14), 0)) {
    return MplCoreProgramInstruction.TransferV1;
  }
  if (containsBytes(data, getU8Encoder().encode(15), 0)) {
    return MplCoreProgramInstruction.UpdateV1;
  }
  if (containsBytes(data, getU8Encoder().encode(16), 0)) {
    return MplCoreProgramInstruction.UpdateCollectionV1;
  }
  if (containsBytes(data, getU8Encoder().encode(17), 0)) {
    return MplCoreProgramInstruction.CompressV1;
  }
  if (containsBytes(data, getU8Encoder().encode(18), 0)) {
    return MplCoreProgramInstruction.DecompressV1;
  }
  if (containsBytes(data, getU8Encoder().encode(19), 0)) {
    return MplCoreProgramInstruction.Collect;
  }
  if (containsBytes(data, getU8Encoder().encode(20), 0)) {
    return MplCoreProgramInstruction.CreateV2;
  }
  if (containsBytes(data, getU8Encoder().encode(21), 0)) {
    return MplCoreProgramInstruction.CreateCollectionV2;
  }
  if (containsBytes(data, getU8Encoder().encode(22), 0)) {
    return MplCoreProgramInstruction.AddExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(23), 0)) {
    return MplCoreProgramInstruction.AddCollectionExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(24), 0)) {
    return MplCoreProgramInstruction.RemoveExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(25), 0)) {
    return MplCoreProgramInstruction.RemoveCollectionExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(26), 0)) {
    return MplCoreProgramInstruction.UpdateExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(27), 0)) {
    return MplCoreProgramInstruction.UpdateCollectionExternalPluginAdapterV1;
  }
  if (containsBytes(data, getU8Encoder().encode(28), 0)) {
    return MplCoreProgramInstruction.WriteExternalPluginAdapterDataV1;
  }
  if (containsBytes(data, getU8Encoder().encode(29), 0)) {
    return MplCoreProgramInstruction.WriteCollectionExternalPluginAdapterDataV1;
  }
  throw new Error(
    'The provided instruction could not be identified as a mplCoreProgram instruction.'
  );
}

export type ParsedMplCoreProgramInstruction<
  TProgram extends string = 'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d',
> =
  | ({
      instructionType: MplCoreProgramInstruction.CreateV1;
    } & ParsedCreateV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.CreateCollectionV1;
    } & ParsedCreateCollectionV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.AddPluginV1;
    } & ParsedAddPluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.AddCollectionPluginV1;
    } & ParsedAddCollectionPluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RemovePluginV1;
    } & ParsedRemovePluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RemoveCollectionPluginV1;
    } & ParsedRemoveCollectionPluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdatePluginV1;
    } & ParsedUpdatePluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdateCollectionPluginV1;
    } & ParsedUpdateCollectionPluginV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.ApprovePluginAuthorityV1;
    } & ParsedApprovePluginAuthorityV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.ApproveCollectionPluginAuthorityV1;
    } & ParsedApproveCollectionPluginAuthorityV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RevokePluginAuthorityV1;
    } & ParsedRevokePluginAuthorityV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RevokeCollectionPluginAuthorityV1;
    } & ParsedRevokeCollectionPluginAuthorityV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.BurnV1;
    } & ParsedBurnV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.BurnCollectionV1;
    } & ParsedBurnCollectionV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.TransferV1;
    } & ParsedTransferV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdateV1;
    } & ParsedUpdateV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdateCollectionV1;
    } & ParsedUpdateCollectionV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.CompressV1;
    } & ParsedCompressV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.DecompressV1;
    } & ParsedDecompressV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.Collect;
    } & ParsedCollectInstruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.CreateV2;
    } & ParsedCreateV2Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.CreateCollectionV2;
    } & ParsedCreateCollectionV2Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.AddExternalPluginAdapterV1;
    } & ParsedAddExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.AddCollectionExternalPluginAdapterV1;
    } & ParsedAddCollectionExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RemoveExternalPluginAdapterV1;
    } & ParsedRemoveExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.RemoveCollectionExternalPluginAdapterV1;
    } & ParsedRemoveCollectionExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdateExternalPluginAdapterV1;
    } & ParsedUpdateExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.UpdateCollectionExternalPluginAdapterV1;
    } & ParsedUpdateCollectionExternalPluginAdapterV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.WriteExternalPluginAdapterDataV1;
    } & ParsedWriteExternalPluginAdapterDataV1Instruction<TProgram>)
  | ({
      instructionType: MplCoreProgramInstruction.WriteCollectionExternalPluginAdapterDataV1;
    } & ParsedWriteCollectionExternalPluginAdapterDataV1Instruction<TProgram>);
