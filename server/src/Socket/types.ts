import SocketIO from 'socket.io';
import {
	ServerSocket, ClientSocketEvent, Event,
	ActiveOrderExists, ActiveOrderAbsent, ServerSocketEvent,
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

export type OrderExistsResponse = ActiveOrderExists & TargetResponseData;

export type OrderAbsentResponse = ActiveOrderAbsent & TargetResponseData;

export type TargetResponse = OrderExistsResponse | OrderAbsentResponse;

export type GlobalResponse = Exclude<ServerSocketEvent, ActiveOrderExists | ActiveOrderAbsent> & GlobalResponseData;

export type SocketResponse = GlobalResponse | TargetResponse;
