import React from 'react';
import classnames from 'classnames';
import './caption.scss';
import { useBEM, useProps } from 'utils';

export type CaptionProps = {
	subtitle?: {
		text: string;
		uppercase?: boolean;
		brighten?: boolean;
	};
	size?: 'small' | 'medium' | 'large';
	color?: 'default' | 'contrast' | 'accent';
	align?: 'left' | 'center' | 'right';
	weight?: 'light' | 'regular' | 'medium' | 'bold';
}

const [captionBlock, captionModifier, captionElement] = useBEM('caption');
const [titleElement] = captionElement('title');
const [subtitleElement, subtitleModifier] = captionElement('subtitle');

export const Caption: React.FC<CaptionProps> = (props) => {
	const { children, subtitle, size, color, align, weight } = props;

	const [isDefaultProp] = useProps(props, Caption.defaultProps!);
	const titleClass = classnames(
		captionBlock,
		{ [captionModifier({ color })]: !isDefaultProp('color') },
		{ [captionModifier({ align })]: !isDefaultProp('align') },
		{ [captionModifier({ size })]: !isDefaultProp('size') },
		{ [captionModifier({ weight })]: !isDefaultProp('weight') },
	)

	const getSubtitleClass = () => classnames(
		subtitleElement,
		{ [subtitleModifier('uppercase')]: subtitle!.uppercase },
		{ [subtitleModifier('brighten')]: subtitle!.brighten },
	)

	return (
		<div className={titleClass}>
			{children && <div className={titleElement}>{children}</div>}
			{subtitle && <div className={getSubtitleClass()}>{subtitle.text}</div>}
		</div>
	)
}

Caption.defaultProps = {
	size: 'medium',
	align: 'left',
	color: 'default',
	weight: 'regular',
}
