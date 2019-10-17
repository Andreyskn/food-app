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
type JoinOrder = Command<'JOIN_ORDER'>;

type UpdateState = Command<'UPDATE_STATE', AppState>;
type NavigateTo = Command<'NAVIGATE_TO', RouteName>;

export type IpcRenderer = {
	on(command: UpdateState['name'], listener: (event: IpcRendererEvent, payload: UpdateState['payload']) => void): void;
	on(command: NavigateTo['name'], listener: (event: IpcRendererEvent, payload: NavigateTo['payload']) => void): void;
	
	send(command: SelectRestaurant['name'], payload: SelectRestaurant['payload']): void;
	send(command: DeclineOrder['name']): void;
	send(command: JoinOrder['name']): void;
	
	sendSync(command: GetInitialState['name']): { initialState: AppState, initialRoute: RouteName };
}

export type IpcMain = {
	on(command: GetInitialState['name'], listener: (event: IpcMainEvent) => { initialState: AppState, initialRoute: RouteName }): void;
	on(command: SelectRestaurant['name'], listener: (event: IpcMainEvent, payload: SelectRestaurant['payload']) => void): void;
	on(command: DeclineOrder['name'], listener: () => void): void;
	on(command: JoinOrder['name'], listener: () => void): void;
}

export type WebContents = {
	send(command: UpdateState['name'], payload: UpdateState['payload']): void;
	send(command: NavigateTo['name'], payload: NavigateTo['payload']): void;
}
