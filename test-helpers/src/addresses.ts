import {
  Address,
  ReadonlyUint8Array,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/web3.js';

export type NumberData = number[] | Uint8Array | Buffer;

export const toAddress = (data: NumberData): Address => {
  const decoder = getAddressDecoder();
  return decoder.decode(Uint8Array.from(data));
};

export const fromAddress = (address: Address): ReadonlyUint8Array => {
  const encoder = getAddressEncoder();
  return encoder.encode(address);
};
