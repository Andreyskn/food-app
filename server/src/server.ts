import { createServer } from 'http';
import express from 'express';
import SocketIO from 'socket.io';

import { config } from './config';
import { runSocket } from './socket';

const app = express();
const server = createServer(app);
const io = SocketIO(server);

app.use(express.static('public'));

runSocket(io);

server.listen(config.PORT, () => console.log(`Running on: ${config.PORT}`));
