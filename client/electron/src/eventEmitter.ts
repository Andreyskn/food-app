import EventEmitter from 'events';

type InnerEvent<N, P = undefined> = {
	name: N;
	payload: P;
}

type OrderCreated = InnerEvent<'Order created'>;
type OrderDeclined = InnerEvent<'Order declined'>;

type InnerEventEmitter = {
	emit(event: OrderCreated['name']): void;
	emit(event: OrderDeclined['name']): void;

	on(event: OrderCreated['name'], callback: () => void): void;
	on(event: OrderDeclined['name'], callback: () => void): void;
}

export const innerEventEmitter: InnerEventEmitter = new EventEmitter();
