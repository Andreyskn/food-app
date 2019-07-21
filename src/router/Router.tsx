import React, { useState } from 'react';
import { routes, initialRoute } from './routes';

type RouterContextType = {
	goBack: () => void;
	navigateTo: (route: keyof typeof routes) => () => void;
}
export const RouterContext = React.createContext<RouterContextType>({ goBack: () => {}, navigateTo: () => () => {} });

export const Router: React.FC = () => {
	const [history, setHistory] = useState<(keyof typeof routes)[]>([]);
	const [currentRoute, setRoute] = useState(initialRoute);

	const goBack = () => {
		setRoute(history[history.length - 1]);
	}

	const navigateTo = (route: keyof typeof routes) => () => {
		setHistory([...history, currentRoute]);
		setRoute(route);
	}

	return (
		<RouterContext.Provider value={{ goBack, navigateTo }}>
			{routes[currentRoute].view}
		</RouterContext.Provider>
	)
}
