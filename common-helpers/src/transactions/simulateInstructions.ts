/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IInstruction,
  KeyPairSigner,
  Rpc,
  SolanaRpcApi,
  appendTransactionMessageInstruction,
  compileTransaction,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  pipe,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
} from '@solana/web3.js';

export async function simulateTxWithIxs(
  rpc: Rpc<SolanaRpcApi>,
  ixs: IInstruction[],
  signer: KeyPairSigner
): Promise<void> {
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
  const simulationResponse = await rpc
    .simulateTransaction(simPipe, {
      encoding: 'base64',
      sigVerify: false,
      replaceRecentBlockhash: true,
    })
    .send();
  console.log(simulationResponse);
}
