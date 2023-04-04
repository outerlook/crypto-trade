import * as t from 'io-ts';
import {pipe} from 'fp-ts/function';
import {fetchAndDecode} from "../../utils/fetch-and-decode";

// Types =======================================================
// export interface All {
//   name:      string;
//   logoURI:   string;
//   keywords:  string[];
//   timestamp: Date;
//   tokens:    Token[];
//   version:   Version;
// }
// export interface Token {
//   chainId:  number;
//   address:  string;
//   name:     string;
//   symbol:   string;
//   decimals: number;
//   logoURI?: string;
// }

// export interface Version {
//   major: number;
//   minor: number;
//   patch: number;
// }

const Token = t.type({
  chainId: t.number,
  address: t.string,
  name: t.string,
  symbol: t.string,
  decimals: t.number,
  logoURI: t.union([t.string, t.undefined]),
});

export type Token = t.TypeOf<typeof Token>;

const Version = t.type({
  major: t.number,
  minor: t.number,
  patch: t.number,
});

const Output = t.type({
  name: t.string,
  logoURI: t.string,
  keywords: t.array(t.string),
  timestamp: t.string,
  tokens: t.array(Token),
  version: Version,
});

// Service =======================================================
export const fetchAllTokens = (id: string) =>
  pipe(Output, fetchAndDecode(`https://tokens.coingecko.com/${id}/all.json`));

