"use client";
interface WindowWithReactNativeWebView extends Window {
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
}

export function createSenderToNative<TMap extends Record<string, any>>() {
  return function send<K extends keyof TMap>(
    query: K,
    data: TMap[K],
    retryCount = 10,
    delay = 100
  ) {
    const message = { query, data };

    function trySend(attempt = 0) {
      if (
        typeof window !== "undefined" &&
        "ReactNativeWebView" in window &&
        typeof (window.ReactNativeWebView as WindowWithReactNativeWebView)
          .postMessage === "function"
      ) {
        (window.ReactNativeWebView as WindowWithReactNativeWebView).postMessage(
          JSON.stringify(message)
        );
      } else if (attempt < retryCount) {
        setTimeout(() => trySend(attempt + 1), delay);
      } else {
        console.warn(
          `[sendMessageToRN] ReactNativeWebView not available after ${retryCount} attempts`
        );
      }
    }

    trySend();
  };
}
