import { OrderState, RestaurantId, UserId, Timestamp } from './types';

let state: OrderState = {
	status: 'idle',
}

export const order = {
	createOrder: (restaurant: RestaurantId, host: UserId, startTime: Timestamp) => {
		state = {
			status: 'selection',
			host,
			restaurant,
			participants: [],
			selectionEndsAt: startTime + 30 * 60 * 1000,
		}
		return state;
	},
}
