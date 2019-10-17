import { UsersState, UserId } from './types';

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
}
