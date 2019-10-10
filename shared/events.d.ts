import { Restaurant, Order } from "./entities";

export type Event<N, P> = {
	name: N;
	payload: P;
}

export type ServerSocketEvents = {
	'restaurant-list': [Restaurant[]];
	'active-order': [Order];
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
	emit: <E extends ClientSocketEvent>(event: E['name'], payload: E['payload']) => void;
	on: <K extends keyof ServerSocketEvents>(event: K, callback: (payload: ServerSocketEvents[K][0]) => void) => void;
}

export type ServerSocket = {
	emit: <K extends keyof ServerSocketEvents>(event: K, callback: (payload: ServerSocketEvents[K][0]) => void) => void;
	on(event: RestaurantChosen['name'], payload: RestaurantChosen['payload']): void;
}
