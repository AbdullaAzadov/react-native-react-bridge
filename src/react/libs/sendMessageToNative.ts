'use client';

import { BridgeMessage } from 'src/types/bridge';

interface WindowWithReactNativeWebView extends Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
}

export function sendMessageToNative<K extends string, T>(
  message: BridgeMessage<K, T>
) {
  if (typeof window !== 'undefined' && 'ReactNativeWebView' in window) {
    const windowWithReactNativeWebView = window as WindowWithReactNativeWebView;
    windowWithReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    console.warn('[sendMessageToRN] ReactNativeWebView not available');
  }
}
