import { useEffect, useRef } from 'react';
import { safeParse } from '../../lib/safeParse';
import { BridgeMessage, BridgeProviderProps } from '../../types/bridge';
import { createListenersMap } from '../../lib/createListenersMap';
import { WebBridgeContext } from '../context/webBridgeContext';

export function WebBridgeProvider<T extends Record<string, unknown>>({
  children,
  messageKeys,
}: BridgeProviderProps<T>) {
  const listenersMapRef = useRef(createListenersMap<T>(messageKeys));

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const parsed = safeParse<BridgeMessage<string, T[keyof T]>>(event.data);
      if (
        !parsed ||
        typeof parsed.query !== 'string' ||
        !(parsed.query in listenersMapRef.current)
      )
        return;

      const query = parsed.query as keyof T;
      listenersMapRef.current[query].forEach((fn) =>
        fn(parsed.data as T[typeof query])
      );
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <WebBridgeContext.Provider
      value={{ listenersMap: listenersMapRef.current }}
    >
      {children}
    </WebBridgeContext.Provider>
  );
}
