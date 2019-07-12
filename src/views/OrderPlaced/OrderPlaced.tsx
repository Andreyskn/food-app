import React from 'react';
import classnames from 'classnames';

import { useBEM } from '../../utils';
import { Button, Caption, TileSet, Tile, Image } from '../../components';

const [viewBlock] = useBEM('order-placed');

export const OrderPlaced: React.FC = () => {
	return (
		<div className={classnames(viewBlock, 'wrapper')}>
			<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Ожидаем участников...' }}>Заказ в процессе</Caption>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<TileSet>
						<Tile>
							<Image src={require('../../assets/images/Logo-1.png')} />
						</Tile>
						<Tile>
							<Caption subtitle={{ text: '112 заказов' }}>Гриль зона "Гарик"</Caption>
						</Tile>
					</TileSet>
				</Tile>
				<Tile background='contrast'>
					<Caption color='accent' size='large'>02:54</Caption>
				</Tile>
				<Tile background='contrast'>
					123
				</Tile>
			</TileSet>

			<Button text='Детали заказа' />
		</div>
	)
}
