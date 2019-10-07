import React from 'react';
import { TileSet, Tile, Image, Caption, Button } from 'alias/components';
import { price, minutes } from 'alias/utils';
import { Restaurant } from 'alias/shared';

export type RestaurantTileProps = Restaurant & {
	onClick: () => void;
};

export const RestaurantTile: React.FC<RestaurantTileProps> = (props) => {
	const { logo, name, deliveryTime, averagePrice, tileColor, onClick } = props;

	return (
		<Button onClick={onClick}>
			<TileSet>
				<Tile background='contrast' customBackground={tileColor}>
					<Image src={logo} />
				</Tile>
				{deliveryTime && averagePrice && (
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
				)}
			</TileSet>
		</Button>
	);
}
