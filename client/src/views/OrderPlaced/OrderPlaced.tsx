import React, { useContext } from 'react';
import './orderPlaced.scss';
import { useBEM } from 'alias/utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants } from 'alias/components';
import { AppContext } from 'alias/app';

const [viewBlock] = useBEM('order-placed');

export const OrderPlaced: React.FC = () => {
	const { navigateTo, user } = useContext(AppContext);

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
						<Timer timeUntil='selectionEnd' />
					</Caption>
				</Tile>
				<Tile background='contrast'>
					<Participants />
				</Tile>
			</TileSet>

			{user.status === 'host' && (
				<div className='actions'>
					<Button text='Детали заказа' onClick={() => navigateTo('Waiting')} />
				</div>
			)}
		</div>
	)
}
