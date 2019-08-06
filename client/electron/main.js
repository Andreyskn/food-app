// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const io = require('socket.io-client');

let win;
global.socket = io.connect('http://localhost:3000');
global.state = {
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

	// and load the index.html of the app.
	win.loadURL('http://localhost:8080/')

	// Open the DevTools.
	win.webContents.openDevTools();
	
	// Emitted when the window is closed.
	win.on('closed', function () {
		win = null;
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) createWindow()
})

const syncState = () => win.webContents.send('sync-state', state);

const updateState = (data) => {
	state = { ...state, ...data };
	syncState();
}

socket.on('restaurant-list', updateState);
socket.on('active-order', updateState);

ipcMain.on('loaded-app', () => {
	syncState();
});
