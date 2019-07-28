import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { noop } from 'alias/utils';
import { useRouter, RouterContextType } from 'alias/router';
import { useStore, StoreContextType, initialState } from 'alias/store';

type AppContextType = StoreContextType & RouterContextType;

const defaultAppContext = {
	...initialState,
	dispatch: noop,
	goBack: noop,
	navigateTo: noop,
}

export const AppContext = React.createContext<AppContextType>(defaultAppContext);

const App: React.FC = () => {
	const store = useStore();
	const { Router, ...routerActions } = useRouter();

	return (
		<AppContext.Provider value={{...store, ...routerActions}}>
			<Router />
		</AppContext.Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
