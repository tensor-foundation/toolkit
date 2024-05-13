import { IInstruction } from "@solana/instructions";
import { pipe } from "@solana/functional";
import { KeyPairSigner, Rpc, SolanaRpcApi } from "@solana/web3.js";
import {
    createTransaction,
    setTransactionFeePayer,
    appendTransactionInstruction,
    getBase64EncodedWireTransaction,
    setTransactionLifetimeUsingBlockhash,
} from "@solana/transactions";

export async function simulateTxWithIxs(rpc: Rpc<SolanaRpcApi>, ixs: IInstruction[], signer: KeyPairSigner): Promise<void> {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const simPipe = pipe(
        createTransaction({ version: 0 }),
        // maps each instruction to an lambda expression that looks like: (tx) => appendTransactionInstruction(instruction, tx),
        ...(ixs.map((ix) => ((tx: any) => appendTransactionInstruction(ix, tx))) as []),
        (tx) => setTransactionFeePayer(signer.address, tx),
        (tx) => setTransactionLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => getBase64EncodedWireTransaction(tx)
    );
    const simulationResponse = await rpc.simulateTransaction(simPipe, { encoding: 'base64', sigVerify: false, replaceRecentBlockhash: true }).send();
    console.log(simulationResponse);
}