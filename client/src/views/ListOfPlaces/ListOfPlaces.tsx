import React, { useContext } from 'react';
import './listOfPlaces.scss';
import { useBEM } from 'alias/utils';
import { Caption } from 'alias/components';
import { RestaurantTile } from './RestaurantTile';
import { AppContext } from 'alias/app';
import { useModal } from './Modal';

import { ipcRenderer as ipc } from 'electron';

const [viewBlock, , viewElement] = useBEM('list-of-places');
const [tileListElement] = viewElement('tile-list');

const onSelect = (restaurantId: string) => () => ipc.send('select-restaurant', restaurantId);

export const ListOfPlaces: React.FC = () => {
	const { restaurants } = useContext(AppContext);
	if (!restaurants) return null;
	
	const { Modal, showModal } = useModal();

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' subtitle={{ text: 'Выбери, где заказать' }}>Заведения</Caption>
				{/* <Button text='Добавить' background='accent' icon={{ name: 'plus' }} autoWidth /> */}
			</div>
			<div className={tileListElement}>
				{restaurants.map((props: any, i: any) => {
					const onClick = () => showModal({
						text: props.name,
						logo: props.logo,
						background: props.backgroundColor!, // FIXME:
						onSelect: onSelect(props.id),
					});
					return <RestaurantTile key={i} {...props} onClick={onClick} />
				})}
			</div>
			<Modal />
		</div>
	);
}
