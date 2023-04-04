'use-client';
import React from 'react';
import constate from 'constate';

type Milisseconds = number;

type UpdateControlState = { label: string; value: null | Milisseconds };

const updateOptions = [
  { label: 'OFF', value: null },
  { label: '250ms', value: 250 },
  { label: '1s', value: 1000 },
  { label: '5s', value: 5000 },
] satisfies UpdateControlState[];

const useUpdateControlState = () => {
  const [updateControlState, setUpdateControlState] = React.useState<UpdateControlState>(updateOptions[0]);

  return {
    updateControlState,
    setUpdateControlState,
    options: updateOptions,
  };
};

export const [UpdateControlStateProvider, useUpdateControlStateContext] = constate(useUpdateControlState);
