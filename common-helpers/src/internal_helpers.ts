import {
    createDecoder,
    Decoder,
    isFixedSize,
    createEncoder,
    Encoder,
    getEncodedSize,
} from '@solana/codecs-core';

// yoinked from https://github.com/solana-labs/solana-web3.js/blob/master/packages/codecs-core/src/add-codec-size-prefix.ts
// (only available in experimental new release) 
// (we'll import these functions instead once we update to tp3 or higher)
export function addEncoderSizePrefix<TFrom>(encoder: Encoder<TFrom>, prefix: any): Encoder<TFrom> {
    const write = ((value, bytes, offset) => {
        // Here we exceptionally use the `encode` function instead of the `write`
        // function to contain the content of the encoder within its own bounds.
        const encoderBytes = encoder.encode(value);
        offset = prefix.write(encoderBytes.length, bytes, offset);
        bytes.set(encoderBytes, offset);
        return offset + encoderBytes.length;
    }) as Encoder<TFrom>['write'];

    if (isFixedSize(prefix) && isFixedSize(encoder)) {
        return createEncoder({ ...encoder, fixedSize: prefix.fixedSize + encoder.fixedSize, write });
    }

    const prefixMaxSize = isFixedSize(prefix) ? prefix.fixedSize : prefix.maxSize ?? null;
    const encoderMaxSize = isFixedSize(encoder) ? encoder.fixedSize : encoder.maxSize ?? null;
    const maxSize = prefixMaxSize !== null && encoderMaxSize !== null ? prefixMaxSize + encoderMaxSize : null;

    return createEncoder({
        ...encoder,
        ...(maxSize !== null ? { maxSize } : {}),
        getSizeFromValue: value => {
            const encoderSize = getEncodedSize(value, encoder);
            return getEncodedSize(encoderSize, prefix) + encoderSize;
        },
        write,
    })
}
export function addDecoderSizePrefix<TTo>(decoder: Decoder<TTo>, prefix: any): Decoder<TTo> {
    const read = ((bytes, offset) => {
        const [bigintSize, decoderOffset] = prefix.read(bytes, offset);
        const size = Number(bigintSize);
        offset = decoderOffset;
        // Slice the byte array to the contained size if necessary.
        if (offset > 0 || bytes.length > size) {
            bytes = bytes.slice(offset, offset + size);
        }
        // Here we exceptionally use the `decode` function instead of the `read`
        // function to contain the content of the decoder within its own bounds.
        return [decoder.decode(bytes), offset + size];
    }) as Decoder<TTo>['read'];

    if (isFixedSize(prefix) && isFixedSize(decoder)) {
        return createDecoder({ ...decoder, fixedSize: prefix.fixedSize + decoder.fixedSize, read });
    }

    const prefixMaxSize = isFixedSize(prefix) ? prefix.fixedSize : prefix.maxSize ?? null;
    const decoderMaxSize = isFixedSize(decoder) ? decoder.fixedSize : decoder.maxSize ?? null;
    const maxSize = prefixMaxSize !== null && decoderMaxSize !== null ? prefixMaxSize + decoderMaxSize : null;
    return createDecoder({ ...decoder, ...(maxSize !== null ? { maxSize } : {}), read });
}