import { Restaurant, Order, UserData } from './entities';

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

export type ServerSocketEvent =
	| SocketConnected
	| OrderCreated

export type ServerSocket = {
	emit(event: SocketConnected['name'], payload: SocketConnected['payload']): void;
	emit(event: OrderCreated['name'], payload: OrderCreated['payload']): void;

	on(event: ClientSocketEvent['name'], callback: (payload: ClientSocketEvent['payload']) => any): void;
}

// Client

export type RestaurantChosen = Event<'Restaurant chosen', { restaurantId: string }>;
export type OrderDeclined = Event<'Order declined'>;

export type ClientSocketEvent =
	| RestaurantChosen
	| OrderDeclined

export type ClientSocket = {
	emit(event: RestaurantChosen['name'], payload: RestaurantChosen['payload']): void;
	emit(event: OrderDeclined['name']): void;

	on(event: SocketConnected['name'], callback: (payload: SocketConnected['payload']) => any): void;
	on(event: OrderCreated['name'], callback: (payload: OrderCreated['payload']) => any): void;
}
