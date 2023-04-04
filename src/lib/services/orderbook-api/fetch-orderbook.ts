import {flow} from 'fp-ts/function';
import * as t from 'io-ts';
import {OrderbookRecord} from './orderbook-types';
import {fetchAndDecode} from '../../utils/fetch-and-decode';

// Types ===================================================
const FetchOrderbookInput = t.type({
  baseToken: t.string,
  quoteToken: t.string,
});

type FetchOrderbookInput = t.TypeOf<typeof FetchOrderbookInput>;

const Pagination = <T>(type: t.Type<T>) =>
  t.type({
    total: t.number,
    page: t.number,
    perPage: t.number,
    records: t.array(type),
  });

const FetchOrderbookOutput = t.type({
  asks: Pagination(OrderbookRecord),
  bids: Pagination(OrderbookRecord),
});

// Service =================================================

/**
 * method: GET /orderbook/v1/
 * query params: baseToken, quoteToken
 * @param input
 */
export const fetchOrderbook = flow(
  FetchOrderbookInput.encode,
  (query) => new URLSearchParams(query),
  (params) => fetchAndDecode(`https://api.0x.org/orderbook/v1/orderbook/v1/?${params}`)(FetchOrderbookOutput)
);
