import { io } from "socket.io-client";
import { createContext } from "react";
import { ipLAN } from "../config/ipCOnfig";

// "undefined" means the URL will be computed from the `window.location` object
const URL = `http://${ipLAN}:3000`;

export const socket = io(URL);
export const SocketContext = createContext();
