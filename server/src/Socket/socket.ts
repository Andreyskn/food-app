import SocketIO from 'socket.io';
import { merge } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Socket } from './types';
import { response$, request$ } from '../eventStreams';
import { responseMapper } from './responseMapper';
import { createSocketEvent, createSocketEventStream } from './helpers';

export const runSocket = (io: SocketIO.Server) => {
	io.on('connection', socketHandler);

	response$
		.pipe(map(responseMapper))
		.subscribe({
			next: res => {
				const targetSocket = io.sockets.connected[res.target!];
				targetSocket.emit(res.event, res.payload);
			}
		});
}

const socketHandler = (socket: Socket) => {
	const fromEvent = createSocketEventStream(socket);

	merge(
		fromEvent('Restaurant chosen')
	)
		.pipe(
			startWith(
				createSocketEvent(socket, 'User connected', { socketId: socket.id })
			)
		)
		.subscribe(request$);
}
