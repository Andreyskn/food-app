import React from 'react';
import './chosenPlace.scss';
import { useBEM } from 'utils';
import { Image, ImageProps, Caption, CaptionProps } from 'components';

const [chosenBlock] = useBEM('chosen-place');

export const ChosenPlace: React.FC = () => {

	const imageProps: ImageProps = {
		border: 'accent',
		rounded: true,
		src: require('../../assets/images/Logo-1.png'),
	}

	const captionProps: CaptionProps = {
		subtitle: { text: '112 заказов' },

	}

	return (
		<div className={chosenBlock}>
			<Image {...imageProps} />
			<Caption {...captionProps}>
				Гриль зона "Гарик"
			</Caption>
		</div>
	);
}
