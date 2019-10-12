import { app, BrowserWindow, ipcMain } from 'electron';
import SocketIOClient from 'socket.io-client';
import { AppState } from '../src/store';
import { ClientSocket } from '../../shared';

export type Socket = Omit<SocketIOClient.Socket, 'on' | 'emit'> & ClientSocket;

const userId = process.env.APP_USER_ID!;

const usersData = {
	2: { id: '2', firstName: 'Юлия', lastName: 'Митина', image: '/images/avatars/2.png' },
	3: { id: '3', firstName: 'Андрей', lastName: 'Скипин', image: '/images/avatars/3.png' },
	6: { id: '6', firstName: 'Константин', lastName: 'Кузьмин', image: '/images/avatars/6.png' },
}

let win: any;
let socket: Socket = SocketIOClient.connect('http://localhost:3000', { query: `userId=${userId}` });
let state: AppState = {
	user: usersData[userId],
	restaurants: [],
	activeOrder: null,
};

const createWindow = () => {
	win = new BrowserWindow({
		width: 1000,
		height: 700,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadURL('http://localhost:8080/');

	win.webContents.openDevTools();
	
	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

const syncState = () => win.webContents.send('sync-state', state);

const updateState = (data: any) => {
	state = { ...state, ...data };
	syncState();
}

socket.on('Active order exists', (activeOrder) => updateState({ activeOrder }));
socket.on('Active order absent', (restaurants) => updateState({ restaurants }));
socket.on('Order created', (activeOrder) => updateState({ activeOrder }));

ipcMain.on('ready-to-render', (e) => {
	const initialRoute = state.activeOrder ? 'OrderStarted' : 'Home';
	e.returnValue = [state, initialRoute];
});

ipcMain.on('select-restaurant', (_, restaurantId) => {
	socket.emit('Restaurant chosen', { restaurantId });
});
