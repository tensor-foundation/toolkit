import { AccountInfo, PublicKey } from '@solana/web3.js';
import {
  type EncodedAccount,
  type Address,
  lamports,
  Lamports,
} from '@solana/web3.js-next';

export function fromAccountInfoToEncodedAccount<
  TAddress extends string = string,
>(address: PublicKey, account: AccountInfo<Buffer>): EncodedAccount<TAddress> {
  return {
    address: address.toString() as Address<TAddress>,
    data: new Uint8Array(account.data),
    executable: account.executable,
    lamports: lamports(BigInt(account.lamports)),
    programAddress: account.owner.toString() as Address,
  };
}

export function fromEncodedAccountToAccountInfo<
  TAddress extends string = string,
>(account: EncodedAccount<TAddress>): AccountInfo<Buffer> {
  return {
    executable: account.executable,
    owner: new PublicKey(account.programAddress),
    lamports: lamportsToNumber(account.lamports),
    data: Buffer.from(account.data),
  };
}

function lamportsToNumber(lamportsValue: Lamports): number {
  const num = Number(lamportsValue);
  if (!Number.isSafeInteger(num)) {
    throw new Error('Lamports value too large to convert to number safely');
  }
  return num;
}
