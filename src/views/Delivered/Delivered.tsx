import React from 'react';
import classnames from 'classnames';
import './delivered.scss';
import { useBEM, price } from 'alias/utils';
import { Button, Caption, TileSet, Tile, Icon, Text, Image } from 'alias/components';
import { Bill } from './Bill';

const user = {
	id: 0,
	firstName: 'Андрей',
	lastName: 'Скипин',
	image: require('../../../.storybook/utils/avatar.png'),
	bill: 320,
	isInitiator: true,
	hasJoied: false,
}

const initiator = {
	id:1,
	firstName: 'Андрей',
	lastName: 'Скипин',
	image: require('../../../.storybook/utils/avatar.png'),
}

const [viewBlock, viewModifier] = useBEM('delivered');

export const Delivered: React.FC = () => {
	const viewClassName = classnames(
		viewBlock,
		{ [viewModifier('participant')]: !user.isInitiator },
	)

	return (
		<div className={viewClassName}>
			<div className='caption-wrapper'>
				<Caption weight='medium' size='large' color='contrast' subtitle={{ text: 'Еда уже ждёт тебя в столовой' }}>
					Доставлено!
				</Caption>
				<Icon name='truck-delivered' />
			</div>

			{user.isInitiator ? (
				<TileSet direction='column'>
					<Tile background='contrast'>
						<Bill />
					</Tile>
				</TileSet>
			) : (
				<TileSet direction='column'>
					<Tile background='contrast'>
						<Text>Не забудь!</Text>
						<Image src={initiator.image} rounded />
						<Caption>{initiator.firstName} <em>{initiator.lastName}</em></Caption>
					</Tile>
					<Tile background='transparent'>
						<Caption align='center' color='contrast' weight='light'>{price(user.bill)}</Caption>
					</Tile>
				</TileSet>
			)}

			{user.isInitiator && (
				<div className='actions'>
					<Button text='Все рассчитались' />
				</div>
			)}
		</div>
	)
}
