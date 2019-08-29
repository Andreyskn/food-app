import { Restaurant, User } from '../../shared';

type Storage = {
	restaurants: Restaurant[];
	users: User[];
}

const storage: Storage = {
	restaurants: [
		{ id: '1', link: 'http://garikgrill.ru/#!/', name: 'Гриль зона "Гарик"', logo: '/images/logos/1.png', backgroundColor: '', averagePrice: 240, deliveryTime: 90, totalOrders: 241 },
		{ id: '2', link: '', name: 'Янцзы', logo: '/images/logos/2.png', backgroundColor: '', averagePrice: 200, deliveryTime: 110, totalOrders: 385 },
		{ id: '3', link: '', name: 'Рыба. Рис', logo: '/images/logos/3.png', backgroundColor: '', averagePrice: 260, deliveryTime: 120, totalOrders: 112 },
		{ id: '4', link: '', name: 'Хан Буз', logo: '/images/logos/4.png', backgroundColor: '', averagePrice: 180, deliveryTime: 70, totalOrders: 68 },
	],
	users: [
		{ id: '1', firstName: 'Марина', lastName: 'Лазарева', image: '/images/avatars/1.png' },
		{ id: '2', firstName: 'Юлия', lastName: 'Митина', image: '/images/avatars/2.png' },
		{ id: '3', firstName: 'Андрей', lastName: 'Скипин', image: '/images/avatars/3.png' },
		{ id: '4', firstName: 'Михаил', lastName: 'Братчиков', image: '/images/avatars/4.png' },
		{ id: '5', firstName: 'Андрей', lastName: 'Егоров', image: '/images/avatars/5.png' },
		{ id: '6', firstName: 'Константин', lastName: 'Кузьмин', image: '/images/avatars/6.png' },
	],
};

export const db = {
	restaurants: () => storage.restaurants,
	users: () => storage.users,

	restaurant: (id: string) => storage.restaurants.find(r => r.id === id) as Restaurant,
	user: (id: string) => storage.users.find(u => u.id === id) as User,
};
