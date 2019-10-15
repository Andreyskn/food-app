import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import '../styles/index.scss';

import { noop } from 'alias/utils';
import { useRouter, RouteName } from 'alias/router';
import { AppState, AppContextType } from './types';
import { ipc, runIpcListener } from '../ipc';

export const AppContext = React.createContext<AppContextType>({
	user: {} as any,
	goBack: noop,
	navigateTo: noop,
	activeOrder: null,
	restaurants: [],
	ipc,
});

export const runApp = (initialState: AppState, initialRoute: RouteName) => {
	const App: React.FC = () => {
		const { Router, goBack, navigateTo } = useRouter(initialRoute);
		const [state, setState] = useState<AppState>(initialState);

		useEffect(() => {
			runIpcListener(setState, navigateTo);
		}, []);

		return (
			<AppContext.Provider value={{ ...state, goBack, navigateTo, ipc }}>
				<Router />
			</AppContext.Provider>
		)
	}

	ReactDOM.render(<App />, document.getElementById('root'));
}
