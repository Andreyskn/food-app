import { useReducer } from 'react';
import { AppState } from './types';
import { Actions } from './actions';

export * from './types';

export type StoreContextType = AppState & {
	dispatch: React.Dispatch<Actions>;
};

const reducer = (state: AppState, action: Actions): AppState => {
	switch (action.type) {
		case 'SYNC_STATE':
			return { ...state, ...action.payload };

		case 'RESTAURANT_LIST':
			return { ...state, restaurants: action.payload };
		case 'ACTIVE_ORDER_DATA':
			return { ...state, activeOrder: action.payload };

		default:
			return state;
	}
};

export const useStore = (initialState: AppState) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return { ...state, dispatch };
}
