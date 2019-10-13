import { IpcMain, IpcMainEvent, WebContents } from 'electron';
import { AppState } from 'alias/app';
import { Restaurant } from 'alias/shared';
import { RouteName } from 'alias/router';

type Command<N, P = undefined> = {
	name: N;
	payload: P;
}

export type GetInitialState = Command<
	'GET_INITIAL_STATE'
>

export type SelectRestaurant = Command<
	'SELECT_RESTAURANT',
	Restaurant['id']
>

export type UpdateState = Command<
	'UPDATE_STATE',
	AppState
>

export type IpcMain = {
	on(command: GetInitialState['name'], listener: (event: IpcMainEvent) => { initialState: AppState, initialRoute: RouteName }): void;
	on(command: SelectRestaurant['name'], listener: (event: IpcMainEvent, payload: SelectRestaurant['payload']) => void): void;
}

export type WebContents = {
	send(command: UpdateState['name'], payload: UpdateState['payload']): void;
}
