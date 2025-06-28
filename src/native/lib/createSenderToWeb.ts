import { RefObject } from 'react';
import WebView from 'react-native-webview';
import { BridgeMessage } from 'src/types/bridge';

export function createSenderToWeb<TMap>() {
  return function send<K extends Extract<keyof TMap, string>>(
    ref: RefObject<WebView>,
    query: K,
    data: TMap[K]
  ) {
    if (!ref.current) {
      console.warn('[sendMessageToWeb] WebView ref is not attached');
      return;
    }

    const message: BridgeMessage<K, TMap[K]> = { query, data };
    const payload = JSON.stringify(JSON.stringify(message));
    const script = `window.dispatchEvent(new MessageEvent('message', { data: ${payload} }));`;

    ref.current.injectJavaScript(script);
  };
}
