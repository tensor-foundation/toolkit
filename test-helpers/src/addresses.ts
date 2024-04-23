import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';

export type NumberData = number[] | Uint8Array | Buffer;

export const intoAddress = (data: NumberData): Address => {
  const decoder = getAddressDecoder();
  return decoder.decode(Uint8Array.from(data));
};

export const fromAddress = (address: Address): Uint8Array => {
  const encoder = getAddressEncoder();
  return encoder.encode(address);
};
