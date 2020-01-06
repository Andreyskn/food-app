import { ipcMain, BrowserWindow } from 'electron';
import memoize from 'memoize-one';

import { RouteName } from 'alias/router'
import { Order } from 'alias/shared'
import { AppUser } from 'alias/app';
import { store, dispatch, setDeclineStatus, joinOrder, placeOrder } from '../store';
import { socket } from '../socket';
import { IpcMain, WebContents } from './types';
import { innerEventEmitter } from '../eventEmitter';

export const runIpcHandler = (win: BrowserWindow) => {
	const webContents: WebContents = win.webContents;

	const updateState = () => webContents.send('UPDATE_STATE', store.getState());

	const updateStateOnce = memoize((userStatus: AppUser['status']) => updateState());

	store.subscribe(() => {
		const { user } = store.getState();

		if (user.status === 'selecting') {
			return updateStateOnce(user.status);
		}

		updateState();
	});

	const navigateTo = (view: RouteName) => webContents.send('NAVIGATE_TO', view);

	innerEventEmitter.on('Order created', () => {
		const { user } = store.getState();
		const nextView: RouteName = user.status === 'selecting' ? 'OrderSelection' : 'OrderStarted';

		navigateTo(nextView);
	});

	innerEventEmitter.on('Order declined', () => {
		navigateTo('Declined');
	});

	innerEventEmitter.on('User joined', () => {
		navigateTo('OrderSelection');
	});

	innerEventEmitter.on('User placed an order', () => {
		navigateTo('OrderPlaced');
	});
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
	socket.emit('Restaurant chosen', restaurantId);
});

ipc.on('DECLINE_ORDER', () => {
	dispatch(setDeclineStatus());
	socket.emit('Order declined');
});

ipc.on('JOIN_ORDER', () => {
	dispatch(joinOrder());
	socket.emit('User joined');
});

ipc.on('PLACE_ORDER', (_, order) => {
	dispatch(placeOrder(order));
	socket.emit('User placed an order', order);
});
