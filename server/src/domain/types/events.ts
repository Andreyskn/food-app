import { OrderSelection, OrderActive } from '../order';
import { UsersState } from '../users';

type Event<N, P> = {
	type: 'event';
	name: N;
	payload: P;
}

type OrderCreated = Event<'Order created', { order: OrderSelection; users: UsersState; }>;
type OrderUpdated = Event<'Order updated', { order: OrderActive; users: UsersState; }>;
type UserStatusUpdated = Event<'User status updated', { users: UsersState; }>;

export type DomainEvent =
	| OrderCreated
	| OrderUpdated
	| UserStatusUpdated
