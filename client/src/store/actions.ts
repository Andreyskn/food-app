import { Restaurant, Order } from 'alias/shared';
import { AppState } from 'alias/store';

export type Actions =
	| { type: 'SYNC_STATE', payload: AppState }
	| { type: 'INIT' }
	| { type: 'RESTAURANT_LIST', payload: Restaurant[] }
	| { type: 'ACTIVE_ORDER_DATA', payload: Order }
