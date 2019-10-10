import { order } from './order';
import { users } from './users';
import { Command, Result } from './types';

export const domain = {
	dispatch: (command: Command): Result => {
		switch (command.name) {
			case 'Create order': {
				const { restaurantId, hostId, timestamp } = command.payload;
				
				return {
					type: 'event',
					name: 'Order created',
					payload: {
						order: order.createOrder(restaurantId, hostId, timestamp),
						users: users.createUser(hostId),
					},
				};
			}

			default: return {
				type: 'error',
				name: 'Unhandled command',
				payload: command.name,
			}
		}
	}
};
