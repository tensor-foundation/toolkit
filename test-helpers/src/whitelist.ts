import { v4 } from 'uuid';

export const generateUuid = () => uuidToUint8Array(v4());

export const uuidToUint8Array = (uuid: string) => {
  const encoder = new TextEncoder();
  // replace any '-' to handle uuids
  return encoder.encode(uuid.replaceAll('-', ''));
};

export const nameToUint8Array = (name: string) => {
  const encoder = new TextEncoder();
  const encodedName = encoder.encode(name);
  const paddedName = new Uint8Array(32);
  paddedName.set(encodedName);
  return paddedName;
};
