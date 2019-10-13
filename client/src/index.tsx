import { runApp } from 'alias/app';
import { ipc } from './ipc';

const { initialState, initialRoute } = ipc.sendSync('GET_INITIAL_STATE');

runApp(initialState, initialRoute);
