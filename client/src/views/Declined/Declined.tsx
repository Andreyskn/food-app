import React from 'react';
import './declined.scss';
import { useBEM } from 'alias/utils';
import { ChosenPlace, Caption, TileSet, Tile, Icon, Text } from 'alias/components';

const [viewBlock] = useBEM('declined');

export const Declined: React.FC = () => {
	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Не каждый день же заказывать, да?' }}>
					Отклонённый заказ
				</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				<Tile background='glassy'>
					<div className='waiting-tile'>
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
