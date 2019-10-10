import SocketIO from 'socket.io';
import { ServerSocket, ClientSocketEvent, Event } from '../../../shared';

export type Socket = Omit<SocketIO.Socket, 'on' | 'emit'> & ServerSocket;

export type UserConnectedEvent = Event<
	'User connected',
	{ socketId: Socket['id'] }
>

export type SocketEventData = {
	userId: string;
	timestamp: number;
}

export type UserSocketEvent = ClientSocketEvent & SocketEventData;

export type SystemSocketEvent = UserConnectedEvent & SocketEventData;

export type SocketEvent = UserSocketEvent & SystemSocketEvent;

export type SocketResponse = {
	event: string;
	payload: any;
	target?: string;
}
