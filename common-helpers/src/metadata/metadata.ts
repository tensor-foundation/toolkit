import { getMetadataDecoder } from './codecs/metadataDecoder';
import { Rpc, SolanaRpcApi, Address } from '@solana/web3.js';

// fetches ruleset given metadataPda
export async function getRulesetFromMetadataPda(
  rpc: Rpc<SolanaRpcApi>,
  metadataPda: Address
) {
  const decodedMetadataData = await fetchMetadata(rpc, metadataPda);
  return decodedMetadataData.programmableConfig?.ruleSet ?? undefined;
}

// fetches and deserializes data stored on given metadataPda into Metadata
export async function fetchMetadata(
  rpc: Rpc<SolanaRpcApi>,
  metadataPda: Address
): Promise<any> {
  const metadataData = await rpc
    .getAccountInfo(metadataPda, { encoding: 'base64' })
    .send()
    .then((result: any) => result.value.data[0]);
  const metadataDataBytes = Buffer.from(metadataData, 'base64');
  return getMetadataDecoder().decode(metadataDataBytes);
}
