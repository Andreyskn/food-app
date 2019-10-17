import { ipcMain, BrowserWindow } from 'electron';

import { RouteName } from 'alias/router'
import { Order } from 'alias/shared'
import { store, dispatch, setDeclineStatus } from '../store';
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
		const nextView: RouteName = user.status === 'selecting' ? 'OrderSelection' : 'OrderStarted';

		webContents.send('CHANGE_VIEW', nextView);
	});

	innerEventEmitter.on('Order declined', () => {
		webContents.send('CHANGE_VIEW', 'Declined');
	})
}

const ipc: IpcMain = ipcMain;

ipc.on('GET_INITIAL_STATE', (event) => {
	const initialState = store.getState();
	const { user, activeOrder } = initialState;

	let initialRoute: RouteName = 'Home';

	switch (user.status) {
		case 'declined':
			initialRoute = 'Declined';
			break;
		case 'idle':
			initialRoute = activeOrder ? 'OrderStarted' : 'Home';
			break;
		case 'selecting':
			initialRoute = 'OrderSelection';
			break;
		case 'ordered': {
			const order = activeOrder as Order;

			switch (order.status) {
				case 'selection':
					initialRoute = 'OrderPlaced';
					break;
				case 'delivery':
					initialRoute = 'Waiting';
					break;
				case 'payment':
					initialRoute = 'Delivered';
					break;
			}
			break;
		}
	}

	const returnValue = { initialState, initialRoute };
	event.returnValue = returnValue;
	return returnValue;
});

ipc.on('SELECT_RESTAURANT', (_, restaurantId) => {
	socket.emit('Restaurant chosen', { restaurantId });
});

ipc.on('DECLINE_ORDER', () => {
	dispatch(setDeclineStatus());
	socket.emit('Order declined');
});
