import React, { useContext } from 'react';
import classnames from 'classnames';
import './header.scss';
import { useBEM, useProps } from 'alias/utils';
import { Button, Image, ImageProps } from 'alias/components';
import { AppContext } from 'alias/app';

export type HeaderProps = {
	background?: 'none' | 'accent';
	mode?: 'user' | 'back' | 'logo';
}

const [headerBlock, headerModifier] = useBEM('header');

export const Header: React.FC<HeaderProps> = (props) => {
	const { mode, background } = props;
	const { goBack, user, activeOrder } = useContext(AppContext);
	const { isDefaultProp } = useProps(props, Header.defaultProps!);

	let logoSrc: ImageProps['src'];
	let headerStyle: React.CSSProperties | undefined;

	if (mode === 'logo' && activeOrder) {
		logoSrc = activeOrder.restaurant.logo;

		const { backgroundColor } = activeOrder.restaurant;
		if (backgroundColor) headerStyle = { backgroundColor };
	}

	const headerClass = classnames(
		headerBlock,
		{ [headerModifier({ background })]: !isDefaultProp('background') },
	);

	const content: { [key in Required<HeaderProps>['mode']]: JSX.Element } = {
		back: <Button text='Назад' icon={{ name: 'back' }} background='none' autoWidth onClick={goBack} />,
		user: <Button image={user.image} text={user.firstName} background='none' autoWidth />,
		logo: <Image src={logoSrc!} rounded />,
	}

	return (
		<div className={headerClass} style={headerStyle}>
			{content[mode!]}
		</div>
	);
}

Header.defaultProps = {
	mode: 'user',
	background: 'none',
}
