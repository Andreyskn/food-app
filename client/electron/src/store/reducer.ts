import { Reducer } from 'redux';

import { USER_ID } from '../config';

import { AppState, AppUser } from 'alias/app';
import { Action } from './actions';

const usersData: Record<string, AppUser> = {
	'2': { id: '2', firstName: 'Юлия', lastName: 'Митина', image: '/images/avatars/2.png' },
	'3': { id: '3', firstName: 'Андрей', lastName: 'Скипин', image: '/images/avatars/3.png' },
	'6': { id: '6', firstName: 'Константин', lastName: 'Кузьмин', image: '/images/avatars/6.png' },
}

const initialState: AppState = {
	user: usersData[USER_ID],
	restaurants: [],
	activeOrder: null,
};

export const reducer: Reducer<AppState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDER':
			return { ...state, activeOrder: action.payload };

		case 'UPDATE_RESTAURANTS':
			return { ...state, restaurants: action.payload };
	
		default:
			return state;
	}
}
