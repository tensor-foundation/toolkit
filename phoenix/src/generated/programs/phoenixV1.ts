/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import { Address, containsBytes, getU8Encoder } from '@solana/web3.js';
import {
  ParsedCancelAllOrdersInstruction,
  ParsedCancelAllOrdersWithFreeFundsInstruction,
  ParsedCancelMultipleOrdersByIdInstruction,
  ParsedCancelMultipleOrdersByIdWithFreeFundsInstruction,
  ParsedCancelUpToInstruction,
  ParsedCancelUpToWithFreeFundsInstruction,
  ParsedChangeFeeRecipientInstruction,
  ParsedChangeMarketStatusInstruction,
  ParsedChangeSeatStatusInstruction,
  ParsedClaimAuthorityInstruction,
  ParsedCollectFeesInstruction,
  ParsedDepositFundsInstruction,
  ParsedEvictSeatInstruction,
  ParsedForceCancelOrdersInstruction,
  ParsedInitializeMarketInstruction,
  ParsedLogInstruction,
  ParsedNameSuccessorInstruction,
  ParsedPlaceLimitOrderInstruction,
  ParsedPlaceLimitOrderWithFreeFundsInstruction,
  ParsedPlaceMultiplePostOnlyOrdersInstruction,
  ParsedPlaceMultiplePostOnlyOrdersWithFreeFundsInstruction,
  ParsedReduceOrderInstruction,
  ParsedReduceOrderWithFreeFundsInstruction,
  ParsedRequestSeatAuthorizedInstruction,
  ParsedRequestSeatInstruction,
  ParsedSwapInstruction,
  ParsedSwapWithFreeFundsInstruction,
  ParsedWithdrawFundsInstruction,
} from '../instructions';

export const PHOENIX_V1_PROGRAM_ADDRESS =
  'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY' as Address<'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY'>;

export enum PhoenixV1Instruction {
  Swap,
  SwapWithFreeFunds,
  PlaceLimitOrder,
  PlaceLimitOrderWithFreeFunds,
  ReduceOrder,
  ReduceOrderWithFreeFunds,
  CancelAllOrders,
  CancelAllOrdersWithFreeFunds,
  CancelUpTo,
  CancelUpToWithFreeFunds,
  CancelMultipleOrdersById,
  CancelMultipleOrdersByIdWithFreeFunds,
  WithdrawFunds,
  DepositFunds,
  RequestSeat,
  Log,
  PlaceMultiplePostOnlyOrders,
  PlaceMultiplePostOnlyOrdersWithFreeFunds,
  InitializeMarket,
  ClaimAuthority,
  NameSuccessor,
  ChangeMarketStatus,
  ChangeSeatStatus,
  RequestSeatAuthorized,
  EvictSeat,
  ForceCancelOrders,
  CollectFees,
  ChangeFeeRecipient,
}

