import React from 'react';

import { restaurantsElement } from './common';
import { TileSet, Tile, Image, ImageProps, Caption, Button } from '../../components';

export type RestaurantTileProps = {
	logo: {
		src: ImageProps['src'];
		background?: string;
	}
	name: string;
	deliveryTime: number;
	averagePrice: number;
}

const [tileElement] = restaurantsElement('tile');

export const RestaurantTile: React.FC<RestaurantTileProps> = (props) => {
	const { logo: { src, background }, name, deliveryTime, averagePrice } = props;

	return (
		<Button onClick={() => console.log(name)}>
			<TileSet>
				<Tile background='contrast' customBackground={background}>
					<Image src={src} />
				</Tile>
				<Tile grow>
					<div className={tileElement}>
						<Caption align='center'>{name}</Caption>
						<div className='heading-wrapper'>
							<Caption subtitle={{ text: 'Доставка' , uppercase: true, brighten: true }} color='accent' align='center'>
								<b>{deliveryTime}</b><small>мин.</small>
							</Caption>
							<Caption subtitle={{ text: 'Средний чек' , uppercase: true, brighten: true }} color='accent' align='center'>
								<b>{averagePrice}</b><small>₽</small>
							</Caption>
						</div>
					</div>
				</Tile>
			</TileSet>
		</Button>
	);
}
