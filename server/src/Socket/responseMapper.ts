import { db } from '../fakeDB';

export const responseMapper = (event: any) => {
	switch (event.name) {
		case 'User connected':
			return {
				event: 'restaurant-list',
				payload: db.restaurants(),
				socketId: event.socketId,
			};
	
		default:
			return event;
	}
}