export function identifyPhoenixV1Instruction(
  instruction: { data: Uint8Array } | Uint8Array
): PhoenixV1Instruction {
  const data =
    instruction instanceof Uint8Array ? instruction : instruction.data;
  if (containsBytes(data, getU8Encoder().encode(0), 0)) {
    return PhoenixV1Instruction.Swap;
  }
  if (containsBytes(data, getU8Encoder().encode(1), 0)) {
    return PhoenixV1Instruction.SwapWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(2), 0)) {
    return PhoenixV1Instruction.PlaceLimitOrder;
  }
  if (containsBytes(data, getU8Encoder().encode(3), 0)) {
    return PhoenixV1Instruction.PlaceLimitOrderWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(4), 0)) {
    return PhoenixV1Instruction.ReduceOrder;
  }
  if (containsBytes(data, getU8Encoder().encode(5), 0)) {
    return PhoenixV1Instruction.ReduceOrderWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(6), 0)) {
    return PhoenixV1Instruction.CancelAllOrders;
  }
  if (containsBytes(data, getU8Encoder().encode(7), 0)) {
    return PhoenixV1Instruction.CancelAllOrdersWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(8), 0)) {
    return PhoenixV1Instruction.CancelUpTo;
  }
  if (containsBytes(data, getU8Encoder().encode(9), 0)) {
    return PhoenixV1Instruction.CancelUpToWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(10), 0)) {
    return PhoenixV1Instruction.CancelMultipleOrdersById;
  }
  if (containsBytes(data, getU8Encoder().encode(11), 0)) {
    return PhoenixV1Instruction.CancelMultipleOrdersByIdWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(12), 0)) {
    return PhoenixV1Instruction.WithdrawFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(13), 0)) {
    return PhoenixV1Instruction.DepositFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(14), 0)) {
    return PhoenixV1Instruction.RequestSeat;
  }
  if (containsBytes(data, getU8Encoder().encode(15), 0)) {
    return PhoenixV1Instruction.Log;
  }
  if (containsBytes(data, getU8Encoder().encode(16), 0)) {
    return PhoenixV1Instruction.PlaceMultiplePostOnlyOrders;
  }
  if (containsBytes(data, getU8Encoder().encode(17), 0)) {
    return PhoenixV1Instruction.PlaceMultiplePostOnlyOrdersWithFreeFunds;
  }
  if (containsBytes(data, getU8Encoder().encode(100), 0)) {
    return PhoenixV1Instruction.InitializeMarket;
  }
  if (containsBytes(data, getU8Encoder().encode(101), 0)) {
    return PhoenixV1Instruction.ClaimAuthority;
  }
  if (containsBytes(data, getU8Encoder().encode(102), 0)) {
    return PhoenixV1Instruction.NameSuccessor;
  }
  if (containsBytes(data, getU8Encoder().encode(103), 0)) {
    return PhoenixV1Instruction.ChangeMarketStatus;
  }
  if (containsBytes(data, getU8Encoder().encode(104), 0)) {
    return PhoenixV1Instruction.ChangeSeatStatus;
  }
  if (containsBytes(data, getU8Encoder().encode(105), 0)) {
    return PhoenixV1Instruction.RequestSeatAuthorized;
  }
  if (containsBytes(data, getU8Encoder().encode(106), 0)) {
    return PhoenixV1Instruction.EvictSeat;
  }
  if (containsBytes(data, getU8Encoder().encode(107), 0)) {
    return PhoenixV1Instruction.ForceCancelOrders;
  }
  if (containsBytes(data, getU8Encoder().encode(108), 0)) {
    return PhoenixV1Instruction.CollectFees;
  }
  if (containsBytes(data, getU8Encoder().encode(109), 0)) {
    return PhoenixV1Instruction.ChangeFeeRecipient;
  }
  throw new Error(
    'The provided instruction could not be identified as a phoenixV1 instruction.'
  );
}

export type ParsedPhoenixV1Instruction<
  TProgram extends string = 'PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY',
> =
  | ({
      instructionType: PhoenixV1Instruction.Swap;
    } & ParsedSwapInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.SwapWithFreeFunds;
    } & ParsedSwapWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.PlaceLimitOrder;
    } & ParsedPlaceLimitOrderInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.PlaceLimitOrderWithFreeFunds;
    } & ParsedPlaceLimitOrderWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ReduceOrder;
    } & ParsedReduceOrderInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ReduceOrderWithFreeFunds;
    } & ParsedReduceOrderWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelAllOrders;
    } & ParsedCancelAllOrdersInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelAllOrdersWithFreeFunds;
    } & ParsedCancelAllOrdersWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelUpTo;
    } & ParsedCancelUpToInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelUpToWithFreeFunds;
    } & ParsedCancelUpToWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelMultipleOrdersById;
    } & ParsedCancelMultipleOrdersByIdInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CancelMultipleOrdersByIdWithFreeFunds;
    } & ParsedCancelMultipleOrdersByIdWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.WithdrawFunds;
    } & ParsedWithdrawFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.DepositFunds;
    } & ParsedDepositFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.RequestSeat;
    } & ParsedRequestSeatInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.Log;
    } & ParsedLogInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.PlaceMultiplePostOnlyOrders;
    } & ParsedPlaceMultiplePostOnlyOrdersInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.PlaceMultiplePostOnlyOrdersWithFreeFunds;
    } & ParsedPlaceMultiplePostOnlyOrdersWithFreeFundsInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.InitializeMarket;
    } & ParsedInitializeMarketInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ClaimAuthority;
    } & ParsedClaimAuthorityInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.NameSuccessor;
    } & ParsedNameSuccessorInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ChangeMarketStatus;
    } & ParsedChangeMarketStatusInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ChangeSeatStatus;
    } & ParsedChangeSeatStatusInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.RequestSeatAuthorized;
    } & ParsedRequestSeatAuthorizedInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.EvictSeat;
    } & ParsedEvictSeatInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ForceCancelOrders;
    } & ParsedForceCancelOrdersInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.CollectFees;
    } & ParsedCollectFeesInstruction<TProgram>)
  | ({
      instructionType: PhoenixV1Instruction.ChangeFeeRecipient;
    } & ParsedChangeFeeRecipientInstruction<TProgram>);
