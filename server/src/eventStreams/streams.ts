import { Subject } from 'rxjs';

import { ResponseEvent } from './types';
import { UserSocketEvent } from '../Socket';
import { domainHandler, errorHandler } from './handlers';

export const response$ = new Subject<ResponseEvent>();
export const domain$ = new Subject<UserSocketEvent>();
export const error$ = new Subject<Error>();

domain$.subscribe({
	next: event => domainHandler(event),
});

error$.subscribe({
	next: error => errorHandler(error),
});
