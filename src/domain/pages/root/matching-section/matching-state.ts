'use client';
import React from 'react';
import constate from 'constate';

type Currency = string;
type MatchingState = {
  baseToken?: Currency;
  quoteToken?: Currency;
};

const useMatchingState = () => {
  const [matchingState, setMatchingState] = React.useState<MatchingState>({
    baseToken: undefined,
    quoteToken: undefined,
  });

  const setBaseToken = (fromCurrency: Currency) =>
    setMatchingState((state) => ({
      ...state,
      baseToken: fromCurrency,
    }));
  const setQuoteToken = (toCurrency: Currency) => setMatchingState((state) => ({ ...state, quoteToken: toCurrency }));

  return {
    matchingState,
    setBaseToken: setBaseToken,
    setQuoteToken: setQuoteToken,
  };
};

export const [MatchingStateProvider, useMatchingStateContext] = constate(useMatchingState);
