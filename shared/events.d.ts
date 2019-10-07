import { Restaurant, Order } from "./entities";

export type ServerSocketEvents = {
	'restaurant-list': [Restaurant[]];
	'active-order': [Order];
}

export type ClientSocketEvent = {
	// @ts-ignore
	'current view: Home': [undefined?];
}

export type ClientSocket = {
	// @ts-ignore
	emit: <K extends keyof ClientSocketEvent>(event: K, ...payload: ClientSocketEvent[K]) => void;
	on: <K extends keyof ServerSocketEvents>(event: K, callback: (payload: ServerSocketEvents[K][0]) => void) => void;
}

export type ServerSocket = {
	// @ts-ignore
	emit: <K extends keyof ServerSocketEvents>(event: K, ...payload: ServerSocketEvents[K]) => void;
	on: <K extends keyof ClientSocketEvent>(event: K, callback: (payload: ClientSocketEvent[K][0]) => void) => void;
}

