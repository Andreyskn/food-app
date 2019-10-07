import SocketIO from 'socket.io';

import { merge } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Socket } from './types';
import { streams, createEvent, createSocketEventStream } from '../EventStream';
import { responseMapper } from './responseMapper';

export const runSocket = (io: SocketIO.Server) => {
	io.on('connection', socketHandler);

	streams.toClient
		.pipe(map(responseMapper))
		.subscribe(res => {
			const targetSocket = io.sockets.connected[res.socketId];
			targetSocket.emit(res.event, res.payload);
		});
}

const socketHandler = (socket: Socket) => {
	const fromEvent = createSocketEventStream(socket);
	const a = fromEvent('current view: Home');

	merge(a)
		.pipe(startWith(createEvent(socket, 'User connected')))
		.subscribe({ next: e => streams.fromClient.next(e) });
}
