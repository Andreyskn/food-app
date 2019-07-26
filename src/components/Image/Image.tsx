import React from 'react';
import classnames from 'classnames';
import './image.scss';
import { useBEM, useProps } from 'alias/utils';

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
	const imageStyle = width ? { width, height: width } : undefined;

	return <img src={src} className={imageClass} style={imageStyle} />
}

Image.defaultProps = {
	border: 'none',
}
