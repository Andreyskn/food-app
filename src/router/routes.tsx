import React from 'react';
import { Home, Restaurants, OrderStarted, OrderPlaced, Waiting, Declined, Delivered } from 'views';

export type Route = {
	view: JSX.Element;
	header?: unknown;
}

export const initialRoute: keyof typeof routes = 'Home';

export const routes = {
	Home: {
		view: <Home />
	},
	Restaurants: {
		view: <Restaurants />
	},
	OrderStarted: {
		view: <OrderStarted />
	},
	OrderPlaced: {
		view: <OrderPlaced />
	},
	Waiting: {
		view: <Waiting />
	},
	Declined: {
		view: <Declined />
	},
	Delivered: {
		view: <Delivered />
	},
}
