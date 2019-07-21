import React from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Participants, Header } from 'components';

const [viewBlock] = useBEM('order-placed');

export const OrderPlaced: React.FC = () => {
	return (
		<div className={classnames(viewBlock, 'wrapper')}>
			<Header />
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
				<Button text='Детали заказа' />
			</div>
		</div>
	)
}
