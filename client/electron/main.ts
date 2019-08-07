import { app, BrowserWindow, ipcMain } from 'electron';
import * as io from 'socket.io-client';

let win: any;
let socket = io.connect('http://localhost:3000');
let state: any = {
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
	syncState();
}

socket.on('restaurant-list', updateState);
socket.on('active-order', updateState);

ipcMain.on('ready-to-render', (e) => {
	// e.reply('run-app', state)
	const initialRoute = state.activeOrder ? 'OrderStarted' : 'Home';
	e.returnValue = [state, initialRoute];
});
