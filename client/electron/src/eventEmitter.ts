import EventEmitter from 'events';

type InnerEvent<N, P = undefined> = {
	name: N;
	payload: P;
}

type OrderCreated = InnerEvent<'Order created'>;
type OrderDeclined = InnerEvent<'Order declined'>;
type UserJoined = InnerEvent<'User joined'>;
type UserPlacedOrder = InnerEvent<'User placed an order'>;

type InnerEventEmitter = {
	emit(event: OrderCreated['name']): void;
	emit(event: OrderDeclined['name']): void;
	emit(event: UserJoined['name']): void;
	emit(event: UserPlacedOrder['name']): void;

	on(event: OrderCreated['name'], callback: () => void): void;
	on(event: OrderDeclined['name'], callback: () => void): void;
	on(event: UserJoined['name'], callback: () => void): void;
	on(event: UserPlacedOrder['name'], callback: () => void): void;
}

export const innerEventEmitter: InnerEventEmitter = new EventEmitter();
