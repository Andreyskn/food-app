import { ResponseEvent } from '../eventStreams';
import { SocketResponse, SocketConnectedResponse } from './types';
import { getCache } from '../repository';

export const responseMapper = (event: ResponseEvent): SocketResponse => {
	switch (event.name) {
		case 'User connected': {
			const { payload: { socketId }, userId } = event;
			const cache = getCache();
			const payload: SocketConnectedResponse['payload'] = cache.order
				? { type: 'order', order: cache.order, userData: cache.users[userId] }
				: { type: 'restaurants', restaurants: cache.restaurants }

			return {
				type: 'target',
				name: 'Connected to server',
				payload,
				targetSocket: socketId,
			}
		}

		case 'Order created': {
			return { type: 'global', name: event.name, payload: event.payload }
		}

		case 'User status updated': {
			return { type: 'none' }
		}
	}
}
