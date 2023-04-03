import { TrendChart } from '@domain/pages/TrendChart';
import { MatchSelectionBox } from '@domain/pages/MatchSelectionBox';

export function MatchingSection() {
  return (
    <div>
      <TrendChart />
      <MatchSelectionBox />
    </div>
  );
}
