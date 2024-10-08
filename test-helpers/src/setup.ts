import '@solana/webcrypto-ed25519-polyfill';

import {
  Address,
  Commitment,
  CompilableTransactionMessage,
  KeyPairSigner,
  Rpc,
  RpcSubscriptions,
  SolanaRpcApi,
  SolanaRpcSubscriptionsApi,
  TransactionMessageWithBlockhashLifetime,
  TransactionSigner,
  airdropFactory,
  createPrivateKeyFromBytes,
  createSignerFromKeyPair,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  generateKeyPairSigner,
  getSignatureFromTransaction,
  lamports,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from '@solana/web3.js';

export const tokenSetup = async () => {
  const client = createDefaultSolanaClient();
  const [payer, authority, owner] = await Promise.all([
    generateKeyPairSignerWithSol(client),
    generateKeyPairSignerWithSol(client),
    generateKeyPairSignerWithSol(client),
  ]);
  return { client, payer, authority, owner };
};

export type Client = {
  rpc: Rpc<SolanaRpcApi>;
  rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
};

export const createDefaultSolanaClient = (rpcUrl?: string): Client => {
  const rpc = createSolanaRpc(rpcUrl ?? 'http://127.0.0.1:8899');
  const wssUrl = rpcUrl ? rpcUrl.replace('http', 'ws') : 'ws://127.0.0.1:8900';
  const rpcSubscriptions = createSolanaRpcSubscriptions(wssUrl);

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
  return await createSignerFromKeyPair({ privateKey, publicKey });
};

export const generateKeyPairSignerWithSol = async (
  client: Client,
  putativeLamports: bigint = 1_000_000_000n
) => {
  const signer = await generateKeyPairSigner();
  await airdropFactory(client)({
    recipientAddress: signer.address,
    lamports: lamports(putativeLamports),
    commitment: 'confirmed',
  });
  return signer;
};

export const fundWalletWithSol = async (
  client: Client,
  address: Address,
  putativeLamports: bigint = 1_000_000_000n
): Promise<void> => {
  await client.rpc
    .requestAirdrop(address, lamports(putativeLamports), {
      commitment: 'confirmed',
    })
    .send();
};

export const createDefaultTransaction = async (
  client: Client,
  feePayer: TransactionSigner
) => {
  const { value: latestBlockhash } = await client.rpc
    .getLatestBlockhash()
    .send();
  return pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(feePayer, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx)
  );
};

export interface TransactionOptions {
  commitment?: Commitment;
  skipPreflight?: boolean;
}

export const signAndSendTransaction = async (
  client: Client,
  transaction: CompilableTransactionMessage &
    TransactionMessageWithBlockhashLifetime,
  options?: TransactionOptions
) => {
  const signedTransaction =
    await signTransactionMessageWithSigners(transaction);
  const signature = getSignatureFromTransaction(signedTransaction);
  await sendAndConfirmTransactionFactory(client)(signedTransaction, {
    commitment: 'confirmed',
    skipPreflight: false,
    ...options,
  });
  return signature;
};

export const getBalance = async (client: Client, address: Address) =>
  (await client.rpc.getBalance(address, { commitment: 'confirmed' }).send())
    .value;
