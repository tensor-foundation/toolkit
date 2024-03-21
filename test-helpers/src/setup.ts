/* eslint-disable import/no-extraneous-dependencies */
import '@solana/webcrypto-ed25519-polyfill';

import {
  generateKeyPairSigner,
  signTransactionWithSigners,
  KeyPairSigner,
  createSignerFromKeyPair,
} from '@solana/signers';
import {
  Address,
  Commitment,
  CompilableTransaction,
  createPrivateKeyFromBytes,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransaction,
  getSignatureFromTransaction,
  ITransactionWithBlockhashLifetime,
  lamports,
  pipe,
  setTransactionFeePayer,
  setTransactionLifetimeUsingBlockhash,
} from '@solana/web3.js';

export type Client = {
  rpc: ReturnType<typeof createSolanaRpc>;
  rpcSubscriptions: ReturnType<typeof createSolanaRpcSubscriptions>;
};

export const createDefaultSolanaClient = (): Client => {
  const rpc = createSolanaRpc('http://127.0.0.1:8899');
  const rpcSubscriptions = createSolanaRpcSubscriptions('ws://127.0.0.1:8900');

  return { rpc, rpcSubscriptions };
};

export const createKeyPairSigner = async (
  bytes: Uint8Array
): Promise<KeyPairSigner<string>> => {
  const publicKeyBytes = bytes.slice(32);
  const privateKeyBytes = bytes.slice(0, 32);

  const [publicKey, privateKey] = await Promise.all([
    crypto.subtle.importKey('raw', publicKeyBytes, 'Ed25519', true, ['verify']),
    createPrivateKeyFromBytes(privateKeyBytes),
  ]);
  return createSignerFromKeyPair({ privateKey, publicKey });
};

export const generateKeyPairSignerWithSol = async (
  client: Client,
  putativeLamports: bigint = 1_000_000_000n
) => {
  //   const airdropRequester = createDefaultAirdropRequester(client);
  const signer = await generateKeyPairSigner();
  client.rpc.requestAirdrop(signer.address, lamports(putativeLamports), {
    commitment: 'confirmed',
  });
  return signer;
};

export const fundWalletWithSol = async (
  client: Client,
  address: Address,
  putativeLamports: bigint = 1_000_000_000n
) => {
  client.rpc.requestAirdrop(address, lamports(putativeLamports), {
    commitment: 'confirmed',
  });
};

export const createDefaultTransaction = async (
  client: Client,
  feePayer: Address
) => {
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  return pipe(
    createTransaction({ version: 0 }),
    (tx) => setTransactionFeePayer(feePayer, tx),
    (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx)
  );
};

export const signAndSendTransaction = async (
  client: Client,
  transaction: CompilableTransaction & ITransactionWithBlockhashLifetime,
  commitment: Commitment = 'confirmed'
) => {
  const signedTransaction = await signTransactionWithSigners(transaction);
  const signature = getSignatureFromTransaction(signedTransaction);
  client.rpc.sendAndConfirmTransaction(signedTransaction, { commitment });

  return signature;
};

export const getBalance = async (client: Client, address: Address) =>
  (await client.rpc.getBalance(address, { commitment: 'confirmed' }).send())
    .value;
