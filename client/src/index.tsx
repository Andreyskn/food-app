import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { noop } from 'alias/utils';
import { useRouter, RouterContextType } from 'alias/router';
import { useStore, StoreContextType, initialState } from 'alias/store';
// import { socket, runSocket, SocketContextType } from './socket';
import { runSocket } from './socket';
import { remote } from 'electron';

const state = remote.getGlobal('state');


// type AppContextType = StoreContextType & RouterContextType & SocketContextType;
type AppContextType = StoreContextType & RouterContextType;

const defaultAppContext = {
	...initialState,
	dispatch: noop,
	goBack: noop,
	navigateTo: noop,
	// socket,
}

export const AppContext = React.createContext<AppContextType>(defaultAppContext);

const App: React.FC = () => {
	const { Router, ...routerActions } = useRouter();
	const store = useStore(state);

	useEffect(() => {
		runSocket(store.dispatch);
	}, []);

	return (
		<AppContext.Provider value={{ ...store, ...routerActions }}>
			<Router />
		</AppContext.Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
