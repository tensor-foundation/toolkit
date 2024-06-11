import {
  RpcTransport,
  createRpc,
  createSolanaRpcApi,
  Commitment,
} from '@solana/web3.js-next';
import {
  safeCaptureStackTrace,
  SOLANA_ERROR__RPC__INTEGER_OVERFLOW,
  SolanaError,
} from '@solana/web3.js-next';
import type { KeyPath } from '@solana/rpc-transformers';
import { createRpcMessage } from '@solana/rpc-spec-types';
import { Connection } from '@solana/web3.js';
import RpcClient from 'jayson/lib/client/browser';
import { RequestParamsLike } from 'jayson';

export function fromConnectionToRpc(connection: Connection) {
  const connectionTransport = (connection as any)._rpcClient as RpcClient;
  const connectionCommitment = (connection as any)._commitment as
    | Commitment
    | undefined;
  const transport: RpcTransport = async ({ payload }) =>
    await new Promise((resolve, reject) => {
      const { method, params } = payload as ReturnType<typeof createRpcMessage>;
      connectionTransport.request(
        method,
        params as RequestParamsLike,
        (err: any, result: any) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  return createRpc({
    api: createSolanaRpcApi({
      ...DEFAULT_RPC_CONFIG,
      defaultCommitment: connectionCommitment,
    }),
    transport,
  });
}
// not exported by @solana/web3.js-next, so copied over from:
// https://github.com/solana-labs/solana-web3.js/blob/843e2fe231410e2d555ac10a360c7d7b6a9bbc91/packages/rpc/src/rpc-integer-overflow-error.ts
// https://github.com/solana-labs/solana-web3.js/blob/843e2fe231410e2d555ac10a360c7d7b6a9bbc91/packages/rpc/src/rpc-default-config.ts
function createSolanaJsonRpcIntegerOverflowError(
  methodName: string,
  keyPath: KeyPath,
  value: bigint
): SolanaError<typeof SOLANA_ERROR__RPC__INTEGER_OVERFLOW> {
  let argumentLabel = '';
  if (typeof keyPath[0] === 'number') {
    const argPosition = keyPath[0] + 1;
    const lastDigit = argPosition % 10;
    const lastTwoDigits = argPosition % 100;
    if (lastDigit == 1 && lastTwoDigits != 11) {
      argumentLabel = argPosition + 'st';
    } else if (lastDigit == 2 && lastTwoDigits != 12) {
      argumentLabel = argPosition + 'nd';
    } else if (lastDigit == 3 && lastTwoDigits != 13) {
      argumentLabel = argPosition + 'rd';
    } else {
      argumentLabel = argPosition + 'th';
    }
  } else {
    argumentLabel = `\`${keyPath[0].toString()}\``;
  }
  const path =
    keyPath.length > 1
      ? keyPath
          .slice(1)
          .map((pathPart) =>
            typeof pathPart === 'number' ? `[${pathPart}]` : pathPart
          )
          .join('.')
      : undefined;
  const error = new SolanaError(SOLANA_ERROR__RPC__INTEGER_OVERFLOW, {
    argumentLabel,
    keyPath: keyPath as readonly (number | string | symbol)[],
    methodName,
    optionalPathLabel: path ? ` at path \`${path}\`` : '',
    value,
    ...(path !== undefined ? { path } : undefined),
  });
  safeCaptureStackTrace(error, createSolanaJsonRpcIntegerOverflowError);
  return error;
}
const DEFAULT_RPC_CONFIG: Partial<Parameters<typeof createSolanaRpcApi>[0]> = {
  defaultCommitment: 'confirmed',
  onIntegerOverflow(methodName, keyPath, value) {
    throw createSolanaJsonRpcIntegerOverflowError(methodName, keyPath, value);
  },
};
