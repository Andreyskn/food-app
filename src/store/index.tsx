import { useReducer } from 'react';
import { AppState, Actions } from './types';

export const initialState: AppState = {
	user: {
		firstName: 'Имя',
		lastName: 'Фамилия',
		image: require('../../.storybook/utils/avatar.png'),
		isInitiator: false,
		hasJoined: false,
		hasDeclined: false,
		bill: 320,
	},
	activeOrder: {
		restaurant: {
			name: 'Гриль зона "Гарик"',
			image: require('../assets/images/Logo-1.png'),
			totalOrders: 112,
			averagePrice: 180,
			deliveryTime: 70,
		},
		status: 'new',
		orderEndTime: Date.now() + 30 * 60 * 1000,
		deliveryEndTime: Date.now() + 1.5 * 60 * 60 * 1000,
		participants: [
			{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 150 },
			{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 170 },
			{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 260 },
			{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 190 },
		],
		initiator: {
			firstName: 'Имя',
			lastName: 'Фамилия',
			image: require('../../.storybook/utils/avatar.png'),
		},
	}
}

export type StoreContextType = AppState & {
	dispatch: React.Dispatch<Actions>;
};

const reducer = (state: AppState) => state;

export const useStore = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return { ...state, dispatch };
}
