import { Dispatch, SetStateAction } from 'react';
import {
	User, Restaurant, Order,
	UserIdleData, UserSelectingData, UserOrderedData, UserDeclinedData,
} from 'alias/shared';
import { RouterContext } from 'alias/router';
import { IpcContext } from '../ipc';

export type UserIdle = User & UserIdleData;

export type UserSelecting = User & UserSelectingData;

export type UserOrdered = User & UserOrderedData;

export type UserDeclined = User & UserDeclinedData;

export type AppUser = UserIdle | UserSelecting | UserOrdered | UserDeclined;

export type AppState = {
	user: AppUser;
	activeOrder: Order | null;
	restaurants: Restaurant[];
}

export type AppContextType = AppState & RouterContext & IpcContext;

export type SetAppState = Dispatch<SetStateAction<AppState>>;
