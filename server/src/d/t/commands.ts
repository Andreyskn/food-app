type Command<N, P> = {
	name: N;
	payload: P;
}

export type CreateOrder = Command<
	'Create order',
	{
		restaurantId: import('../order').RestaurantId;
		hostId: import('../users').UserId;
		timestamp: import('../order').Timestamp;
	}
>
