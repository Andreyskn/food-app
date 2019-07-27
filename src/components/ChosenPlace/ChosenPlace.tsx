import React, { useContext } from 'react';
import './chosenPlace.scss';
import { useBEM } from 'alias/utils';
import { Image, ImageProps, Caption, CaptionProps } from 'alias/components';
import { AppContext } from 'alias/app';

const [chosenBlock] = useBEM('chosen-place');

export const ChosenPlace: React.FC = () => {
	const { activeOrder } = useContext(AppContext);
	const { restaurant } = activeOrder!;

	const imageProps: ImageProps = {
		border: 'accent',
		rounded: true,
		src: restaurant.logo,
	}

	const captionProps: CaptionProps = {
		subtitle: restaurant.totalOrders ? { text: `${restaurant.totalOrders} заказов` } : undefined,
	}

	return (
		<div className={chosenBlock}>
			<Image {...imageProps} />
			<Caption {...captionProps}>
				{restaurant.name}
			</Caption>
		</div>
	);
}
