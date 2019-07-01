import React from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from '../utils';

export type TextProps = {
	color: 'default' | 'contrast';
}

const defaultProps: Partial<TextProps> = {
	color: 'default',
}

const [textBlock, textModifier] = useBEM('text');

export const Text: React.FC<TextProps> = (props) => {
	const { children, color } = props;

	const [isDefaultProp] = useProps(props, defaultProps);
	const textClass = classnames(
		textBlock,
		{ [textModifier(`color-${color}`)]: !isDefaultProp('color') },
	)

	return <p className={textClass}>{children}</p>;
}
