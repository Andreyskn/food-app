import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppState } from 'alias/app';
import { Order, Restaurant, UserData } from 'alias/shared';
import { innerEventEmitter } from '../eventEmitter';

type ActionBase<T, P = undefined> = {
	type: T;
	payload: P;
}

type HydrateStore = ActionBase<'HYDRATE_STORE', { order: Order, userData: UserData }>;
type CreateOrder = ActionBase<'CREATE_ORDER', Order>;
type UpdateOrder = ActionBase<'UPDATE_ORDER', Order>;
type UpdateRestaurants = ActionBase<'UPDATE_RESTAURANTS', Restaurant[]>;
type SetDeclinedStatus = ActionBase<'SET_DECLINED_STATUS'>;
type JoinOrder = ActionBase<'JOIN_ORDER'>;

export type Action =
	| HydrateStore
	| CreateOrder
	| UpdateOrder
	| UpdateRestaurants
	| SetDeclinedStatus
	| JoinOrder
;

export function action(type: HydrateStore['type'], payload: HydrateStore['payload']): HydrateStore;
export function action(type: CreateOrder['type'], payload: CreateOrder['payload']): CreateOrder;
export function action(type: UpdateOrder['type'], payload: UpdateOrder['payload']): UpdateOrder;
export function action(type: UpdateRestaurants['type'], payload: UpdateRestaurants['payload']): UpdateRestaurants;
export function action(type: SetDeclinedStatus['type']): SetDeclinedStatus;
export function action(type: JoinOrder['type']): JoinOrder;
export function action(type: Action['type'], payload: Action['payload'] = undefined) {
	return { type, payload };
};

type ThunkActionCreator<A extends Action> = ActionCreator<ThunkAction<void, AppState, undefined, A>>;

export const createOrder: ThunkActionCreator<CreateOrder> = (order: CreateOrder['payload']) => dispatch => {
	dispatch(action('CREATE_ORDER', order));
	innerEventEmitter.emit('Order created');
}

export const setDeclineStatus: ThunkActionCreator<SetDeclinedStatus> = () => dispatch => {
	dispatch(action('SET_DECLINED_STATUS'));
	innerEventEmitter.emit('Order declined');
}

export const joinOrder: ThunkActionCreator<JoinOrder> = () => dispatch => {
	dispatch(action('JOIN_ORDER'));
	innerEventEmitter.emit('User joined');
}
