import * as t from 'io-ts';
import { flow, pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { createError } from '../errors/create-error';
import * as E from 'fp-ts/Either';
import { formatValidationErrors } from 'io-ts-reporters';

/**
 * Sugar for fetching and decoding a json response
 * while preserving the error type
 * @param url
 */
export const fetchAndDecode =
  (url: string) =>
  <T>(codec: t.Type<T>) =>
    pipe(
      TE.tryCatch(() => fetch(url), createError('fetch_fail')),
      TE.chainW((response) => TE.tryCatch(() => response.json(), createError('json_parse_fail'))),
      TE.chainW(
        flow(codec.decode, E.mapLeft(formatValidationErrors), E.mapLeft(createError('json_decode_fail')), TE.fromEither)
      )
    );
