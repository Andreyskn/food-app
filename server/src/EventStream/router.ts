import { streams } from './stream';

streams.fromClient.subscribe({
	next: event => {
		switch (event.name) {
			case 'User connected':
				streams.toClient.next(event);
				break;
		
			default:
				console.log(`Unhandled event: [ ${event.name} ]`);
				break;
		}
	}
});
