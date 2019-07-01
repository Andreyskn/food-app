import React from 'react';
import { Button, Image, Text, Heading } from '../components';

export class HomeView extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Image src={require('../../.storybook/utils/avatar.png')} rounded border='contrast' width={140} />
				<Heading weight='light' color='contrast' size='large' align='center' subtitle={{ text: 'Хочется есть?' }}>
					Привет, <b>Андрей!</b>
				</Heading>
				<Text color='contrast'>К сожалению, активных заказов сейчас нет, но в твоих силах это изменить:</Text>
				<Button text='Новый заказ' icon={{name: 'plus', rotate: '45'}} />
			</div>
		)
	}
}
