import { app, BrowserWindow } from 'electron';
import { runIpcHandler } from './ipc';

let win: BrowserWindow;

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

	runIpcHandler(win);
	
	win.on('closed', () => {
		(win as any) = null;
	});
}

app.on('ready', createWindow);
