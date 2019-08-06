import { createServer } from 'http';
import express from 'express';
import SocketIO from 'socket.io';
import { ClientState, ServerSocket as Socket } from '../../shared';

const app = express();
const server = createServer(app);
const io = SocketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const restaurants: ClientState['restaurants'] = [
	{
		id: '1',
		name: 'Гриль зона "Гарик"',
		logo: '/images/Logo-1.png',
		deliveryTime: 90,
		averagePrice: 240,
		backgroundColor: 'black',
	},
	{
		id: '2',
		name: 'Янцзы',
		logo: '/images/Logo-2.png',
		deliveryTime: 110,
		averagePrice: 200,
	},
	{
		id: '3',
		name: 'Рыба. Рис',
		logo: '/images/Logo-3.png',
		deliveryTime: 120,
		averagePrice: 260,
	},
	{
		id: '4',
		name: 'Хан Буз',
		logo: '/images/Logo-4.png',
		deliveryTime: 70,
		averagePrice: 180,
		tileColor: '#c21f22',
		backgroundColor: '#c21f22',
	},
];

const activeOrder: ClientState['activeOrder'] = {
	restaurant: {
		name: 'Гриль зона "Гарик"',
		link: 'http://garikgrill.ru/#!/',
		logo: 'http://localhost:3000/images/Logo-1.png',
		totalOrders: 112,
		averagePrice: 180,
		deliveryTime: 70,
		backgroundColor: 'black',
	},
	status: 'new',
	orderEndTime: Date.now() + 30 * 60 * 1000,
	deliveryEndTime: Date.now() + 1.5 * 60 * 60 * 1000,
	participants: [
		{ firstName: 'Имя', lastName: 'Фамилия', image: '/images/avatar.png', bill: 150 },
		{ firstName: 'Имя', lastName: 'Фамилия', image: '/images/avatar.png', bill: 170 },
		{ firstName: 'Имя', lastName: 'Фамилия', image: '/images/avatar.png', bill: 260 },
		{ firstName: 'Имя', lastName: 'Фамилия', image: '/images/avatar.png', bill: 190 },
	],
	initiator: {
		firstName: 'Имя',
		lastName: 'Фамилия',
		image: '/images/avatar.png',
	},
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

const initialData: SocketMetaData = {
	shouldSendRestaurants: !activeOrder,
	shouldSendActiveOrder: activeOrder !== null,
}

io.on('connection', (_socket) => {
	console.log('--- CONNECT ---');

	const socket: Socket = _socket;

	const meta = createSocketMeta(_socket, initialData);

	// socket.on('current view: Home', () => {
	// 	console.log('current view: Home', meta.get('shouldSendActiveOrder'), meta.get('shouldSendRestaurants'));

	// 	if (meta.get('shouldSendActiveOrder')) {
	// 		meta.set({ shouldSendActiveOrder: false });
	// 		socket.emit('active-order', { activeOrder });
	// 	}
	// 	else if (meta.get('shouldSendRestaurants')) {
	// 		meta.set({ shouldSendRestaurants: false });
	// 		socket.emit('restaurant-list', { restaurants });
	// 	}

	// });

	if (meta.get('shouldSendActiveOrder')) {
		meta.set({ shouldSendActiveOrder: false });
		socket.emit('active-order', { activeOrder });
	}
	else if (meta.get('shouldSendRestaurants')) {
		meta.set({ shouldSendRestaurants: false });
		socket.emit('restaurant-list', { restaurants });
	}

	_socket.on('reset', () => {
		console.log('--- reset ---');
		meta.set(initialData);
	})

	_socket.on('disconnect', () => {
		meta.clear();
	});
});

server.listen(port, () => {
	console.log('Running server on port', port);
});
