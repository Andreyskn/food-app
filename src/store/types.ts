export type BasicUserData = {
	firstName: string;
	lastName: string;
	image: string;
}

export type User = BasicUserData & {
	bill?: number;
	isInitiator?: boolean;
	hasJoined?: boolean;
	hasDeclined?: boolean;
}

export type Participant = BasicUserData & {
	bill?: number;
}

export type Restaurant = {
	name: string;
	image: string;
	totalOrders: number;
	averagePrice?: number;
	deliveryTime?: number; // minutes
}

export type Order = {
	restaurant: Restaurant;
	status: 'new' | 'delivery' | 'done';
	orderEndTime: number; // timestamp
	deliveryEndTime?: number; // timestamp
	participants: Participant[];
	initiator?: BasicUserData;
}

export type AppState = {
	user: User;
	activeOrder?: Order;
}

export type Actions = any;
