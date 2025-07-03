import { useState, useEffect } from 'react';
import { HookLoggerConfig } from './hookLoggerConfig';

export function AVTUseState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log(`[AVTUseState][Init][${key}]`, initialValue);
    }
    return initialValue;
  });

  useEffect(() => {
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log(`[AVTUseState][Update][${key}]`, state);
    }
  }, [state]);

  return [state, setState];
}
