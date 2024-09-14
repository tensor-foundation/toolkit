import { Address } from '@solana/web3.js';
import { Client } from '@tensor-foundation/test-helpers';
import {
  getAssetV1Decoder,
  getCollectionV1Decoder,
  getPluginDecoder,
  getPluginHeaderV1Decoder,
  getPluginRegistryV1Decoder,
  Plugin,
  PluginType,
} from '../generated';

const BASE_ASSET_SIZE = 75;
const BASE_COLLECTION_SIZE = 49;

export async function fetchAssetPlugin(
  client: Client,
  address: Address,
  pluginType: PluginType
): Promise<Plugin | null> {
  const data = (
    await client.rpc.getAccountInfo(address, { encoding: 'base64' }).send()
  ).value!.data;
  const buffer = new Uint8Array(Buffer.from(String(data), 'base64'));

  const asset = getAssetV1Decoder().decode(buffer);
  const assetSize = BASE_ASSET_SIZE + asset.name.length + asset.uri.length;

  const header = getPluginHeaderV1Decoder().decode(buffer.subarray(assetSize));
  const pluginRegistry = getPluginRegistryV1Decoder().decode(
    buffer.subarray(Number(header.pluginRegistryOffset))
  );

  const pluginRecord = pluginRegistry.registry.find(
    (plugin) => plugin.pluginType === pluginType
  );
  if (!pluginRecord) {
    return null;
  }
  const plugin = getPluginDecoder().decode(
    buffer,
    Number(pluginRecord!.offset)
  );

  return plugin;
}

export async function fetchCollectionPlugin(
  client: Client,
  address: Address,
  pluginType: PluginType
): Promise<Plugin | null> {
  const data = (
    await client.rpc.getAccountInfo(address, { encoding: 'base64' }).send()
  ).value!.data;
  const buffer = new Uint8Array(Buffer.from(String(data), 'base64'));

  const collection = getCollectionV1Decoder().decode(buffer);
  const collectionSize =
    BASE_COLLECTION_SIZE + collection.name.length + collection.uri.length;

  const header = getPluginHeaderV1Decoder().decode(
    buffer.subarray(collectionSize)
  );
  const pluginRegistry = getPluginRegistryV1Decoder().decode(
    buffer.subarray(Number(header.pluginRegistryOffset))
  );

  const pluginRecord = pluginRegistry.registry.find(
    (plugin) => plugin.pluginType === pluginType
  );
  if (!pluginRecord) {
    return null;
  }
  const plugin = getPluginDecoder().decode(
    buffer,
    Number(pluginRecord!.offset)
  );

  return plugin;
}
