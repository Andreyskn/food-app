"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = http_1.createServer(app);
const io = socket_io_1.default(server);
const port = process.env.PORT || 3000;
app.use(express_1.default.static(__dirname + '/public'));
const restaurants = [
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
const activeOrder = {
    restaurant: {
        name: 'Гриль зона "Гарик"',
        link: 'http://garikgrill.ru/#!/',
        logo: '/images/Logo-1.png',
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
const socketMap = new Map();
const createSocketMeta = (socket, initialData) => {
    socketMap.set(socket, initialData);
    // FIXME: shouldn't be Partial
    const set = (value) => {
        const data = socketMap.get(socket);
        socketMap.set(socket, Object.assign({}, data, value));
    };
    const get = (key) => {
        const data = socketMap.get(socket);
        return data[key];
    };
    const clear = () => socketMap.delete(socket);
    return { set, get, clear };
};
io.on('connection', (_socket) => {
    console.log('--- CONNECT ---');
    const socket = _socket;
    const meta = createSocketMeta(_socket, {
        shouldSendRestaurants: !activeOrder,
        shouldSendActiveOrder: activeOrder !== null,
    });
    socket.on('current view: Home', () => {
        console.log('current view: Home');
        if (meta.get('shouldSendActiveOrder')) {
            meta.set({ shouldSendActiveOrder: false });
            socket.emit('active-order', { activeOrder });
        }
        else if (meta.get('shouldSendRestaurants')) {
            meta.set({ shouldSendRestaurants: false });
            socket.emit('restaurant-list', { restaurants });
        }
    });
    _socket.on('disconnect', () => {
        meta.clear();
    });
});
server.listen(port, () => {
    console.log('Running server on port', port);
});
//# sourceMappingURL=server.js.map