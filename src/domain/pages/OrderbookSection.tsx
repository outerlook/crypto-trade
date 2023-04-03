import { useMatchingState, useMatchingStateContext } from '@domain/pages/matching-state';
import { UpdateControl } from '@domain/pages/UpdateControl';

function OrderbookTable() {
  return null;
}

export function OrderbookSection() {
  const {
    matchingState: { fromCurrency, toCurrency },
  } = useMatchingStateContext();
  return (
    <div>
      <div>
        <h2>Order book</h2>
        <h3>
          {toCurrency}/{fromCurrency}
        </h3>
      </div>
      <UpdateControl />
      <OrderbookTable />
    </div>
  );
}
