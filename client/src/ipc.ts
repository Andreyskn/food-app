import { ipcRenderer } from 'electron';
import { IpcRenderer } from 'alias/electron';
import { SetAppState } from 'alias/app';
import { NavigateTo } from 'alias/router';

export type IpcContext = { ipc: IpcRenderer };

export const ipc: IpcRenderer = ipcRenderer;

export const runIpcListener = (setState: SetAppState, navigateTo: NavigateTo) => {
	ipc.on('UPDATE_STATE', (_, state) => setState(state));
	ipc.on('CHANGE_VIEW', (_, routeName) => navigateTo(routeName));
}
