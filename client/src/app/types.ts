import { Dispatch, SetStateAction } from 'react';
import { User, Restaurant, Order } from 'alias/shared';
import { RouterContext } from 'alias/router';
import { IpcContext } from '../ipc';

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

export type AppContextType = AppState & RouterContext & IpcContext;

export type SetAppState = Dispatch<SetStateAction<AppState>>;
