import { User, Restaurant, Order } from "alias/shared";

export type AppUser = User & {
	bill?: number;
	isInitiator?: boolean;
	hasJoined?: boolean;
	hasDeclined?: boolean;
}

export type AppState = {
	user: AppUser;
	activeOrder: Order | null;
	restaurants: Restaurant[];
}
