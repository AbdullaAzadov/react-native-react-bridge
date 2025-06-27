import { ReactNode } from 'react';

export interface BridgeMessage<K extends string, T> {
  query: K;
  data: T;
}

export type BridgeMessageHandler<TMap, K extends keyof TMap> = (
  data: TMap[K]
) => void;

export type BridgeListenersMap<TMap> = {
  [K in keyof TMap]: Set<BridgeMessageHandler<TMap, K>>;
};

export interface BridgeContext<TMap extends Record<string, unknown>> {
  listenersMap: BridgeListenersMap<TMap>;
}

export type BridgeProviderProps<T extends Record<string, unknown>> = {
  children: ReactNode;
  messageKeys: readonly (keyof T)[];
};
