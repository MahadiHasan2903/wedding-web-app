"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({
  userId,
  SOCKET_ID,
  children,
}: {
  userId?: string;
  SOCKET_ID?: string;
  children: React.ReactNode;
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId || !SOCKET_ID) {
      return;
    }

    const socket = io(SOCKET_ID, {
      query: { userId },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 WebSocket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 WebSocket disconnected");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, SOCKET_ID]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
