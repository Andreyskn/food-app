import React from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from '../utils';

export type ImageProps = {
	src: string;
	rounded?: boolean;
	border?: 'none' | 'accent' | 'contrast';
	width?: number | string;
}

const [imageBlock, imageModifier] = useBEM('image');

export const Image: React.FC<ImageProps> = (props) => {
	const { src, rounded, border, width } = props;

	const [isDefaultProp] = useProps(props, Image.defaultProps!);
	const imageClass = classnames(
		imageBlock,
		{ [imageModifier({ border })]: !isDefaultProp('border') },
		{ [imageModifier('rounded')]: rounded },
	)

	return <img src={src} className={imageClass} style={{ width, height: width }} />
}

Image.defaultProps = {
	border: 'none',
}
