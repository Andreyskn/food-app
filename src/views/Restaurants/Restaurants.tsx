import React from 'react';
import { Button, TileSet, Tile, Image, Caption } from '../../components';
import { price, minutes } from '../../utils';

export class Restaurants extends React.Component {
	render() {
		return (
			<div className='wrapper wrapper--white1'>
				<div className='heading-wrapper'>
					<Caption weight='medium' size='large' subtitle={{ text: 'Выбери, где заказать' }}>
						Заведения
					</Caption>
					<Button text='Добавить' background='accent' icon={{ name: 'plus' }} autoWidth />
				</div>
				<TileSet>
					<Tile background='contrast'>
						<Image width='100px' src={require('../../assets/images/Logo-1.png')} />
					</Tile>
					<Tile>
						<div className='restaurant-tile'>
							<Caption>Гриль зона "Гарик"</Caption>
							<div className='heading-wrapper'>
								<Caption subtitle={{ text: 'Доставка' , uppercase: true, fontSize: '8px', brighten: true }} color='accent' align='center'>
									{minutes(90)}
								</Caption>
								<Caption subtitle={{ text: 'Средний чек' , uppercase: true, fontSize: '8px', brighten: true }} color='accent' align='center'>
									{price(240)}
								</Caption>
							</div>
						</div>
					</Tile>
				</TileSet>
			</div>
		)
	}
}
