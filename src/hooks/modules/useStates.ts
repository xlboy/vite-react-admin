import { useState } from 'react';

const useStates = <T extends object>(initVal: T) => {
  const [state, setState] = useState(initVal);

  const _setState = (v: Partial<T> | ((v: T) => Partial<T>)) => {
    const isFn = typeof v === 'function';

    setState(_state => Object.assign({}, _state, isFn ? v(state) : v));
  };

  return [state!, _setState] as const;
};

export default useStates;
