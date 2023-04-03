import React from 'react';
import constate from 'constate';

type Currency = string;
type MatchingState = {
  fromCurrency?: Currency;
  toCurrency?: Currency;
};

const useMatchingState = () => {
  const [matchingState, setMatchingState] = React.useState<MatchingState>({
    fromCurrency: undefined,
    toCurrency: undefined,
  });

  const setFromCurrency = (fromCurrency: Currency) => setMatchingState((state) => ({ ...state, fromCurrency }));
  const setToCurrency = (toCurrency: Currency) => setMatchingState((state) => ({ ...state, toCurrency }));

  return {
    matchingState,
    setFromCurrency,
    setToCurrency,
  };
};

export const [MatchingStateProvider, useMatchingStateContext] = constate(useMatchingState);
