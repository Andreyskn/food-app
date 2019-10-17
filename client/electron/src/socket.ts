import SocketIOClient from 'socket.io-client';

import { USER_ID } from './config';

import { ClientSocket } from 'alias/shared';
import { dispatch, action, createOrder } from './store';

type Socket = Omit<SocketIOClient.Socket, 'on' | 'emit'> & ClientSocket;

export const socket: Socket = SocketIOClient.connect('http://localhost:3000', { query: `userId=${USER_ID}` });

socket.on('Connected to server', (payload) => {
	switch (payload.type) {
		case 'order':
			dispatch(action('HYDRATE_STORE', payload));
			break;
		case 'restaurants':
			dispatch(action('UPDATE_RESTAURANTS', payload.restaurants));
			break;
	}
});
socket.on('Order created', (activeOrder) => {
	dispatch(createOrder(activeOrder));
});
