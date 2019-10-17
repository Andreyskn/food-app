import { order } from './order';
import { users } from './users';
import { DomainCommand, DomainResult } from './types';
import { createError } from './helpers';

export const domain = {
	dispatch: (command: DomainCommand): DomainResult => {
		try {
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

				case 'Set user declined status': {
					return {
						type: 'event',
						name: 'User status updated',
						payload: {
							users: users.setDeclinedStatus(command.payload),
						}
					};
				}

				default: {
					const unhandled: never = command;
					throw Error(`Unhandled command: ${unhandled}`);
				}
			}
		}
		catch (err) {
			const error: Error = typeof err === 'function'
				? (err as ReturnType<typeof createError>)(command.name)
				: err;

			return {
				type: 'error',
				error,
			}
		}
	}
};
