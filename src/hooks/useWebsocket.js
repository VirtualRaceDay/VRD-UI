import { useEffect, useState } from 'react';

const webSocketEndpoint = (endpoint) => new URL(endpoint, process.env.REACT_APP_WEBSOCKET_URI).href;

export const useWebsocket = (endpoint) => {
  const [message, setMessage] = useState({});
  const processMessage = ({ data }) => setMessage(JSON.parse(data));

  useEffect(() => {
    const webSocket = new WebSocket(webSocketEndpoint(endpoint));
    webSocket.addEventListener('message', processMessage);

    return () => {
      webSocket.removeEventListener('message', processMessage);
      webSocket.close();
    }
  }, [endpoint]);

  return [message];
};
