import React, { useState } from 'react';
import { routes, initialRoute, RouteName } from './routes';

type RouterContextType = {
	goBack: () => void;
	navigateTo: (route: RouteName) => () => void;
}

export const RouterContext = React.createContext<RouterContextType>({ goBack: () => {}, navigateTo: () => () => {} });

export const Router: React.FC = () => {
	const [history, setHistory] = useState<RouteName[]>([]);
	const [currentRoute, setRoute] = useState(initialRoute);

	const goBack = () => {
		const newHistory = [...history];
		const [previousRoute] = newHistory.splice(-1, 1);

		setRoute(previousRoute);
		setHistory(newHistory);
	}

	const navigateTo = (route: RouteName) => () => {
		setRoute(route);
		setHistory([...history, currentRoute]);
	}

	return (
		<RouterContext.Provider value={{ goBack, navigateTo }}>
			{routes[currentRoute]}
		</RouterContext.Provider>
	)
}
