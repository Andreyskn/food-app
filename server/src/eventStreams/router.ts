import { response$, domain$ } from './streams';

export const eventRouter = (event: any) => {
	switch (event.name) {
		case 'User connected':
			response$.next(event);
			break;

		case 'Restaurant chosen':
			domain$.next(event);
			break;
	
		default:
			console.log(`Unhandled incoming event: [ ${event.name} ]`);
			break;
	}
}
