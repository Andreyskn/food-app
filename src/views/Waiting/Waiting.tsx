import React, { useContext } from 'react';
import './waiting.scss';
import { useBEM } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Icon } from 'components';
import { RouterContext } from 'router';

const [viewBlock] = useBEM('waiting');

export const Waiting: React.FC = () => {
	const { navigateTo } = useContext(RouterContext);

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
							<Timer />
						</Caption>
					</div>
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Доставлено!' onClick={navigateTo('Delivered')} />
			</div>
		</div>
	)
}
