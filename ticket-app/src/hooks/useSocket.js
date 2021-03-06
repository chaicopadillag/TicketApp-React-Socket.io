import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath) => {
	const socket = useMemo(
		() =>
			io.connect(serverPath, {
				transport: ['websocket'],
			}),
		[serverPath]
	);
	const [online, setOnline] = useState(false);

	// useEffect(() => {
	// 	setStatusActive(socket.connected);
	// }, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

	// useEffect(() => {
	// 	socket.on('disconnect', () => {
	// 		setStatusActive(false);
	// 	});
	// }, [socket]);

	return { socket, online };
};
