import { DAS } from 'helius-sdk';

export async function retrieveProofFields(
  helius_url: string,
  mint: string
): Promise<DAS.GetAssetProofResponse> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: '0',
      method: 'getAssetProof',
      params: {
        id: mint,
      },
    }),
  };

  try {
    const response = await fetch(helius_url, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.result;
  } catch (error: any) {
    throw new Error('Error fetching data: ' + error.message);
  }
}

export async function retrieveAssetFields(
  helius_url: string,
  mint: string
): Promise<DAS.GetAssetResponse> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: '0',
      method: 'getAsset',
      params: {
        id: mint,
        displayOptions: {
          showRawData: true,
        },
      },
    }),
  };

  try {
    const response = await fetch(helius_url, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.result;
  } catch (error: any) {
    throw new Error('Error fetching data: ' + (error.message || error));
  }
}
