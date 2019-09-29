import { app, BrowserWindow, ipcMain } from 'electron';
import * as io from 'socket.io-client';
import { AppState } from '../src/store';

let win: any;
let socket = io.connect('http://localhost:3000', {query: 'userId=1'});
let state: AppState = {
	user: {
		firstName: 'Андрей',
		lastName: 'Фамилия',
		image: '/images/avatar.png',
		isInitiator: false,
		hasJoined: false,
		hasDeclined: false,
		bill: 320,
	},
};

function createWindow () {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	win.loadURL('http://localhost:8080/')

	win.webContents.openDevTools();
	
	win.on('closed', function () {
		win = null;
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

const syncState = () => win.webContents.send('sync-state', state);

const updateState = (data: any) => {
	state = { ...state, ...data };
	console.log(state)
	syncState();
}

socket.on('user-data', updateState);
socket.on('restaurant-list', updateState);
socket.on('active-order', updateState);

ipcMain.on('ready-to-render', (e) => {
	const initialRoute = state.activeOrder ? 'OrderStarted' : 'Home';
	e.returnValue = [state, initialRoute];
});

ipcMain.on('select-restaurant', (_, restaurantId) => {
	console.log(5)
	socket.emit('select-restaurant', restaurantId);
});
