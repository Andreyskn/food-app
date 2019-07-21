import React from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { ChosenPlace, Caption, TileSet, Tile, Header, Icon, Text } from 'components';

const [viewBlock] = useBEM('in-progress');

export const Declined: React.FC = () => {
	return (
		<div className={classnames(viewBlock, 'wrapper')}>
			<Header />
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Не каждый день же заказывать, да?' }}>
					Отклонённый заказ
				</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				<Tile background='transparent'>
					<div className='in-progress-tile'>
						<Icon name='truck-declined' />
						<Text color='contrast'>
							Ты не участвуешь в этом заказе
						</Text>
					</div>
				</Tile>
			</TileSet>
		</div>
	)
}
