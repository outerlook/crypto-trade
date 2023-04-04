// Types =======================================================
import * as t from 'io-ts';
import dayjs from 'dayjs';

export const UnixTimestamp = t.brand(
  t.number,
  (n): n is t.Branded<number, { readonly Timestamp: unique symbol }> => n > 0,
  'Timestamp'
);

export type UnixTimestamp = t.TypeOf<typeof UnixTimestamp>;

// Operations =======================================================
export const unixTimestampToDayjs = (timestamp: UnixTimestamp) => dayjs.unix(timestamp);
