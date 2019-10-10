import { fromEvent } from 'rxjs';

import { Socket, SocketEvent, SystemSocketEvent, UserSocketEvent } from './types';

export const createSocketEventStream = (socket: Socket) => (eventName: UserSocketEvent['name']) => {
	return fromEvent(socket, eventName, (payload: UserSocketEvent['payload']) => createSocketEvent(socket, eventName as any, payload as any));
}

export function createSocketEvent(socket: Socket, name: SystemSocketEvent['name'], payload: SystemSocketEvent['payload']): SocketEvent;
export function createSocketEvent(socket: Socket, name: any, payload: any): SocketEvent {
	return {
		name: name as never, // FIXME:
		payload,
		userId: socket.handshake.query.userId,
		timestamp: Date.now(),
	};
};
