import React from 'react';
import classnames from 'classnames';
import { Icon, IconProps } from './Icon';
import { useBEM, useProps } from '../utils';

export type ButtonProps = {
	text?: string;
	background?: 'contrast' | 'accent' | 'transparent' | 'none';
	disabled?: boolean;
	icon?: IconProps;
	autoWidth?: boolean;
}

const [buttonBlock, buttonModifier, buttonElement] = useBEM('button');
const [textElement] = buttonElement('text');

export const Button: React.FC<ButtonProps> = (props) => {
	const { disabled, text, background, icon, autoWidth } = props;

	const [isDefaultProp] = useProps(props, Button.defaultProps!);
	const buttonClass = classnames(
		buttonBlock,
		{ [buttonModifier({ background })]: !isDefaultProp('background') },
		{ [buttonModifier('width-auto')]: autoWidth },
	);

	return (
		<button className={buttonClass} disabled={disabled}>
			{icon && <Icon {...icon} />}
			{text && <span className={textElement}>{text}</span>}
		</button>
	);
}

Button.defaultProps = {
	background: 'contrast',
}
