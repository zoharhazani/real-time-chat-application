import React, { createContext, useContext, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [webSocketClient, setWebSocketClient] = useState(null);

  return (
    <WebSocketContext.Provider value={{ webSocketClient, setWebSocketClient }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};