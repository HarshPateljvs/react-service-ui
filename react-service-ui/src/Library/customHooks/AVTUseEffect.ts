import { useEffect, type DependencyList } from 'react';
import { HookLoggerConfig } from './hookLoggerConfig';

export function AVTUseEffect(
  effectName: string,
  callback: () => void | (() => void),
  deps: DependencyList = []
): void {
  useEffect(() => {
    if (HookLoggerConfig.ENABLE_LOGGING) {
      console.log(`[AVTUseEffect][${effectName}] Mounted`);
    }

    const cleanup = callback();

    return () => {
      if (HookLoggerConfig.ENABLE_LOGGING) {
        console.log(`[AVTUseEffect][${effectName}] Unmounted`);
      }

      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, deps);
}
