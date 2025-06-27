import { createContext, useContext } from 'react';
import { BridgeContext } from 'src/types/bridge';

export const WebBridgeContext = createContext<BridgeContext<any> | null>(null);

export function useWebBridgeContext<TMap extends Record<string, unknown>>() {
  const ctx = useContext(WebBridgeContext);
  if (!ctx) throw new Error('WebBridgeContext not found');
  return ctx as BridgeContext<TMap>;
}
