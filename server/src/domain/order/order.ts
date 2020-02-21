import { OrderState, RestaurantId, Timestamp, Minutes } from './types';
import { UserId } from '../users';
import { createError } from '../helpers';

let state: OrderState = {
	status: 'idle',
}

export const order = {
	getState: () => state,

	createOrder: (restaurant: RestaurantId, host: UserId, startTime: Timestamp) => {
		if (state.status !== 'idle') throw createError('Order already created');

		return state = {
			status: 'selection',
			host,
			restaurant,
			participants: [],
			selectionEndsAt: startTime + 30 * 1000,
		}
	},

	addParticipant: (userId: UserId) => {
		if (state.status !== 'selection') throw createError('Order is not in selection state');

		return state = {
			...state,
			participants: [...state.participants, userId],
		}
	},

	removeParticipant: (userId: UserId) => {
		switch (state.status) {
			case 'delivery':
			case 'payment':
			case 'finished': {
				throw createError('Can not decline order at this stage');
			}
			case 'idle': {
				return null;
			}
			case 'selection': {
				if (!state.participants.find(id => id === userId)) return null;

				return state = {
					...state,
					participants: state.participants.filter(id => id !== userId),
				}
			}
		}
	},

	setDeliveryStatus: (deliveryTime: Minutes) => {
		if (state.status !== 'selection') throw createError('Order is not in selection state');

		return state = {
			...state,
			status: 'delivery',
			deliveryExpectedAt: Date.now() + deliveryTime * 60 * 1000,
		}
	}
}
