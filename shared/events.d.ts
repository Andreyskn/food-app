import { Restaurant, Order, UserData, UsersOrder } from './entities';

export type Event<N, P = undefined> = {
	name: N;
	payload: P;
}

// Server

export type SocketConnected = Event<
	'Connected to server',
	{
		type: 'order';
		order: Order;
		userData: UserData;
	} | {
		type: 'restaurants';
		restaurants: Restaurant[];
	}
>
export type OrderCreated = Event<'Order created', Order>;
export type OrderUpdated = Event<'Order updated', Order>;

export type ServerSocketEvent =
	| SocketConnected
	| OrderCreated
	| OrderUpdated

export type ServerSocket = {
	emit(event: SocketConnected['name'], payload: SocketConnected['payload']): void;
	emit(event: OrderCreated['name'], payload: OrderCreated['payload']): void;
	emit(event: OrderUpdated['name'], payload: OrderUpdated['payload']): void;

	on(event: ClientSocketEvent['name'], callback: (payload: ClientSocketEvent['payload']) => any): void;
}

// Client

export type RestaurantChosen = Event<'Restaurant chosen', Restaurant['id']>;
export type OrderDeclined = Event<'Order declined'>;
export type UserJoined = Event<'User joined'>;
export type UserPlacedOrder = Event<'User placed an order', UsersOrder>;

export type ClientSocketEvent =
	| RestaurantChosen
	| OrderDeclined
	| UserJoined
	| UserPlacedOrder

export type ClientSocket = {
	emit(event: RestaurantChosen['name'], payload: RestaurantChosen['payload']): void;
	emit(event: OrderDeclined['name']): void;
	emit(event: UserJoined['name']): void;
	emit(event: UserPlacedOrder['name'], payload: UserPlacedOrder['payload']): void;

	on(event: SocketConnected['name'], callback: (payload: SocketConnected['payload']) => any): void;
	on(event: OrderCreated['name'], callback: (payload: OrderCreated['payload']) => any): void;
	on(event: OrderUpdated['name'], callback: (payload: OrderUpdated['payload']) => any): void;
}
