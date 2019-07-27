type BasicUserData = {
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

type BasicRestaurantData = {
	name: string;
	logo: string;
	averagePrice?: number;
	deliveryTime?: number; // minutes
	backgroundColor?: string;
}

export type SelectedRestaurant = BasicRestaurantData & {
	link: string;
	totalOrders: number;
}

export type Order = {
	restaurant: SelectedRestaurant;
	status: 'new' | 'delivery' | 'done';
	orderEndTime: number; // timestamp
	deliveryEndTime?: number; // timestamp
	participants: Participant[];
	initiator?: BasicUserData;
}

export type RestaurantOption = BasicRestaurantData & {
	id: string;
	tileColor?: string;
}

export type AppState = {
	user: User;
	activeOrder?: Order;
	restaurants?: RestaurantOption[];
}

export type Actions = any;
