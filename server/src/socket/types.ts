import SocketIO from 'socket.io';
import {
	ServerSocket, ClientSocketEvent, Event,
	SocketConnected, ServerSocketEvent,
} from '../../../shared';

export type Socket = Omit<SocketIO.Socket, 'on' | 'emit'> & ServerSocket;

// Events

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

export type SocketEvent = UserSocketEvent | SystemSocketEvent;

// Responses

export type TargetResponseData = {
	type: 'target',
	targetSocket: Socket['id'];
}

export type GlobalResponseData = {
	type: 'global',
}

export type SocketConnectedResponse = SocketConnected & TargetResponseData;

export type TargetResponse = SocketConnectedResponse;

export type GlobalResponse = Exclude<ServerSocketEvent, SocketConnected> & GlobalResponseData;

export type NoResponse = { type: 'none' };

export type SocketResponse = GlobalResponse | TargetResponse | NoResponse;
