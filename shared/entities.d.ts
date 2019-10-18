export type User = {
	id: string;
	firstName: string;
	lastName: string;
	image: string;
}

export type Participant = User & {
	status: 'selecting' | 'ordered';
	bill?: number;
}

export type UserIdleData = {
	status: 'idle',
}

export type UserSelectingData = {
	status: 'selecting',
	isHost: boolean;
}

export type UserOrderedData = {
	status: 'ordered',
	bill: number;
	order: UsersOrder;
	isHost: boolean;
}

export type UserDeclinedData = {
	status: 'declined',
}

export type UserData = UserIdleData | UserSelectingData | UserOrderedData | UserDeclinedData;

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
	status: 'selection' | 'delivery' | 'payment';

	host: User;
	participants: Participant[];
	restaurant: Restaurant;

	selectionEndsAt?: number; // timestamp
	deliveryExpectedAt?: number; // timestamp
}

export type UsersOrder = any;
