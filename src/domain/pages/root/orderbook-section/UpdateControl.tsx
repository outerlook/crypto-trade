import { useUpdateControlStateContext } from './update-control-state';

// control how often the orderbook updates on screen
export function UpdateControl() {
  const { updateControlState, setUpdateControlState, options } = useUpdateControlStateContext();
  return null;
}
