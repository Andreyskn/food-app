import { response$, error$ } from '../streams';
import { domain, Result } from '../../domain';
import { UserSocketEvent } from '../../socket';

export const domainHandler = (event: UserSocketEvent) => {
	switch (event.name) {
		case 'Restaurant chosen': {
			const result = domain.dispatch({
				name: 'Create order',
				payload: {
					hostId: event.userId,
					restaurantId: event.payload.restaurantId,
					timestamp: event.timestamp,
				}
			});
			handleResult(result);
			break;
		}
	
		default:
			// const unhandled: never = event.name;
			console.log(`Unhandled domain event: [ ${event.name} ]`);
			break;
	}
}

const handleResult = (result: Result) => {
	switch (result.type) {
		case 'event':
			response$.next({ name: result.name, payload: result.payload });
			break;
		case 'error':
			error$.error({ name: result.name, payload: result.payload });
			break;
	}
}
