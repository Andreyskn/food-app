import { createServer } from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import path from 'path';

import {
	ServerSocket as Socket,
	Order,
} from '../../shared';
import { db } from './fakeDB';

const app = express();
const server = createServer(app);
const io = SocketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../../public')));

const activeOrder: Order = {
	restaurant: db.restaurant('1'),
	status: 'new',
	orderEndTime: Date.now() + 30 * 60 * 1000,
	deliveryEndTime: Date.now() + 1.5 * 60 * 60 * 1000,
	participants: [
		{ ...db.user('1'), bill: 150 },
		{ ...db.user('6'), bill: 170 },
		{ ...db.user('2'), bill: 260 },
		{ ...db.user('4'), bill: 190 },
	],
	initiator: db.user('5'),
};

type SocketMetaData = {
	shouldSendRestaurants: boolean;
	shouldSendActiveOrder: boolean;
}

const socketMap = new Map();

const createSocketMeta = (socket: Socket, initialData: SocketMetaData) => {
	socketMap.set(socket, initialData);

	// FIXME: shouldn't be Partial
	const set = (value: Partial<SocketMetaData>) => {
		const data = socketMap.get(socket);
		socketMap.set(socket, { ...data, ...value });
	}

	const get = (key: keyof SocketMetaData) => {
		const data = socketMap.get(socket);
		return data[key];
	}

	const clear = () => socketMap.delete(socket);

	return { set, get, clear };
}

io.on('connection', (_socket) => {
	console.log('[<---] Connect');

	const socket: Socket = _socket;

	const meta = createSocketMeta(_socket, {
		shouldSendRestaurants: !activeOrder,
		shouldSendActiveOrder: activeOrder !== null,
	});

	socket.on('current view: Home', () => {
		console.log('[VIEW] Home');

		if (meta.get('shouldSendActiveOrder')) {
			console.log('[--->] Active Order');
			
			meta.set({ shouldSendActiveOrder: false });
			socket.emit('active-order', activeOrder);
		}
		else if (meta.get('shouldSendRestaurants')) {
			console.log('[--->] Restaurants List');

			meta.set({ shouldSendRestaurants: false });
			socket.emit('restaurant-list', db.restaurants());
		}

	});

	_socket.on('disconnect', () => {
		meta.clear();
	});
});

server.listen(port, () => {
	console.log(`Running on: ${port}`);
});
