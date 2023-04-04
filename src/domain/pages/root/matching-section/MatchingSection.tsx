import {TrendChart} from './trend-chart/TrendChart';
import {MatchSelectionBox} from './selection-box/MatchSelectionBox';

export function MatchingSection() {
  return (
    <div >
      <div className={'flex space-x-4'}>
        <TrendChart/>
        <MatchSelectionBox/>
      </div>
    </div>
  );
}
