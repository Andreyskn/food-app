import { makeRoute } from './Route';
import { Home, ListOfPlaces, OrderStarted, OrderPlaced, Waiting, Declined, Delivered } from 'alias/views';

export type RouteName = keyof typeof routes;

export const initialRoute: RouteName = 'Home';

export const routes = {
	Home: makeRoute(Home, { noHeader: true }),
	ListOfPlaces: makeRoute(ListOfPlaces, { headerProps: { mode: 'back', background: 'accent' }, background: 'white' }),
	OrderStarted: makeRoute(OrderStarted),
	OrderPlaced: makeRoute(OrderPlaced),
	Waiting: makeRoute(Waiting),
	Declined: makeRoute(Declined),
	Delivered: makeRoute(Delivered)
}
