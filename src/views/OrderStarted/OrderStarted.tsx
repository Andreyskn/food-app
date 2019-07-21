import React from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants, Header } from 'components';

const [viewBlock] = useBEM('order-started');

export const OrderStarted: React.FC = () => {
	return (
		<div className={classnames(viewBlock, 'wrapper')}>
			<Header />
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
							<b>{70}</b><small>мин.</small>
						</Caption>
						<Caption subtitle={{ text: 'Средний чек' , uppercase: true }} weight='light' size='large' color='accent' align='center'>
							<b>{180}</b><small>₽</small>
						</Caption>
					</div>
				</Tile>
				<Tile background='contrast'>
					<Participants />
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Я тоже хочу есть!' />
				<Button background='transparent' text='Не сегодня...' />
			</div>
		</div>
	)
}
