import { AppState } from '../client/src/store/types';

// TODO: improve typings

export type ServerSocketEvents = {
	'restaurant-list': [Pick<AppState, 'restaurants'>];
	'active-order': [Pick<AppState, 'activeOrder'>];
}

export type ClientSocketEvent = {
	// @ts-ignore
	'current view: Home': [undefined?];
}

// type TypeName<T, K extends keyof T> = T[K] extends undefined ? (event: K) => void : (event: K, payload: T[K]) => void;

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

export type ClientState = AppState;
