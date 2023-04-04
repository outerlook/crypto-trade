import * as t from 'io-ts';
import { flow } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { UnixTimestamp } from '../../common-types/unix-timestamp';
import { fetchAndDecode } from '../../utils/fetch-and-decode';

// Types =======================================================
const Response = t.type({
  prices: t.array(t.tuple([UnixTimestamp, t.number])),
});

const Params = t.type({
  id: t.string,
  contract_address: t.string,
});
const Query = t.type({
  vs_currency: t.string,
  from: UnixTimestamp,
  to: UnixTimestamp,
});
const Input = t.type({
  ...Params.props,
  ...Query.props,
});

// Service =======================================================
export const fetchMarketChart = flow(
  Input.decode,
  TE.fromEither,
  TE.chainW((input) =>
    fetchAndDecode(
      `https://api.coingecko.com/api/v3/coins/${input.id}/market_chart/range?vs_currency=${input.vs_currency}&from=${input.from}&to=${input.to}`
    )(Response)
  )
);
