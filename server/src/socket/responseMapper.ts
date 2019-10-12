import { db } from '../fakeDB';
import { ResponseEvent } from '../eventStreams';
import { SocketResponse, OrderAbsentResponse, OrderExistsResponse } from './types';
import { Order, Participant } from '../../../shared';

let activeOrder: Order | null = null;

export const responseMapper = (event: ResponseEvent): SocketResponse => {
	switch (event.name) {
		case 'User connected': {
			const { socketId } = event.payload;
			let response: OrderAbsentResponse | OrderExistsResponse;

			if (activeOrder) {
				response = {
					type: 'target',
					name: 'Active order exists',
					payload: activeOrder,
					targetSocket: socketId,
				}
			}
			else {
				response = {
					type: 'target',
					name: 'Active order absent',
					payload: db.restaurants(),
					targetSocket: socketId,
				}
			}

			return response;
		}

		case 'Order created': {
			const { order, users } = event.payload;

			activeOrder = {
				status: order.status,
				initiator: db.user(order.host),
				restaurant: db.restaurant(order.restaurant),
				participants: order.participants.map(id => ({ ...db.user(id), status: users[id].status as Participant['status'] })),
				orderEndTime: order.selectionEndsAt,
			}

			return {
				type: 'global',
				name: event.name,
				payload: activeOrder,
			}
		}
	}
}
