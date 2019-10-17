import React, { useContext } from 'react';
import './orderStarted.scss';
import { useBEM, price, minutes } from 'alias/utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants } from 'alias/components';
import { AppContext } from 'alias/app';

const [viewBlock] = useBEM('order-started');

export const OrderStarted: React.FC = () => {
	const { activeOrder, ipc } = useContext(AppContext);
	const { restaurant: { averagePrice, deliveryTime } } = activeOrder!;

	const onDecline = () => ipc.send('DECLINE_ORDER');

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Звучит заманчиво?' }}>
					Новый заказ!
				</Caption>
				<Caption align='right' weight='medium' size='large' color='contrast' subtitle={{ text: 'До конца' }}>
					<Timer timeUntil='selectionEnd' />
				</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				{averagePrice && deliveryTime && (
					<Tile background='contrast'>
						<div className='caption-wrapper'>
							<Caption subtitle={{ text: 'Доставка' , uppercase: true }} weight='light' size='large' color='accent' align='center'>
								{minutes(deliveryTime)}
							</Caption>
							<Caption subtitle={{ text: 'Средний чек' , uppercase: true }} weight='light' size='large' color='accent' align='center'>
								{price(averagePrice)}
							</Caption>
						</div>
					</Tile>
				)}
				<Tile background='contrast'>
					<Participants />
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Я тоже хочу есть!' />
				<Button background='glassy' text='Не сегодня...' onClick={onDecline} />
			</div>
		</div>
	)
}
