import { UserId } from '../users';

export type Timestamp = number;
export type Minutes = number;
export type RestaurantId = string;

export type OrderData = {
	restaurant: RestaurantId;
	participants: UserId[];
	host: UserId;
}

export type OrderIdle = {
	status: 'idle';
}

export type OrderSelection = OrderData & {
	status: 'selection';
	selectionEndsAt: Timestamp;
}

export type OrderDelivery = OrderData & {
	status: 'delivery';
	deliveryExpectedAt: Timestamp;
}

export type OrderPayment = OrderData & {
	status: 'payment';
}

export type OrderFinished = OrderData & {
	status: 'finished';
}

export type OrderActive = OrderSelection | OrderDelivery | OrderPayment;

export type OrderState = OrderIdle | OrderActive | OrderFinished;

