import React from 'react';
import classnames from 'classnames';
import { useBEM } from '../utils';

const icons = {
	back: <svg viewBox="0 0 24 24"><path d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12z"/></svg>,
	plus: <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
}

export type IconProps = {
	name: keyof typeof icons;
	rotate?: '45';
}

const [iconBlock, iconModifier] = useBEM('icon');

export const Icon: React.FC<IconProps> = (props) => {
	const { name, rotate } = props;

	const iconClass = classnames(
		iconBlock,
		{ [iconModifier(`rotate-${rotate}`)]: rotate },
	)

	return <i className={iconClass}>{icons[name]}</i>;
}
