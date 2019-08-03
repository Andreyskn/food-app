import { AppState } from './types';

export type Actions =
	| { type: 'INIT' }
	| { type: 'RESTAURANT_LIST', payload: Pick<AppState, 'restaurants'> }
	| { type: 'ACTIVE_ORDER_DATA', payload: Pick<AppState, 'activeOrder'> }
