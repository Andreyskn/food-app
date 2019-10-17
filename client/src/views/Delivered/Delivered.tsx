import React, { useContext } from 'react';
import classnames from 'classnames';
import './delivered.scss';
import { useBEM, price } from 'alias/utils';
import { Button, Caption, TileSet, Tile, Icon, Text, Image } from 'alias/components';
import { Bill } from './Bill';
import { AppContext, UserOrdered } from 'alias/app';

const [viewBlock, viewModifier] = useBEM('delivered');

export const Delivered: React.FC = () => {
	const { user: appUser, activeOrder } = useContext(AppContext);
	const { host } = activeOrder!;
	const user = appUser as UserOrdered;

	const viewClassName = classnames(
		viewBlock,
		{ [viewModifier('participant')]: user.isHost },
	)

	return (
		<div className={viewClassName}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Еда уже ждёт тебя в столовой' }}>
					Доставлено!
				</Caption>
				<Icon name='truck-delivered' />
			</div>

			{user.isHost ? (
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

			{user.isHost && (
				<div className='actions'>
					<Button text='Все рассчитались' />
				</div>
			)}
		</div>
	)
}
