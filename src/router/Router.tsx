import { useState } from 'react';
import { routes, initialRoute, RouteName } from './routes';

export type RouterContextType = {
	goBack: () => void;
	navigateTo: (route: RouteName) => void;
}

export const useRouter = () => {
	const [history, setHistory] = useState<RouteName[]>([]);
	const [currentRoute, setRoute] = useState(initialRoute);

	const goBack = () => {
		const newHistory = [...history];
		const [previousRoute] = newHistory.splice(-1, 1);

		setRoute(previousRoute);
		setHistory(newHistory);
	}

	const navigateTo = (route: RouteName) => {
		setRoute(route);
		setHistory([...history, currentRoute]);
	}

	return { goBack, navigateTo, routes, currentRoute };
}
