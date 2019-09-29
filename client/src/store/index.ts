import { useReducer } from 'react';
import { AppState } from './types';
import { Actions } from './actions';

// export const initialState: AppState = {
	// user: {
	// 	firstName: 'Андрей',
	// 	lastName: 'Фамилия',
	// 	image: require('../../.storybook/utils/avatar.png'),
	// 	isInitiator: false,
	// 	hasJoined: false,
	// 	hasDeclined: false,
	// 	bill: 320,
	// },
	// activeOrder: {
	// 	restaurant: {
	// 		name: 'Гриль зона "Гарик"',
	// 		link: 'http://garikgrill.ru/#!/',
	// 		logo: require('../assets/images/Logo-1.png'),
	// 		totalOrders: 112,
	// 		averagePrice: 180,
	// 		deliveryTime: 70,
	// 		backgroundColor: 'black',
	// 	},
	// 	status: 'new',
	// 	orderEndTime: Date.now() + 30 * 60 * 1000,
	// 	deliveryEndTime: Date.now() + 1.5 * 60 * 60 * 1000,
	// 	participants: [
	// 		{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 150 },
	// 		{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 170 },
	// 		{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 260 },
	// 		{ firstName: 'Имя', lastName: 'Фамилия', image: require('../../.storybook/utils/avatar.png'), bill: 190 },
	// 	],
	// 	initiator: {
	// 		firstName: 'Имя',
	// 		lastName: 'Фамилия',
	// 		image: require('../../.storybook/utils/avatar.png'),
	// 	},
	// },
	// restaurants: [
	// 	{
	// 		id: '1',
	// 		name: 'Гриль зона "Гарик"',
	// 		logo: require('../assets/images/Logo-1.png'),
	// 		deliveryTime: 90,
	// 		averagePrice: 240,
	// 		backgroundColor: 'black',
	// 	},
	// 	{
	// 		id: '2',
	// 		name: 'Янцзы',
	// 		logo: require('../assets/images/Logo-2.png'),
	// 		deliveryTime: 110,
	// 		averagePrice: 200,
	// 	},
	// 	{
	// 		id: '3',
	// 		name: 'Рыба. Рис',
	// 		logo: require('../assets/images/Logo-3.png'),
	// 		deliveryTime: 120,
	// 		averagePrice: 260,
	// 	},
	// 	{
	// 		id: '4',
	// 		name: 'Хан Буз',
	// 		logo: require('../assets/images/Logo-4.png'),
	// 		deliveryTime: 70,
	// 		averagePrice: 180,
	// 		tileColor: '#c21f22',
	// 		backgroundColor: '#c21f22',
	// 	},
	// ]
// }

export type StoreContextType = AppState & {
	dispatch: React.Dispatch<Actions>;
};

const reducer = (state: AppState, action: Actions) => {
	switch (action.type) {
		// case 'RESTAURANT_LIST':
		// case 'ACTIVE_ORDER_DATA':
		case 'SYNC_STATE':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export const useStore = (initialState: AppState) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return { ...state, dispatch };
}

export * from './types';
