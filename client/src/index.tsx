import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { noop } from 'alias/utils';
import { useRouter, RouterContextType, RouteName } from 'alias/router';
import { useStore, StoreContextType, AppState } from 'alias/store';
// import { socket, runSocket, SocketContextType } from './socket';
// import { runSocket } from './socket';
import { ipcRenderer as ipc } from 'electron';

// ipc.send('app-is-ready');
// ipc.on('run-app', (_, state, route) => runApp(state, route));

// type AppContextType = StoreContextType & RouterContextType & SocketContextType;
type AppContextType = StoreContextType & RouterContextType;

const defaultAppContext = {
	user: {} as any,
	dispatch: noop,
	goBack: noop,
	navigateTo: noop,
	// socket,
}

export const AppContext = React.createContext<AppContextType>(defaultAppContext);

const runApp = (initialState: AppState, initialRoute: RouteName) => {
	const App: React.FC = () => {
		const { Router, ...routerActions } = useRouter(initialRoute);
		const store = useStore(initialState);
	
		useEffect(() => {
			// runSocket(store.dispatch);
			ipc.on('sync-state', (_, payload) => store.dispatch({ type: 'SYNC_STATE', payload }));
		}, []);
	
		return (
			<AppContext.Provider value={{ ...store, ...routerActions }}>
				<Router />
			</AppContext.Provider>
		)
	}
	
	ReactDOM.render(<App />, document.getElementById('root'));
}
// @ts-ignore
runApp(...ipc.sendSync('ready-to-render'));
