import SocketIO from 'socket.io';
import { ServerSocket } from '../../../shared';

export type Socket = Omit<SocketIO.Socket, 'on' | 'emit'> & ServerSocket;
