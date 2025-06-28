'use client';

import { BridgeMessage } from 'src/types/bridge';

export function safeParse(data: unknown): BridgeMessage<string, any> | null {
  try {
    if (typeof data === 'object' && data !== null) {
      if ('query' in data && 'data' in data) {
        return data as BridgeMessage<string, any>;
      }
      return null;
    }

    if (typeof data === 'string') {
      const parsed = JSON.parse(data);
      return safeParse(parsed);
    }

    return null;
  } catch (e) {
    console.warn('[safeParse] Failed:', data, e);
    return null;
  }
}
