import { app, BrowserWindow, ipcMain } from 'electron';
import * as io from 'socket.io-client';
import { AppState } from '../src/store';

let win: any;
let socket = io.connect('http://localhost:3000', { query: 'userId=3' });
let state: AppState = {
	user: {
		id: '3',
		firstName: 'Андрей',
		lastName: 'Скипин',
		image: '/images/avatars/3.png',
	},
	restaurants: [],
	activeOrder: null,
};

const createWindow = () => {
	win = new BrowserWindow({
		width: 1400,
		height: 800,
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

socket.on('restaurant-list', (restaurants) => updateState({ restaurants }));
socket.on('active-order', (activeOrder) => updateState({ activeOrder }));

ipcMain.on('ready-to-render', (e) => {
	const initialRoute = state.activeOrder ? 'OrderStarted' : 'Home';
	e.returnValue = [state, initialRoute];
	socket.emit('current view: Home');
});

ipcMain.on('select-restaurant', (_, restaurantId) => {
	socket.emit('Restaurant chosen', restaurantId);
});
