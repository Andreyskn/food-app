import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from 'alias/app';
import { Order, Restaurant } from 'alias/shared';
import { innerEventEmitter } from '../eventEmitter';

type ActionBase<T, P = undefined> = {
	type: T;
	payload: P;
}

type UpdateOrder = ActionBase<'UPDATE_ORDER', Order>;
type UpdateRestaurants = ActionBase<'UPDATE_RESTAURANTS', Restaurant[]>;

export type Action =
	| UpdateOrder
	| UpdateRestaurants

export function action(type: UpdateOrder['type'], payload: UpdateOrder['payload']): UpdateOrder;
export function action(type: UpdateRestaurants['type'], payload: UpdateRestaurants['payload']): UpdateRestaurants;
export function action(type: Action['type'], payload: Action['payload']) {
	return { type, payload };
};

type ThunkActionCreator<A extends Action> = ActionCreator<ThunkAction<void, AppState, undefined, A>>;

type CreateOrder = ThunkActionCreator<UpdateOrder>;

export const createOrder: CreateOrder = (order: UpdateOrder['payload']) => (dispatch) => {
	dispatch(action('UPDATE_ORDER', order));
	innerEventEmitter.emit('Order created');
}
