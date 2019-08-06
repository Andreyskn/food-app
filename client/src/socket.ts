// import io from 'socket.io-client';
import { StoreContextType } from 'alias/store';
// import { ClientSocket as Socket } from 'alias/shared';
import { ipcRenderer as ipc } from 'electron';

// console.log('remote', remote.getGlobal('socket'));

// export const socket: Socket = ipc;

// export type SocketContextType = { socket: Socket };

export const runSocket = (dispatch: StoreContextType['dispatch']) => {
	// socket.on('restaurant-list', payload => dispatch({ type: 'RESTAURANT_LIST', payload }));
	// socket.on('active-order', payload => dispatch({ type: 'ACTIVE_ORDER_DATA', payload }));
	ipc.send('loaded-app');
	ipc.on('sync-state', (_, payload) => dispatch({ type: 'ACTIVE_ORDER_DATA', payload }));
}
