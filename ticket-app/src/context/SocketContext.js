import React, { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online } = useSocket(process.env.REACT_APP_HOST_SOCKET_IO);
	return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
