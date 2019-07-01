import React from 'react';
import classnames from 'classnames';
import { Icon, IconProps } from './Icon';
import { useBEM, useProps } from '../utils';

export type ButtonProps = {
	text?: string;
	background?: 'contrast' | 'accent' | 'transparent' | 'none';
	disabled?: boolean;
	icon?: IconProps;
}

const defaultProps: Partial<ButtonProps> = {
	background: 'contrast',
}

const [buttonBlock, buttonModifier, buttonElement] = useBEM('button');
const [textElement] = buttonElement('text');

export const Button: React.FC<ButtonProps> = (props) => {
	const { disabled, text, background, icon } = props;

	const [isDefaultProp] = useProps(props, defaultProps);
	const buttonClass = classnames(
		buttonBlock,
		{ [buttonModifier(`background-${background}`)]: !isDefaultProp('background') },
	);

	return (
		<button className={buttonClass} disabled={disabled}>
			{icon && <Icon {...icon} />}
			{text && <span className={textElement}>{text}</span>}
		</button>
	);
}
