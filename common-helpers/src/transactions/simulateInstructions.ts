import {
  GetLatestBlockhashApi,
  IInstruction,
  KeyPairSigner,
  Rpc,
  SendTransactionApi,
  Signature,
  SimulateTransactionApi,
  appendTransactionMessageInstruction,
  compileTransaction,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  pipe,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransaction,
} from '@solana/web3.js';

export async function simulateTxWithIxs(
  rpc: Rpc<SimulateTransactionApi & GetLatestBlockhashApi>,
  ixs: IInstruction[],
  signer: KeyPairSigner
): Promise<ReturnType<SimulateTransactionApi['simulateTransaction']>> {
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const simPipe = pipe(
    createTransactionMessage({ version: 0 }),
    // maps each instruction to an lambda expression that looks like: (tx) => appendTransactionInstruction(instruction, tx),
    ...(ixs.map(
      (ix) => (tx: any) => appendTransactionMessageInstruction(ix, tx)
    ) as []),
    (tx) => setTransactionMessageFeePayer(signer.address, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => compileTransaction(tx),
    (tx) => getBase64EncodedWireTransaction(tx)
  );
  return await rpc
    .simulateTransaction(simPipe, {
      encoding: 'base64',
      sigVerify: false,
      replaceRecentBlockhash: true,
    })
    .send();
}

export async function sendTxWithIxs(
  rpc: Rpc<SendTransactionApi & GetLatestBlockhashApi>,
  ixs: IInstruction[],
  signer: KeyPairSigner
): Promise<Signature> {
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  const txBytes = await pipe(
    createTransactionMessage({ version: 0 }),
    // maps each instruction to an lambda expression that looks like: (tx) => appendTransactionInstruction(instruction, tx),
    ...(ixs.map(
      (ix) => (tx: any) => appendTransactionMessageInstruction(ix, tx)
    ) as []),
    (tx) => setTransactionMessageFeePayer(signer.address, tx),
    (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
    (tx) => compileTransaction(tx),
    async (tx) =>
      await signTransaction([signer.keyPair], tx).then((tx) =>
        getBase64EncodedWireTransaction(tx)
      )
  );

  return await rpc
    .sendTransaction(txBytes, {
      encoding: 'base64',
    })
    .send();
}
