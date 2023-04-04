import { fetchAndDecode } from '../../utils/fetch-and-decode';
import * as t from 'io-ts';

// Types ========

const CoinOutput = t.type({
  id: t.string,
  symbol: t.string,
  name: t.string,
  tickers: t.array(
    t.type({
      base: t.string,
      target: t.string,
      coin_id: t.string,
      target_coin_id: t.union([t.string, t.undefined]),
    })
  ),
});

// Service =========================
export const fetchCoin = (id: string) => fetchAndDecode(`https://api.coingecko.com/api/v3/coins/${id}`)(CoinOutput);
