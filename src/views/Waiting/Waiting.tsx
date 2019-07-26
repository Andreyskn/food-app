import React, { useContext } from 'react';
import './waiting.scss';
import { useBEM } from 'alias/utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Icon } from 'alias/components';
import { AppContext } from 'alias/app';

const [viewBlock] = useBEM('waiting');

export const Waiting: React.FC = () => {
	const { navigateTo, user } = useContext(AppContext);

	return (
		<div className={viewBlock}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Ждём доставки...' }}>
					Заказ в процессе
				</Caption>
			</div>

			<TileSet direction='column'>
				<Tile background='contrast'>
					<ChosenPlace />
				</Tile>
				<Tile background='transparent'>
					<div className='waiting-tile'>
						<Icon name='truck-coming' />
						<Caption subtitle={{ text: 'примерное время доставки' }} weight='light' color='contrast' align='center'>
							<Timer timeUntil='delivery' />
						</Caption>
					</div>
				</Tile>
			</TileSet>

			{user.isInitiator && (
				<div className='actions'>
					<Button text='Доставлено!' onClick={() => navigateTo('Delivered')} />
				</div>
			)}
		</div>
	)
}
