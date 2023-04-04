'use client';
import { useMatchingStateContext } from '../matching-section/matching-state';
import { UpdateControl } from './UpdateControl';
import { UpdateControlStateProvider } from './update-control-state';

function OrderbookTable() {
  return null;
}

export function OrderbookSection() {
  const {
    matchingState: { baseToken, quoteToken },
  } = useMatchingStateContext();
  return (
    <UpdateControlStateProvider>
      <div>
        <div>
          <h2>Order book</h2>
          <h3>
            {baseToken}/{quoteToken}
          </h3>
        </div>
        <UpdateControl />
        <OrderbookTable />
      </div>
    </UpdateControlStateProvider>
  );
}
