import { Subject, fromEvent } from 'rxjs';

import { Socket } from '../socket';

export type SocketEvent = {
	name: string;
	payload: any;
	userId: string;
	socketId: string;
	timestamp: number;
}

export const streams = {
	fromClient: new Subject<SocketEvent>(),
	toClient: new Subject<any>(),
}

export const createSocketEventStream = (socket: Socket) => (eventName: string) => {
	return fromEvent(socket, eventName, (payload?: any) => createEvent(socket, eventName, payload));
}

export const createEvent = (socket: Socket, name: string, payload?: any): SocketEvent => ({
	name,
	payload,
	userId: socket.handshake.query.userId,
	socketId: socket.id,
	timestamp: Date.now(),
});
