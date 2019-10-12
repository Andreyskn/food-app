export type Timestamp = number;
export type RestaurantId = string;
export type UserId = import('../users').UserId;

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

export type OrderState = OrderIdle | OrderSelection | OrderDelivery | OrderPayment | OrderFinished;
