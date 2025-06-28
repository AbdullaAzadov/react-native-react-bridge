'use client';
import type { WebViewMessageEvent } from 'react-native-webview';
import { safeParse } from 'src/lib/safeParse';

type Handler<T> = (data: T) => void;

export function createNativeListener<TMap extends Record<string, any>>() {
  const listenersMap = new Map<keyof TMap, Set<Handler<any>>>();

  function on<K extends keyof TMap>(query: K, handler: Handler<TMap[K]>) {
    if (!listenersMap.has(query)) {
      listenersMap.set(query, new Set());
    }
    listenersMap.get(query)!.add(handler);
  }

  function off<K extends keyof TMap>(query: K, handler: Handler<TMap[K]>) {
    listenersMap.get(query)?.delete(handler);
  }

  function clear(query?: keyof TMap) {
    if (query) {
      listenersMap.get(query)?.clear();
    } else {
      listenersMap.clear();
    }
  }

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const parsed = safeParse(event.nativeEvent.data);
      if (!parsed) return;

      const { query, data } = parsed;

      listenersMap.get(query)?.forEach((fn) => fn(data));
    } catch (e) {
      console.warn('[nativeBridgeListener] Failed to parse message', e);
    }
  }

  return { on, off, clear, handleMessage };
}
