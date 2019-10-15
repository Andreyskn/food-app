import EventEmitter from 'events';

type InnerEvent<N, P = undefined> = {
	name: N;
	payload: P;
}

type OrderCreated = InnerEvent<
	'Order created'
>

type InnerEventEmitter = {
	emit(event: OrderCreated['name']): void;

	on(event: OrderCreated['name'], callback: () => void): void;
}

export const innerEventEmitter: InnerEventEmitter = new EventEmitter();
