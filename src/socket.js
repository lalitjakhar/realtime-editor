import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173";

export const initSocket = async () => {
  const options = {
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(BACKEND_URL, options);
};
