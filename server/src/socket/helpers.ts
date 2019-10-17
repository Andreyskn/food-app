import { fromEvent } from 'rxjs';

import { Socket, SocketEvent, UserConnectedEvent, SystemSocketEvent, UserSocketEvent } from './types';
import { ClientSocketEvent } from '../../../shared';

export const createSocketEventStream = (socket: Socket) => (eventName: ClientSocketEvent['name']) => {
	return fromEvent(socket, eventName, (payload: ClientSocketEvent['payload']) => createSocketEvent(socket, eventName, payload));
}

export function createSocketEvent(socket: Socket, name: UserConnectedEvent['name'], payload: UserConnectedEvent['payload']): SystemSocketEvent;
export function createSocketEvent(socket: Socket, name: ClientSocketEvent['name'], payload: ClientSocketEvent['payload']): UserSocketEvent;
export function createSocketEvent(socket: Socket, name: any, payload: any): SocketEvent {
	return {
		name,
		payload,
		userId: socket.handshake.query.userId,
		timestamp: Date.now(),
	};
};
