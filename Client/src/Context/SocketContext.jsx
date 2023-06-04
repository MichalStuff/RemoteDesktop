import { createContext } from "react";
import io from "socket.io-client";

const IP = `http://${import.meta.env.VITE_IP}`;
const PORT = `${import.meta.env.VITE_PORT}`;
const socket = io(`${IP}:${PORT}`);

export const SocketProvider = ({ children }) => {
  const value = { socket };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const SocketContext = createContext();
