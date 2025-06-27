'use client';

import { BridgeListenersMap } from '../types/bridge';

export function createListenersMap<T extends Record<string, unknown>>(
  keys: readonly (keyof T)[]
): BridgeListenersMap<T> {
  const map = {} as BridgeListenersMap<T>;
  keys.forEach((key) => {
    map[key] = new Set();
  });
  return map;
}
