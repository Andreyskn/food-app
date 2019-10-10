type Event<N, P> = {
	type: 'event';
	name: N;
	payload: P;
}

export type OrderCreated = Event<
	'Order created',
	{
		order: import('../order').OrderState;
		users: import('../users').UsersState;
	}
>
