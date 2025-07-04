'use client';

type BridgeMessageHandler<TMap, K extends keyof TMap> = (data: TMap[K]) => void;

export function createWebviewListener<TMap extends Record<string, any>>() {
  const listeners: {
    [K in keyof TMap]?: Set<BridgeMessageHandler<TMap, K>>;
  } = {};

  let isListening = false;

  function handleRawMessage(event: MessageEvent) {
    try {
      const raw =
        typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (!raw?.query || !raw?.data) return;
      const { query, data } = raw;
      listeners[query as keyof TMap]?.forEach((fn: any) => fn(data));
    } catch (e) {
      console.warn('[createListener] Failed to parse message:', e);
    }
  }

  function ensureListener() {
    if (typeof window !== 'undefined' && !isListening) {
      window.addEventListener('message', handleRawMessage);
      isListening = true;
    }
  }

  function on<K extends keyof TMap>(
    query: K,
    handler: BridgeMessageHandler<TMap, K>
  ) {
    ensureListener();
    if (!listeners[query]) listeners[query] = new Set();
    listeners[query]!.add(handler);
  }

  function off<K extends keyof TMap>(
    query: K,
    handler: BridgeMessageHandler<TMap, K>
  ) {
    listeners[query]?.delete(handler);
  }

  function clear() {
    if (typeof window !== 'undefined' && isListening) {
      window.removeEventListener('message', handleRawMessage);
      isListening = false;
    }
    Object.values(listeners).forEach((set) => set?.clear());
  }

  return { on, off, clear };
}
