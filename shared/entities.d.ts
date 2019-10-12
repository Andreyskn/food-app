export type User = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
}

export type Participant = User & {
	bill?: number;
	status: 'selecting' | 'confirmed';
}

export type Restaurant = {
	id: string;
	link: string;

	name: string;
	logo: string;
	tileColor?: string;
	backgroundColor?: string;

	averagePrice: number;
	deliveryTime: number; // minutes
	totalOrders: number;
}

export type Order = {
	restaurant: Restaurant;
	status: 'selection' | 'delivery' | 'payment';
	orderEndTime: number; // timestamp
	deliveryEndTime?: number; // timestamp
	participants: Participant[];
	initiator: User;
}
