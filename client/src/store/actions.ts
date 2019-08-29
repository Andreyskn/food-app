import { Restaurant, Order } from 'alias/shared';

export type Actions =
	| { type: 'INIT' }
	| { type: 'RESTAURANT_LIST', payload: Restaurant[] }
	| { type: 'ACTIVE_ORDER_DATA', payload: Order }
