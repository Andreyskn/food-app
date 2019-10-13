import { useState } from 'react';
import { routes, RouteName } from './routes';

export type RouterContext = {
	goBack: () => void;
	navigateTo: (route: RouteName) => void;
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
		setRoute(route);
		setHistory([...history, currentRoute]);
	}

	const Router = () => routes[currentRoute];

	return { Router, goBack, navigateTo };
}
