import React, { useContext } from 'react';
import './orderStarted.scss';
import { useBEM, price, minutes } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants } from 'components';
import { RouterContext } from 'router';

const [viewBlock] = useBEM('order-started');

export const OrderStarted: React.FC = () => {
	const { navigateTo } = useContext(RouterContext);

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Звучит заманчиво?' }}>
					Новый заказ!
				</Caption>
				<Caption align='right' weight='medium' size='large' color='contrast' subtitle={{ text: 'До конца' }}>
					<Timer />
				</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				<Tile background='contrast'>
					<div className='caption-wrapper'>
						<Caption subtitle={{ text: 'Доставка' , uppercase: true }} weight='light' size='large' color='accent' align='center'>
							{minutes(70)}
						</Caption>
						<Caption subtitle={{ text: 'Средний чек' , uppercase: true }} weight='light' size='large' color='accent' align='center'>
							{price(180)}
						</Caption>
					</div>
				</Tile>
				<Tile background='contrast'>
					<Participants />
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Я тоже хочу есть!' />
				<Button background='transparent' text='Не сегодня...' onClick={navigateTo('Declined')} />
			</div>
		</div>
	)
}
