import React from 'react';
import classnames from 'classnames';
import { useBEM } from '../utils';
import { Button } from './Button';
// import { Image, ImageProps } from './Image';

export type HeaderProps = {
	logo?: any;
	background?: 'accent' | React.CSSProperties['backgroundColor'];
}

const [headerBlock] = useBEM('header');

export const Header: React.FC<HeaderProps> = (props) => {
	const {  } = props;

	// const [isDefaultProp] = useProps(props, Header.defaultProps!);
	const buttonClass = classnames(
		headerBlock,
		// { [buttonModifier({ background })]: !isDefaultProp('background') },
	);

	return (
		<div className={buttonClass}>
			<Button text='Назад' background='none' icon={{ name: 'back' }} autoWidth />
		</div>
	);
}

Header.defaultProps = {
	
}
