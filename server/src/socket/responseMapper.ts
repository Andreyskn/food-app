import { db } from '../fakeDB';
import { ResponseEvent } from '../eventStreams';
import { SocketResponse, SocketConnectedResponse } from './types';
import { Order, Participant } from '../../../shared';

let activeOrder: Order | null = null;

export const responseMapper = (event: ResponseEvent): SocketResponse => {
	switch (event.name) {
		case 'User connected': {
			const { socketId } = event.payload;
			const payload: SocketConnectedResponse['payload'] = activeOrder
				? { type: 'order', order: activeOrder }
				: { type: 'restaurants', restaurants: db.restaurants() }

			return {
				type: 'target',
				name: 'Connected to server',
				payload,
				targetSocket: socketId,
			}
		}

		case 'Order created': {
			const { order, users } = event.payload;

			activeOrder = {
				status: order.status,
				host: db.user(order.host),
				restaurant: db.restaurant(order.restaurant),
				participants: order.participants.map(id => ({ ...db.user(id), status: users[id].status as Participant['status'] })),
				selectionEndsAt: order.selectionEndsAt,
			}

			return {
				type: 'global',
				name: event.name,
				payload: activeOrder,
			}
		}
	}
}
