import React from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { ChosenPlace, Button, Caption, TileSet, Tile, Timer, Header, Icon } from 'components';

const [viewBlock] = useBEM('in-progress');

export const Waiting: React.FC = () => {
	return (
		<div className={classnames(viewBlock, 'wrapper')}>
			<Header />
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
					<div className='in-progress-tile'>
						<Icon name='truck-coming' />
						<Caption subtitle={{ text: 'примерное время доставки' }} weight='light' color='contrast' align='center'>
							<Timer />
						</Caption>
					</div>
				</Tile>
			</TileSet>

			<div className='actions'>
				<Button text='Доставлено!' />
			</div>
		</div>
	)
}
