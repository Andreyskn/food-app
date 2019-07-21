import React from 'react';
import classnames from 'classnames';
import './styles';
import { useBEM } from 'utils';
import { Icons } from './SVGicons';

export type IconProps = {
	name: keyof typeof Icons;
	rotate?: '45';
}

const [iconBlock, iconModifier] = useBEM('icon');

export const Icon: React.FC<IconProps> = (props) => {
	const { name, rotate } = props;

	const iconClass = classnames(
		iconBlock,
		{ [iconModifier({ rotate })]: rotate },
	)

	return <i className={iconClass}>{Icons[name]}</i>;
}
