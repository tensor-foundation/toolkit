import { fromLegacyKeypair } from '@solana/compat';
import { Keypair } from '@solana/web3.js';
import { createSignerFromKeyPair, KeyPairSigner } from '@solana/web3.js-next';

export async function fromLegacyKeypairToKeyPairSigner(
  keypair: Keypair
): Promise<KeyPairSigner> {
  return await createSignerFromKeyPair(await fromLegacyKeypair(keypair));
}
