import { db } from '../fakeDB';
import { ResponseEvent } from '../eventStreams';
import { SocketResponse } from './types';



export const responseMapper = (event: ResponseEvent): SocketResponse => {
	switch (event.name) {
		case 'User connected':
			return {
				event: 'restaurant-list',
				payload: db.restaurants(),
				target: event.payload.socketId,
			};

		case 'Order created':
			console.log('aaaaaaaaa', JSON.stringify(event));
	
		default:
			return event as any;
	}
}
