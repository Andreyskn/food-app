import { IpcMain, IpcMainEvent, WebContents, IpcRendererEvent } from 'electron';

import { AppState } from 'alias/app';
import { Restaurant } from 'alias/shared';
import { RouteName } from 'alias/router';

type Command<N, P = undefined> = {
	name: N;
	payload: P;
}

type GetInitialState = Command<'GET_INITIAL_STATE'>;
type SelectRestaurant = Command<'SELECT_RESTAURANT', Restaurant['id']>;
type DeclineOrder = Command<'DECLINE_ORDER'>;

type UpdateState = Command<'UPDATE_STATE', AppState>;
type ChangeView = Command<'CHANGE_VIEW', RouteName>;

export type IpcRenderer = {
	on(command: UpdateState['name'], listener: (event: IpcRendererEvent, payload: UpdateState['payload']) => void): void;
	on(command: ChangeView['name'], listener: (event: IpcRendererEvent, payload: ChangeView['payload']) => void): void;
	
	send(command: SelectRestaurant['name'], payload: SelectRestaurant['payload']): void;
	send(command: DeclineOrder['name']): void;
	
	sendSync(command: GetInitialState['name']): { initialState: AppState, initialRoute: RouteName };
}

export type IpcMain = {
	on(command: GetInitialState['name'], listener: (event: IpcMainEvent) => { initialState: AppState, initialRoute: RouteName }): void;
	on(command: SelectRestaurant['name'], listener: (event: IpcMainEvent, payload: SelectRestaurant['payload']) => void): void;
	on(command: DeclineOrder['name'], listener: () => void): void;
}

export type WebContents = {
	send(command: UpdateState['name'], payload: UpdateState['payload']): void;
	send(command: ChangeView['name'], payload: ChangeView['payload']): void;
}
