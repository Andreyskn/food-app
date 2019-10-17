import SocketIO from 'socket.io';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Socket, SocketResponse } from './types';
import { response$, domain$ } from '../eventStreams';
import { responseMapper } from './responseMapper';
import { createSocketEvent, createSocketEventStream } from './helpers';

export const runSocket = (io: SocketIO.Server) => {
	io.on('connection', socketHandler);

	response$
		.pipe(map(responseMapper))
		.subscribe({
			next: (res: SocketResponse) => {
				switch (res.type) {
					case 'none': break;

					case 'global': {
						io.emit(res.name, res.payload);
						break;
					}

					case 'target': {
						const targetSocket = io.sockets.connected[res.targetSocket];
						targetSocket.emit(res.name, res.payload);
						break;
					}
				}
			}
		});
}

const socketHandler = (socket: Socket) => {
	const fromEvent = createSocketEventStream(socket);

	response$.next(createSocketEvent(socket, 'User connected', { socketId: socket.id }));

	merge(
		fromEvent('Restaurant chosen'),
		fromEvent('Order declined'),
	).subscribe(domain$);
}
