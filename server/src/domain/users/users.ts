import { UsersState, UserId } from './types';

let state: UsersState = {};

export const users = {
	createUser: (id: UserId) => {
		state[id] = {
			status: 'selecting',
			id,
		}
		return state;
	},
	setDeclinedStatus: (id: UserId) => {
		state[id] = {
			status: 'declined',
			id,
		}
		return state;
	}
}
