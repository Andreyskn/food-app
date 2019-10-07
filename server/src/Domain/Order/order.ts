type Timestamp = number;

type Order = {
	id: string;
	status: 'selection' | 'delivery' | 'payment' | 'done';

	participants: string[];
	host: string;

	restaurant: string;

	timers: {
		orderEndTime: Timestamp; 
		deliveryEndTime?: Timestamp;
	};
}

type OrderDev = Partial<Order>;

const state: OrderDev = {

}
