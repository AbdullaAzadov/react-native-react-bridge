'use client';
export interface BridgeMessage<K extends string, T> {
  query: K;
  data: T;
}

export type BridgeMessageHandler<TMap, K extends keyof TMap> = (
  data: TMap[K]
) => void;
