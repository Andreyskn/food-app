import { useState } from 'react';
import { routes, RouteName } from './routes';

export type GoBack = () => void;
export type NavigateTo = (route: RouteName) => void;

export type RouterContext = {
	goBack: GoBack;
	navigateTo: NavigateTo;
}

export const useRouter = (initialRoute: RouteName) => {
	const [history, setHistory] = useState<RouteName[]>([]);
	const [currentRoute, setRoute] = useState(initialRoute);

	const goBack = () => {
		if (!history.length) return;

		const newHistory = [...history];
		const previousRoute = newHistory.pop();
		
		setRoute(previousRoute!);
		setHistory(newHistory);
	}

	const navigateTo = (route: RouteName) => {
		if (route === currentRoute) return;

		setRoute(route);
		setHistory([...history, currentRoute]);
	}

	const Router = () => routes[currentRoute];

	return { Router, goBack, navigateTo };
}
