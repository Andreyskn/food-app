import { OrderSelection } from '../order';
import { UsersState } from '../users';

type Event<N, P> = {
	type: 'event';
	name: N;
	payload: P;
}

type OrderCreated = Event<
	'Order created',
	{
		order: OrderSelection;
		users: UsersState;
	}
>

type UserStatusUpdated = Event<
	'User status updated',
	{
		users: UsersState;
	}
>

export type DomainEvent =
	| OrderCreated
	| UserStatusUpdated
