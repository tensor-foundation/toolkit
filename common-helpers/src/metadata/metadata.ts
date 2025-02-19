import {
  Address,
  GetAccountInfoApi,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  Rpc,
} from '@solana/web3.js';
import { getMetadataDecoder, Metadata } from './codecs/metadataDecoder';
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '../constants';

// fetches ruleset given metadataPda
export async function getRulesetFromMetadataPda(
  rpc: Rpc<GetAccountInfoApi>,
  metadataPda: Address
) {
  const decodedMetadataData = await fetchMetadata(rpc, metadataPda);
  return decodedMetadataData.programmableConfig?.ruleSet ?? undefined;
}

// fetches and deserializes data stored on given metadataPda into Metadata
export async function fetchMetadata(
  rpc: Rpc<GetAccountInfoApi>,
  metadataPda: Address
): Promise<any> {
  const metadataData = await rpc
    .getAccountInfo(metadataPda, { encoding: 'base64' })
    .send()
    .then((result: any) => result.value.data[0]);
  const metadataDataBytes = Buffer.from(metadataData, 'base64');
  return getMetadataDecoder().decode(metadataDataBytes);
}

export type PrepPnftMetadataResult = {
  metadataPda: Address;
  metadata: Metadata;
  ruleset: Address | undefined;
};

// fetches metadata and ruleset for a given mint
export async function prepPnftMetadata(
  rpc: Rpc<GetAccountInfoApi>,
  mint: Address
) {
  const [metadataPda] = await findMetadataPda(mint);
  const metadata: Metadata = await fetchMetadata(rpc, metadataPda);
  const ruleset = metadata.programmableConfig?.ruleSet ?? undefined;
  return { metadataPda, metadata, ruleset };
}

export async function findMetadataPda(
  mint: Address,
  programId: Address = MPL_TOKEN_METADATA_PROGRAM_ID
) {
  return await getProgramDerivedAddress({
    programAddress: programId,
    seeds: [
      getUtf8Encoder().encode('metadata'),
      getAddressEncoder().encode(programId),
      getAddressEncoder().encode(mint),
    ],
  });
}
