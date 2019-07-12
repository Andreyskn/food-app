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

	onClick?: (e: React.MouseEvent) => void;
}

const [buttonBlock, buttonModifier, buttonElement] = useBEM('button');
const [textElement] = buttonElement('text');

export const Button: React.FC<ButtonProps> = (props) => {
	const { children, disabled, text, background, icon, autoWidth, onClick } = props;

	const [isDefaultProp] = useProps(props, Button.defaultProps!);
	const buttonClass = classnames(
		buttonBlock,
		{ [buttonModifier({ background })]: !isDefaultProp('background') },
		{ [buttonModifier('width-auto')]: autoWidth },
		{ [buttonModifier('lean')]: children },
	);

	return (
		<button className={buttonClass} disabled={disabled} onClick={onClick}>
			{children || (
				<React.Fragment>
					{icon && <Icon {...icon} />}
					{text && <span className={textElement}>{text}</span>}
				</React.Fragment>
			)}
		</button>
	);
}

Button.defaultProps = {
	background: 'contrast',
}
