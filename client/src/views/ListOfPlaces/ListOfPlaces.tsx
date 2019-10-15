import React, { useContext } from 'react';

import './listOfPlaces.scss';

import { Restaurant } from 'alias/shared';
import { useBEM } from 'alias/utils';
import { Caption } from 'alias/components';
import { RestaurantTile } from './RestaurantTile';
import { AppContext } from 'alias/app';
import { useModal } from './Modal';

const [viewBlock, , viewElement] = useBEM('list-of-places');
const [tileListElement] = viewElement('tile-list');

export const ListOfPlaces: React.FC = () => {
	const { restaurants, ipc } = useContext(AppContext);
	const { Modal, showModal } = useModal();

	const onSelect = (restaurantId: Restaurant['id']) => () => ipc.send('SELECT_RESTAURANT', restaurantId);

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' subtitle={{ text: 'Выбери, где заказать' }}>Заведения</Caption>
				{/* <Button text='Добавить' background='accent' icon={{ name: 'plus' }} autoWidth /> */}
			</div>
			<div className={tileListElement}>
				{restaurants.map((restaurant, i) => {
					const onClick = () => showModal({
						text: restaurant.name,
						logo: restaurant.logo,
						background: restaurant.backgroundColor,
						onSelect: onSelect(restaurant.id),
					});
					return <RestaurantTile key={i} {...restaurant} onClick={onClick} />
				})}
			</div>
			<Modal />
		</div>
	);
}
