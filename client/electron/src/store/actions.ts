import { Order, Restaurant } from 'alias/shared';

type ActionBase<T, P> = {
	type: T;
	payload: P;
}

type UpdateOrder = ActionBase<'UPDATE_ORDER', Order>;
type UpdateRestaurants = ActionBase<'UPDATE_RESTAURANTS', Restaurant[]>;

export type Action =
	| UpdateOrder
	| UpdateRestaurants

export function action(type: UpdateOrder['type'], payload: UpdateOrder['payload']): Action;
export function action(type: UpdateRestaurants['type'], payload: UpdateRestaurants['payload']): Action ;
export function action(type: Action['type'], payload: Action['payload']) {
	return { type, payload };
};

