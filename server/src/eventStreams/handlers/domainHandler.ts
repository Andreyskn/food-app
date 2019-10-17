import { response$, error$ } from '../streams';
import { domain, DomainResult, DomainCommand } from '../../domain';
import { UserSocketEvent } from '../../socket';
import { updateCache } from '../../repository';

const executeCommand = (command: DomainCommand) => handleResult(domain.dispatch(command));

const handleResult = (result: DomainResult) => {
	switch (result.type) {
		case 'event':
			const cache = updateCache(result.payload);
			response$.next({ ...result, payload: cache.order });
			break;
		case 'error':
			error$.next(result.error);
			break;
	}
}

export const domainHandler = (event: UserSocketEvent) => {
	switch (event.name) {
		case 'Restaurant chosen': {
			executeCommand({
				name: 'Create order',
				payload: {
					hostId: event.userId,
					restaurantId: event.payload.restaurantId,
					timestamp: event.timestamp,
				}
			});
			break;
		}

		case 'Order declined': {
			executeCommand({
				name: 'Set user declined status',
				payload: event.userId,
			});
			break;
		}

		default: {
			const unhandled: never = event;
			error$.next(new Error(`Unhandled event: ${unhandled}`));
			break;
		}
	}
}
