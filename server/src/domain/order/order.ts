import { OrderState, RestaurantId, Timestamp } from './types';
import { UserId } from '../users';
import { createError } from '../helpers';

let state: OrderState = {
	status: 'idle',
}

export const order = {
	createOrder: (restaurant: RestaurantId, host: UserId, startTime: Timestamp) => {
		if (state.status !== 'idle') throw createError('Order already created');

		state = {
			status: 'selection',
			host,
			restaurant,
			participants: [],
			selectionEndsAt: startTime + 30 * 60 * 1000,
		}
		return state;
	},
	addParticipant: (userId: UserId) => {
		if (state.status !== 'selection') throw createError('Order is not in selection state');

		state = {
			...state,
			participants: [...state.participants, userId],
		}
		return state;
	}
}
