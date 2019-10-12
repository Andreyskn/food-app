import { Subject } from 'rxjs';

import { ResponseEvent, SystemError } from './types';
import { SocketEvent, UserSocketEvent } from '../Socket';
import { eventRouter } from './router';
import { domainHandler, errorHandler } from './handlers';

export const request$ = new Subject<SocketEvent>();
export const response$ = new Subject<ResponseEvent>();
export const domain$ = new Subject<UserSocketEvent>();
export const error$ = new Subject<SystemError>();

request$.subscribe({
	next: event => eventRouter(event),
});

domain$.subscribe({
	next: event => domainHandler(event),
});

error$.subscribe({
	error: error => errorHandler(error),
});
