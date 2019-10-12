import { Restaurant, Order } from './entities';

export type Event<N, P> = {
	name: N;
	payload: P;
}

export type ActiveOrderExists = Event<
	'Active order exists',
	Order
>

export type ActiveOrderAbsent = Event<
	'Active order absent',
	Restaurant[]
>

export type OrderCreated = Event<
	'Order created',
	Order
>

export type ServerSocketEvent =
	| ActiveOrderExists
	| ActiveOrderAbsent
	| OrderCreated

export type ServerSocket = {
	emit(event: ActiveOrderExists['name'], payload: ActiveOrderExists['payload']): void;
	emit(event: ActiveOrderAbsent['name'], payload: ActiveOrderAbsent['payload']): void;
	emit(event: OrderCreated['name'], payload: OrderCreated['payload']): void;
	on(event: ClientSocketEvent['name'], callback: (payload: ClientSocketEvent['payload']) => any): void;
}

export type RestaurantChosen = Event<
	'Restaurant chosen',
	{ restaurantId: string }
>

export type OrderRejected = Event<
	'Order rejected',
	undefined
>

export type ClientSocketEvent =
	| RestaurantChosen
	| OrderRejected

export type ClientSocket = {
	emit(event: RestaurantChosen['name'], payload: RestaurantChosen['payload']): void;
	emit(event: OrderRejected['name']): void;
	on(event: ActiveOrderExists['name'], callback: (payload: ActiveOrderExists['payload']) => any): void;
	on(event: ActiveOrderAbsent['name'], callback: (payload: ActiveOrderAbsent['payload']) => any): void;
	on(event: OrderCreated['name'], callback: (payload: OrderCreated['payload']) => any): void;
}
