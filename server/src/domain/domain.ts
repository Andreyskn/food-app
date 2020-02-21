import { order, OrderActive } from './order';
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
							users: users.setSelectingStatus(hostId),
						},
					};
				}

				case 'Set user declined status': {
					const updatedOrder = order.removeParticipant(command.payload);
					const updatedUsers = users.setDeclinedStatus(command.payload);

					return updatedOrder ? {
						type: 'event',
						name: 'Order updated',
						payload: { order: updatedOrder, users: updatedUsers },
					} : {
						type: 'event',
						name: 'User status updated',
						payload: { users: updatedUsers },
					}
				}

				case 'Add participant': {
					return {
						type: 'event',
						name: 'Order updated',
						payload: {
							order: order.addParticipant(command.payload),
							users: users.setSelectingStatus(command.payload),
						}
					}
				}

				case 'Take user order': {
					const { userId, usersOrder } = command.payload;

					return {
						type: 'event',
						name: 'Order updated',
						payload: {
							order: order.getState() as OrderActive,
							users: users.setOrderedStatus(userId, usersOrder),
						}
					}
				}

				case 'Start delivery': {
					const { deliveryTime } = command.payload;

					return {
						type: 'event',
						name: 'Delivery started',
						payload: {
							order: order.setDeliveryStatus(deliveryTime),
						}
					}
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
