import { useState, useEffect } from 'react';
import { HookLoggerConfig } from './hookLoggerConfig';

/**
 * AVTUseState is a wrapper around React's useState with logging support.
 * It supports all state types: string, number, boolean, object, array, etc.
 */
export function AVTUseState<T>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log(`[AVTUseState][Init][${key}]`, value);
    }
    return value;
  });

  useEffect(() => {
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log(`[AVTUseState][Update][${key}]`, state);
    }
  }, [state]);

  return [state, setState];
}
