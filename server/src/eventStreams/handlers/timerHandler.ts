import { ResponseEvent } from '../types';
import { domain$ } from '../streams';

export const timerHandler = (event: ResponseEvent) => {
	switch (event.name) {
		case 'Order created': {
			const { selectionEndsAt } = event.payload;
			const timeRemaining = selectionEndsAt! - Date.now();

			if (timeRemaining >= 0) {
				setTimeout(() => {
					domain$.next({ name: 'Selection time ran out', payload: undefined });
				}, timeRemaining);
			}
		}
	}
}
