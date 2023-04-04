import { Input } from '@ui/atoms/inputs/Input';
import { coinSelectController } from './coin-select-controller';
import React from 'react';
import { useObservable } from '@lib/utils/use-observable';
import { TokenList } from './TokenList';

export const TokenSelect = () => {
  const { input$, filteredOptions$ } = React.useMemo(() => coinSelectController(), []);
  const filteredOptions = useObservable(filteredOptions$);

  return (
    <div>
      <Input ref={(el) => input$.next(el)} />
      <TokenList tokens={filteredOptions.map((c) => c.item.object)} />
    </div>
  );
};
