import React, { useContext } from 'react';
import classnames from 'classnames';
import './delivered.scss';
import { useBEM, price } from 'alias/utils';
import { Button, Caption, TileSet, Tile, Icon, Text, Image } from 'alias/components';
import { Bill } from './Bill';
import { AppContext } from 'alias/app';

const [viewBlock, viewModifier] = useBEM('delivered');

export const Delivered: React.FC = () => {
	const { user, activeOrder } = useContext(AppContext);
	const { host } = activeOrder!;

	const viewClassName = classnames(
		viewBlock,
		{ [viewModifier('participant')]: user.status !== 'host' },
	)

	return (
		<div className={viewClassName}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Еда уже ждёт тебя в столовой' }}>
					Доставлено!
				</Caption>
				<Icon name='truck-delivered' />
			</div>

			{user.status === 'host' ? (
				<TileSet direction='column'>
					<Tile background='contrast'>
						<Bill />
					</Tile>
				</TileSet>
			) : (
				<TileSet direction='column'>
					<Tile background='contrast'>
						<Text>Не забудь!</Text>
						<Image src={host.image} rounded />
						<Caption>{host.firstName} <em>{host.lastName}</em></Caption>
					</Tile>
					<Tile background='glassy'>
						<Caption align='center' color='contrast' weight='light'>{price(user.bill!)}</Caption>
					</Tile>
				</TileSet>
			)}

			{user.status === 'host' && (
				<div className='actions'>
					<Button text='Все рассчитались' />
				</div>
			)}
		</div>
	)
}
