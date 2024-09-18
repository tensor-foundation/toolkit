import { fromLegacyKeypair } from '@solana/compat';
import { Keypair, PublicKey } from '@solana/web3.js';
import { createSignerFromKeyPair, KeyPairSigner, NoopSigner, address } from '@solana/web3.js-next';

export async function fromLegacyKeypairToKeyPairSigner(
  keypair: Keypair
): Promise<KeyPairSigner> {
  return await createSignerFromKeyPair(await fromLegacyKeypair(keypair));
}

export function fromPublicKeyToNoopSigner(publickey: PublicKey): NoopSigner {
  const out: NoopSigner = {
      address: address(publickey.toBase58()),
      signMessages: messages => Promise.resolve(messages.map(() => Object.freeze({}))),
      signTransactions: transactions => Promise.resolve(transactions.map(() => Object.freeze({}))),
  };
  return Object.freeze(out);
}