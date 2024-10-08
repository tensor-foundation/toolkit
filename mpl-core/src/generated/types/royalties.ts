/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getArrayDecoder,
  getArrayEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
} from '@solana/web3.js';
import {
  Creator,
  CreatorArgs,
  RuleSet,
  RuleSetArgs,
  getCreatorDecoder,
  getCreatorEncoder,
  getRuleSetDecoder,
  getRuleSetEncoder,
} from '.';

export type Royalties = {
  basisPoints: number;
  creators: Array<Creator>;
  ruleSet: RuleSet;
};

export type RoyaltiesArgs = {
  basisPoints: number;
  creators: Array<CreatorArgs>;
  ruleSet: RuleSetArgs;
};

export function getRoyaltiesEncoder(): Encoder<RoyaltiesArgs> {
  return getStructEncoder([
    ['basisPoints', getU16Encoder()],
    ['creators', getArrayEncoder(getCreatorEncoder())],
    ['ruleSet', getRuleSetEncoder()],
  ]);
}

export function getRoyaltiesDecoder(): Decoder<Royalties> {
  return getStructDecoder([
    ['basisPoints', getU16Decoder()],
    ['creators', getArrayDecoder(getCreatorDecoder())],
    ['ruleSet', getRuleSetDecoder()],
  ]);
}

export function getRoyaltiesCodec(): Codec<RoyaltiesArgs, Royalties> {
  return combineCodec(getRoyaltiesEncoder(), getRoyaltiesDecoder());
}
