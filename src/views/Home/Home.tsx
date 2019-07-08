import React from 'react';
import { Button, Image, Text, Caption } from '../../components';

export class HomeView extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Image src={require('../../../.storybook/utils/avatar.png')} rounded border='contrast' width={140} />
				<Caption weight='light' color='contrast' size='large' align='center' subtitle={{ text: 'Хочется есть?' }}>
					Привет, <b>Андрей!</b>
				</Caption>
				<Text color='contrast'>К сожалению, активных заказов сейчас нет, но в твоих силах это изменить:</Text>
				<Button text='Новый заказ' />
			</div>
		)
	}
}
