import React, { useContext } from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { Button } from 'components';
import { RouterContext } from 'router';

export type HeaderProps = {
	logo?: any;
	background?: 'accent' | React.CSSProperties['backgroundColor'];
}

const [headerBlock] = useBEM('header');

export const Header: React.FC<HeaderProps> = (props) => {
	const {  } = props;
	const { goBack } = useContext(RouterContext);

	// const [isDefaultProp] = useProps(props, Header.defaultProps!);
	const buttonClass = classnames(
		headerBlock,
		// { [buttonModifier({ background })]: !isDefaultProp('background') },
	);

	return (
		<div className={buttonClass}>
			<Button text='Назад' background='none' icon={{ name: 'back' }} autoWidth onClick={goBack} />
		</div>
	);
}

Header.defaultProps = {
	
}
