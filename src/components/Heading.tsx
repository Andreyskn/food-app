import React from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from '../utils';

export type HeadingProps = {
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

const defaultProps: Partial<HeadingProps> = {
	size: 'medium',
	align: 'left',
	color: 'default',
	weight: 'regular',
}

const [titleBlock, titleModifier, titleElement] = useBEM('heading');
const [mainElement] = titleElement('title');
const [subtitleElement, subtitleModifier] = titleElement('subtitle');

export const Heading: React.FC<HeadingProps> = (props) => {
	const { children, subtitle, size, color, align, weight } = props;

	const [isDefaultProp] = useProps(props, defaultProps);
	const titleClass = classnames(
		titleBlock,
		{ [titleModifier(`color-${color}`)]: !isDefaultProp('color') },
		{ [titleModifier(`align-${align}`)]: !isDefaultProp('align') },
		{ [titleModifier(`size-${size}`)]: !isDefaultProp('size') },
		{ [titleModifier(`weight-${weight}`)]: !isDefaultProp('weight') },
	)

	const getSubtitleClass = () => classnames(
		subtitleElement,
		{ [subtitleModifier('uppercase')]: subtitle!.uppercase },
		{ [subtitleModifier('brighten')]: subtitle!.brighten },
	)

	return (
		<div className={titleClass}>
			{children && <div className={mainElement}>{children}</div>}
			{subtitle && <div className={getSubtitleClass()}>{subtitle.text}</div>}
		</div>
	)
}
