import { db } from './fakeDB';
import { Order, Participant, UserData, User } from '../../../shared';
import { OrderActive, UsersState, OrderSelection } from '../domain';

let activeOrder: Order | null = null;
let usersData: Record<User['id'], UserData> = {};
const restaurants = db.restaurants();

export const getCache = () => ({ order: activeOrder, users: usersData, restaurants });

export const updateCache = (data: { order?: OrderActive, users?: UsersState }) => {
	const { order, users } = data;

	let denormalizedOrder = activeOrder;
	if (order) {
		denormalizedOrder = {
			status: order.status,
			host: db.user(order.host),
			restaurant: db.restaurant(order.restaurant),
			participants: order.participants.map(id => ({ ...db.user(id), status: (users || usersData)[id].status as Participant['status'] })),
			selectionEndsAt: (order as OrderSelection).selectionEndsAt,
		}
	}

	let denormalizedUsers = usersData;
	if (users) {
		Object.values(users).map(user => {
			switch (user.status) {
				case 'declined':
					denormalizedUsers[user.id] = {
						status: user.status,
					}
					break;
				case 'selecting':
					denormalizedUsers[user.id] = {
						status: user.status,
						isHost: user.id === (order || activeOrder as Order).host,
					}
					break;
				case 'ordered':
					denormalizedUsers[user.id] = {
						status: user.status,
						isHost: user.id === (order || activeOrder as Order).host,
						bill: 1,
						order: 1,
					}
					break;
			}
		});
	}

	activeOrder = denormalizedOrder;
	usersData = denormalizedUsers;
	
	return { order: activeOrder!, users: usersData };
}
