import { UsersState, UserId, UsersOrder } from './types';

let state: UsersState = {};

export const users = {
	setDeclinedStatus: (id: UserId) => {
		state[id] = {
			status: 'declined',
			id,
		}
		return state;
	},

	setSelectingStatus: (id: UserId) => {
		state[id] = {
			status: 'selecting',
			id,
		}
		return state;
	},

	setOrderedStatus: (id: UserId, order: UsersOrder) => {
		state[id] = {
			status: 'ordered',
			id,
			order,
		}
		return state;
	},
}
