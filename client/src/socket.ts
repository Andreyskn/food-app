import io from 'socket.io-client';
import { StoreContextType } from 'alias/store';
import { ClientSocket as Socket } from 'alias/shared';

export const socket: Socket = io.connect('http://localhost:3000');

export type SocketContextType = { socket: Socket };

export const runSocket = (dispatch: StoreContextType['dispatch']) => {
	socket.on('restaurant-list', payload => dispatch({ type: 'RESTAURANT_LIST', payload }));
	socket.on('active-order', payload => dispatch({ type: 'ACTIVE_ORDER_DATA', payload }));
}
