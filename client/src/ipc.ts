import { ipcRenderer, IpcRendererEvent } from 'electron';

import { UpdateState, GetInitialState, SelectRestaurant } from 'alias/electron';
import { AppState } from 'alias/app';
import { RouteName } from 'alias/router';

type IpcRenderer = {
	send(command: SelectRestaurant['name'], payload: SelectRestaurant['payload']): void;
	
	on(command: UpdateState['name'], listener: (event: IpcRendererEvent, payload: UpdateState['payload']) => void): void;

	sendSync(command: GetInitialState['name']): { initialState: AppState, initialRoute: RouteName };
}

export type IpcContext = { ipc: IpcRenderer };

export const ipc: IpcRenderer = ipcRenderer;

export const runIpcListener = (setState: any) => {
	ipc.on('UPDATE_STATE', (_, state) => setState(state));
}
