import { ipcMain, BrowserWindow } from 'electron';

import { RouteName } from 'alias/router'
import { store } from '../store';
import { socket } from '../socket';
import { IpcMain, WebContents } from './types';


export const runIpcHandler = (win: BrowserWindow) => {
	const webContents: WebContents = win.webContents;

	store.subscribe(
		() => webContents.send('UPDATE_STATE', store.getState())
	);
}

const ipc: IpcMain = ipcMain;

ipc.on('GET_INITIAL_STATE', (event) => {
	const initialState = store.getState();
	const initialRoute: RouteName = initialState.activeOrder ? 'OrderStarted' : 'Home';

	const returnValue = { initialState, initialRoute };
	event.returnValue = returnValue;
	return returnValue;
})

ipc.on('SELECT_RESTAURANT', (_, restaurantId) => {
	socket.emit('Restaurant chosen', { restaurantId });
})
