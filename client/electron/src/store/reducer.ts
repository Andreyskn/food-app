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
		case 'HYDRATE_STORE': {
			const { order, userData } = action.payload;

			return {
				...state,
				activeOrder: order,
				user: { ...state.user, ...userData }
			}
		}

		case 'CREATE_ORDER': {
			const order = action.payload;
			let user = state.user;

			if (state.user.id === order.host.id) {
				user = {
					...state.user,
					status: 'selecting',
					isHost: true,
				};
			}

			return {
				...state,
				user,
				activeOrder: action.payload
			};
		}

		case 'SET_DECLINED_STATUS': {
			return {
				...state,
				user: {
					...state.user,
					status: 'declined',
				}
			}
		}

		case 'JOIN_ORDER': {
			return {
				...state,
				user: {
					...state.user,
					status: 'selecting',
					isHost: false,
				}
			}
		}

		case 'UPDATE_ORDER':
			return { ...state, activeOrder: action.payload };

		case 'UPDATE_RESTAURANTS':
			return { ...state, restaurants: action.payload };
	
		default:
			const unhandled: never = action;
			console.log(`Unhandled action: ${JSON.stringify(unhandled)}`);
			return state;
	}
}
