import { combineLatest, EMPTY, fromEvent, map, of, startWith, Subject, switchMap } from 'rxjs';
import * as OE from 'fp-ts-rxjs/ObservableEither';
import * as Obs from 'fp-ts-rxjs/Observable';
import { pipe } from 'fp-ts/function';
import { fuseForItems } from '@lib/search/search-items';
import { ChangeEvent } from 'react';
import { fetchAllTokens } from '@lib/services/coin-gecko/all-tokens';

export const coinSelectController = () => {
  // inputs
  const selectedCoin$ = new Subject<string>();

  const input$ = new Subject<HTMLInputElement>();
  const inputChange$ = input$.pipe(switchMap((input) => fromEvent<ChangeEvent<HTMLInputElement>>(input, 'change')));
  const value$ = inputChange$.pipe(
    map((input) => input.target.value),
    map((value) => value.trim()),
    startWith('') // never empty
  );

  const eitherOptions$ = pipe(
    selectedCoin$,
    Obs.map(fetchAllTokens),
    Obs.chain(OE.fromTaskEither),
    OE.map((allTokens) => allTokens.tokens)
  );

  // will work only if had success while fetching
  // if it fails, will emit a empty array
  const options$ = pipe(
    eitherOptions$,
    OE.fold(
      () => of([] as never[]),
      (options) => of(options)
    )
  );

  const error$ = pipe(
    eitherOptions$,
    OE.fold(
      (error) => of(error),
      () => EMPTY
    )
  );

  const fuse$ = options$.pipe(
    map(
      fuseForItems((p) => ({
        object: p,
        type: 'token',
        label: p.name,
      }))
    )
  );

  const filteredOptions$ = combineLatest([fuse$, value$]).pipe(map(([fuse, value]) => fuse.search(value)));

  return {
    input$,
    filteredOptions$,
    error$,
  };
};
