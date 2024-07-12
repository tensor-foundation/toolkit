/* eslint-disable @typescript-eslint/no-unused-vars */
import { Address } from '@solana/web3.js';
import { MarketHeader, MarketSizeParams } from '../generated';

export const MIN_MARKET_SIZE_PARAMS: MarketSizeParams = {
  bidsSize: 512n,
  asksSize: 512n,
  numSeats: 128n,
};
export const MIN_MARKET_SIZE = 84368n;
export const MARKET_HEADER_SIZE = 576n;

export type OrderId = {
  priceInTicks: bigint;
  orderSeqNum: bigint;
};

export type RestingOrder = {
  traderIndex: bigint;
  numBaseLots: bigint;
  lastValidSlot: bigint;
  lastValidUnixTimestampInSeconds: bigint;
};

export type TraderState = {
  quoteLotsLocked: bigint;
  quoteLotsFree: bigint;
  baseLotsLocked: bigint;
  baseLotsFree: bigint;
  padding: bigint[]; // size: 8
};

export interface MarketData {
  // The raw MarketHeader from the market account
  header: MarketHeader;

  // The number of base lots per base unit
  baseLotsPerBaseUnit: number;

  // Tick size of the market, in quote lots per base unit
  // Note that the header contains tick size in quote atoms per base unit
  quoteLotsPerBaseUnitPerTick: number;

  // The next order sequence number of the market
  orderSequenceNumber: number;

  // Taker fee in basis points
  takerFeeBps: number;

  // Total fees collected by the market and claimed by fee recipient, in quote lots
  collectedQuoteLotFees: number;

  // Total unclaimed fees in the market, in quote lots
  unclaimedQuoteLotFees: number;

  // The bids on the market, sorted from highest to lowest price
  bids: Array<[OrderId, RestingOrder]>;

  // The asks on the market, sorted from lowest to highest price
  asks: Array<[OrderId, RestingOrder]>;

  // Map from trader pubkey to trader state
  traders: Map<string, TraderState>;

  // Map from trader pubkey to trader index
  traderPubkeyToTraderIndex: Map<string, number>;

  // Map from trader index to trader pubkey
  traderIndexToTraderPubkey: Map<number, string>;
}

export class MarketState {
  address: Address;
  data: MarketData;

  constructor(address: Address, data: MarketData) {
    this.address = address;
    this.data = data;
  }

  // static load(address: Address, buffer: Buffer): Promise<MarketState> {
  //   const marketData = deserializeMarketData(buffer);
  //   return new MarketState(address, data.value);
  // }
}

// Below is partially converted from beet and old web3.js
// /**
//  * Deserializes market data from a given buffer and returns a `MarketData` object
//  *
//  * @param data The data buffer to deserialize
//  */
// export function deserializeMarketData(data: Buffer): MarketData {
//   // Deserialize the market header
//   let offset = Number(MARKET_HEADER_SIZE);
//   const header = getMarketHeaderDecoder().decode(data.subarray(0, offset));

//   // Parse market data
//   const paddingLen = 8 * 32;
//   let remaining = data.subarray(offset + paddingLen);
//   offset = 0;
//   const baseLotsPerBaseUnit = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   const quoteLotsPerBaseUnitPerTick = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   const sequenceNumber = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   const takerFeeBps = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   const collectedQuoteLotFees = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   const unclaimedQuoteLotFees = Number(remaining.readBigUInt64LE(offset));
//   offset += 8;
//   remaining = remaining.subarray(offset);

//   // Parse bids, asks and traders
//   const numBids = header.marketSizeParams.bidsSize;
//   const numAsks = header.marketSizeParams.asksSize;
//   const numTraders = header.marketSizeParams.numSeats;

//   const bidsSize =
//     16 + 16 + (16 + orderIdBeet.byteSize + restingOrderBeet.byteSize) * numBids;
//   const asksSize =
//     16 + 16 + (16 + orderIdBeet.byteSize + restingOrderBeet.byteSize) * numAsks;
//   const tradersSize =
//     16 + 16 + (16 + 32 + traderStateBeet.byteSize) * numTraders;
//   offset = 0;

//   const bidBuffer = remaining.subarray(offset, offset + bidsSize);
//   offset += bidsSize;
//   const askBuffer = remaining.subarray(offset, offset + asksSize);
//   offset += asksSize;
//   const traderBuffer = remaining.subarray(offset, offset + tradersSize);

//   const bidsUnsorted = deserializeRedBlackTree(
//     bidBuffer,
//     orderIdBeet,
//     restingOrderBeet
//   );

//   const asksUnsorted = deserializeRedBlackTree(
//     askBuffer,
//     orderIdBeet,
//     restingOrderBeet
//   );

//   // Sort bids in descending order of price, and ascending order of sequence number
//   const bids = [...bidsUnsorted].sort((a, b) => {
//     const priceComparison = sign(
//       toBN(b[0].priceInTicks).sub(toBN(a[0].priceInTicks))
//     );
//     if (priceComparison !== 0) {
//       return priceComparison;
//     }
//     return sign(
//       getUiOrderSequenceNumber(a[0]).sub(getUiOrderSequenceNumber(b[0]))
//     );
//   });

//   // Sort asks in ascending order of price, and ascending order of sequence number
//   const asks = [...asksUnsorted].sort((a, b) => {
//     const priceComparison = sign(
//       toBN(a[0].priceInTicks).sub(toBN(b[0].priceInTicks))
//     );
//     if (priceComparison !== 0) {
//       return priceComparison;
//     }
//     return sign(
//       getUiOrderSequenceNumber(a[0]).sub(getUiOrderSequenceNumber(b[0]))
//     );
//   });

//   const traders = new Map<string, TraderState>();
//   for (const [k, traderState] of deserializeRedBlackTree(
//     traderBuffer,
//     publicKeyBeet,
//     traderStateBeet
//   )) {
//     traders.set(k.publicKey.toString(), traderState);
//   }

//   const traderPubkeyToTraderIndex = new Map<string, number>();
//   const traderIndexToTraderPubkey = new Map<number, string>();
//   for (const [k, index] of getNodeIndices(
//     traderBuffer,
//     publicKeyBeet,
//     traderStateBeet
//   )) {
//     traderPubkeyToTraderIndex.set(k.publicKey.toString(), index);
//     traderIndexToTraderPubkey.set(index, k.publicKey.toString());
//   }

//   return {
//     header,
//     baseLotsPerBaseUnit,
//     quoteLotsPerBaseUnitPerTick,
//     orderSequenceNumber: sequenceNumber,
//     takerFeeBps,
//     collectedQuoteLotFees,
//     unclaimedQuoteLotFees,
//     bids,
//     asks,
//     traders,
//     traderPubkeyToTraderIndex,
//     traderIndexToTraderPubkey,
//   };
// }
