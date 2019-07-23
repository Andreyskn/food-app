import React from 'react';
import classnames from 'classnames';
import './text.scss';
import { useBEM, useProps } from 'utils';

export type TextProps = {
	color?: 'default' | 'contrast';
}

const [textBlock, textModifier] = useBEM('text');

export const Text: React.FC<TextProps> = (props) => {
	const { children, color } = props;

	const [isDefaultProp] = useProps(props, Text.defaultProps!);
	const textClass = classnames(
		textBlock,
		{ [textModifier({ color })]: !isDefaultProp('color') },
	)

	return <p className={textClass}>{children}</p>;
}

Text.defaultProps = {
	color: 'default',
}
