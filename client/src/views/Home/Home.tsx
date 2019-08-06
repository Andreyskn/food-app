import React, { useContext, useEffect, Fragment } from 'react';
import './home.scss';
import { useBEM } from 'alias/utils';
import { Button, Image, Text, Caption } from 'alias/components';
import { AppContext } from 'alias/app';

const [viewBlock] = useBEM('home');

export const Home: React.FC = () => {
	const { navigateTo, user, activeOrder, restaurants } = useContext(AppContext);

	// useEffect(() => {
	// 	socket.emit('current view: Home');
	// }, []);

	useEffect(() => {
		if (activeOrder) navigateTo('OrderStarted');
	});

	return (
		<div className={viewBlock}>
			<Image src={user.image} rounded border='contrast' width={140} />
			<Caption weight='light' color='contrast' size='large' align='center' subtitle={{ text: 'Хочется есть?' }}>
				Привет, <b>{user.firstName}!</b>
			</Caption>

			{restaurants && (
				<Fragment>
					<Text color='contrast'>К сожалению, активных заказов сейчас нет, но в твоих силах это изменить:</Text>
					<Button text='Новый заказ' onClick={() => navigateTo('ListOfPlaces')} />
				</Fragment>
			)}
		</div>
	)
}
