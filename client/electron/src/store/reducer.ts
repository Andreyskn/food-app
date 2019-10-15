import { Reducer } from 'redux';

import { USER_ID } from '../config';

import { AppState, AppUser } from 'alias/app';
import { Action } from './actions';

const usersData: Record<string, AppUser> = {
	'2': { id: '2', firstName: 'Юлия', lastName: 'Митина', image: '/images/avatars/2.png', status: 'idle' },
	'3': { id: '3', firstName: 'Андрей', lastName: 'Скипин', image: '/images/avatars/3.png', status: 'idle' },
	'6': { id: '6', firstName: 'Константин', lastName: 'Кузьмин', image: '/images/avatars/6.png', status: 'idle' },
}

const initialState: AppState = {
	user: usersData[USER_ID],
	restaurants: [],
	activeOrder: null,
};

export const reducer: Reducer<AppState, Action> = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ORDER': {
			const order = action.payload;
			const { user } = state;
			let userStatus = user.status;

			if (user.id === order.host.id) {
				userStatus = 'host';
			}
			else if (order.participants.find(p => p.id === user.id)) {
				userStatus = 'joined';
			}

			return {
				...state,
				user: {
					...state.user,
					status: userStatus,
				},
				activeOrder: action.payload
			};
		}

		case 'UPDATE_RESTAURANTS':
			return { ...state, restaurants: action.payload };
	
		default:
			return state;
	}
}
