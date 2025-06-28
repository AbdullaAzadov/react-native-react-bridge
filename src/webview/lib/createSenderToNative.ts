'use client';
interface WindowWithReactNativeWebView extends Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
}

export function createSenderToNative<TMap extends Record<string, any>>() {
  return function send<K extends keyof TMap>(query: K, data: TMap[K]) {
    const message = { query, data };
    if (typeof window !== 'undefined' && 'ReactNativeWebView' in window) {
      (window.ReactNativeWebView as WindowWithReactNativeWebView).postMessage(
        JSON.stringify(message)
      );
    } else {
      alert('[sendMessageToRN] ReactNativeWebView not available');
    }
  };
}
