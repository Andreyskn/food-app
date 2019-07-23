import React, { useContext } from 'react';
import './orderPlaced.scss';
import { useBEM } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants } from 'components';
import { RouterContext } from 'router';

const [viewBlock] = useBEM('order-placed');

export const OrderPlaced: React.FC = () => {
	const { navigateTo } = useContext(RouterContext);

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Ожидаем участников...' }}>Заказ в процессе</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				<Tile background='contrast'>
					<Caption color='accent' weight='light' align='center'>
						<Timer />
					</Caption>
				</Tile>
				<Tile background='contrast'>
					<Participants />
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Детали заказа' onClick={navigateTo('Waiting')} />
			</div>
		</div>
	)
}
