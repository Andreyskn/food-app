import { makeRoute } from './Route';
import { Home, Restaurants, OrderStarted, OrderPlaced, Waiting, Declined, Delivered } from 'views';

export type RouteName = keyof typeof routes;

export const initialRoute: RouteName = 'Home';

export const routes = {
	Home: makeRoute(Home, { noHeader: true }),
	Restaurants: makeRoute(Restaurants, { headerProps: { mode: 'back' }, background: 'white' }),
	OrderStarted: makeRoute(OrderStarted),
	OrderPlaced: makeRoute(OrderPlaced),
	Waiting: makeRoute(Waiting),
	Declined: makeRoute(Declined),
	Delivered: makeRoute(Delivered)
}
