import React, { useContext } from 'react';
import { TileSet, Tile, Image, ImageProps, Caption, Button } from 'alias/components';
import { price, minutes } from 'alias/utils';
import { AppContext } from 'alias/app';

export type RestaurantTileProps = {
	logo: {
		src: ImageProps['src'];
		background?: string;
	}
	name: string;
	deliveryTime: number;
	averagePrice: number;
}

export const RestaurantTile: React.FC<RestaurantTileProps> = (props) => {
	const { logo: { src, background }, name, deliveryTime, averagePrice } = props;

	// TODO: remove later
	const { navigateTo } = useContext(AppContext);

	return (
		<Button onClick={() => navigateTo('OrderPlaced')}>
			<TileSet>
				<Tile background='contrast' customBackground={background}>
					<Image src={src} />
				</Tile>
				<Tile grow>
					<Caption align='center'>{name}</Caption>
					<div className='caption-wrapper'>
						<Caption subtitle={{ text: 'Доставка' , uppercase: true, brighten: true }} color='accent' align='center'>
							{minutes(deliveryTime)}
						</Caption>
						<Caption subtitle={{ text: 'Средний чек' , uppercase: true, brighten: true }} color='accent' align='center'>
							{price(averagePrice)}
						</Caption>
					</div>
				</Tile>
			</TileSet>
		</Button>
	);
}
