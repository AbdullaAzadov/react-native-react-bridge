import { useEffect } from 'react';
import { BridgeMessageHandler } from 'src/types/bridge';
import { useWebBridgeContext } from '../context/webBridgeContext';

function useWebBridgeHandler<
  T extends Record<string, unknown>,
  K extends keyof T
>(query: K, handler: BridgeMessageHandler<T, K>) {
  const { listenersMap } = useWebBridgeContext<T>();

  useEffect(() => {
    listenersMap[query].add(handler);
    return () => {
      listenersMap[query].delete(handler);
    };
  }, [handler]);
}

export function createWebBridge<T extends Record<string, unknown>>() {
  return {
    useWebBridgeHandler: <K extends keyof T>(
      query: K,
      handler: (data: T[K]) => void
    ) => useWebBridgeHandler<T, K>(query, handler),
    useWebBridgeContext: () => useWebBridgeContext<T>(),
  };
}
