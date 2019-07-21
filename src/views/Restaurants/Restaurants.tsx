import React from 'react';
import './styles.scss';
import { restaurantsBlock, restaurantsElement } from './common';
import { Button, Caption, Header } from 'components';
import { RestaurantTile, RestaurantTileProps } from './RestaurantTile';

const restaurants: RestaurantTileProps[] = [
	{ logo: { src: require('../../assets/images/Logo-1.png') }, name: 'Гриль зона "Гарик"', deliveryTime: 90, averagePrice: 240 },
	{ logo: { src: require('../../assets/images/Logo-2.png') }, name: 'Янцзы', deliveryTime: 110, averagePrice: 200 },
	{ logo: { src: require('../../assets/images/Logo-3.png') }, name: 'Рыба. Рис', deliveryTime: 120, averagePrice: 260 },
	{ logo: { src: require('../../assets/images/Logo-4.png'), background: '#c21f22' }, name: 'Хан Буз', deliveryTime: 70, averagePrice: 180 },
];

const [tileListElement] = restaurantsElement('tile-list');

export const Restaurants: React.FC = () => {
	return (
		<div className={restaurantsBlock}>
			<Header />
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' subtitle={{ text: 'Выбери, где заказать' }}>Заведения</Caption>
				<Button text='Добавить' background='accent' icon={{ name: 'plus' }} autoWidth />
			</div>
			<div className={tileListElement}>
				{restaurants.map((props, i) => <RestaurantTile key={i} {...props} />)}
			</div>
		</div>
	);
}
