import { type DependencyList } from 'react'
import { AVTUseEffect } from '../../../customHooks'

export function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  AVTUseEffect("",() => {
    const t = setTimeout(() => {
      fn.apply(undefined, [...(deps as [])])
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
