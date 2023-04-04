import { MatchingSection } from '@domain/pages/root/matching-section/MatchingSection';
import { OrderbookSection } from './orderbook-section/OrderbookSection';
import { MatchingStateProvider } from './matching-section/matching-state';

export const RootPage = () => {
  return (
    <div className={'max-w-6xl flex flex-col mx-auto justify-center'}>
      <MatchingStateProvider>
        <MatchingSection />
        <OrderbookSection />
      </MatchingStateProvider>
    </div>
  );
};
