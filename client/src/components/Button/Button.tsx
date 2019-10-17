import React from 'react';
import classnames from 'classnames';
import './button.scss';
import { useBEM, useProps } from 'alias/utils';
import { Icon, IconProps, Image, ImageProps } from 'alias/components';

export type ButtonProps = {
	text?: string;
	background?: 'contrast' | 'accent' | 'glassy' | 'none';
	disabled?: boolean;
	icon?: IconProps;
	image?: ImageProps['src'];
	autoWidth?: boolean;
	rounded?: boolean;

	onClick?: (e: React.MouseEvent) => void;
}

const [buttonBlock, buttonModifier, buttonElement] = useBEM('button');
const [textElement] = buttonElement('text');

export const Button: React.FC<ButtonProps> = (props) => {
	const {
		children, disabled, text, background,
		icon, autoWidth, onClick, rounded, image,
	} = props;

	const { isDefaultProp } = useProps(props, Button.defaultProps!);
	const buttonClass = classnames(
		buttonBlock,
		{
			[buttonModifier({ background })]: !isDefaultProp('background'),
			[buttonModifier('width-auto')]: autoWidth,
			[buttonModifier('custom')]: children,
			[buttonModifier('rounded')]: rounded,
		},
	);

	return (
		<button className={buttonClass} disabled={disabled} onClick={onClick}>
			{children || (
				<React.Fragment>
					{icon && <Icon {...icon} />}
					{image && <Image src={image} rounded border='contrast' />}
					{text && <span className={textElement}>{text}</span>}
				</React.Fragment>
			)}
		</button>
	);
}

Button.defaultProps = {
	background: 'contrast',
}
