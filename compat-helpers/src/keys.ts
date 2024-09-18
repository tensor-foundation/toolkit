import { fromLegacyKeypair } from '@solana/compat';
import { Keypair, PublicKey } from '@solana/web3.js';
import { createSignerFromKeyPair, KeyPairSigner, NoopSigner, address, createNoopSigner } from '@solana/web3.js-next';

export async function fromLegacyKeypairToKeyPairSigner(
  keypair: Keypair
): Promise<KeyPairSigner> {
  return await createSignerFromKeyPair(await fromLegacyKeypair(keypair));
}

export function fromPublicKeyToNoopSigner(publickey: PublicKey): NoopSigner {
  return createNoopSigner(address(publickey.toBase58()));
}