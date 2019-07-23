import React, { useContext } from 'react';
import './home.scss';
import { useBEM } from 'utils';
import { Button, Image, Text, Caption } from 'components';
import { RouterContext } from 'router';

const [viewBlock] = useBEM('home');

export const Home: React.FC = () => {
	const { navigateTo } = useContext(RouterContext);

	return (
		<div className={viewBlock}>
			<Image src={require('../../../.storybook/utils/avatar.png')} rounded border='contrast' width={140} />
			<Caption weight='light' color='contrast' size='large' align='center' subtitle={{ text: 'Хочется есть?' }}>
				Привет, <b>Андрей!</b>
			</Caption>

			<Text color='contrast'>К сожалению, активных заказов сейчас нет, но в твоих силах это изменить:</Text>
			<Button text='Новый заказ' onClick={navigateTo('ListOfPlaces')} />
		</div>
	)
}
