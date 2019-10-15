import { ipcMain, BrowserWindow } from 'electron';

import { RouteName } from 'alias/router'
import { store } from '../store';
import { socket } from '../socket';
import { IpcMain, WebContents } from './types';
import { innerEventEmitter } from '../eventEmitter';

export const runIpcHandler = (win: BrowserWindow) => {
	const webContents: WebContents = win.webContents;

	store.subscribe(() => {
		webContents.send('UPDATE_STATE', store.getState());
	});

	innerEventEmitter.on('Order created', () => {
		const { user } = store.getState();
		const nextView: RouteName = user.status === 'host' ? 'OrderSelection' : 'OrderStarted';

		webContents.send('CHANGE_VIEW', nextView);
	});
}

const ipc: IpcMain = ipcMain;

ipc.on('GET_INITIAL_STATE', (event) => {
	const initialState = store.getState();
	const initialRoute: RouteName = initialState.activeOrder ? 'OrderStarted' : 'Home';

	const returnValue = { initialState, initialRoute };
	event.returnValue = returnValue;
	return returnValue;
});

ipc.on('SELECT_RESTAURANT', (_, restaurantId) => {
	socket.emit('Restaurant chosen', { restaurantId });
});
