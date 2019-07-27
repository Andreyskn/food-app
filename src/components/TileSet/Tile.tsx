import React from 'react';
import classnames from 'classnames';
import { useProps } from 'alias/utils';
import { tileSetElement } from './common';

export type TileProps = {
	background?: 'contrast' | 'glassy' | 'none';
	padding?: 'large' | 'medium' | 'small' | 'none';
	customBackground?: React.CSSProperties['backgroundColor'];
	grow?: boolean;
}

const [tileElement, tileModifier] = tileSetElement('item');

export const Tile: React.FC<TileProps> = (props) => {
	const { children, background, padding, customBackground, grow } = props;

	const { isDefaultProp } = useProps(props, Tile.defaultProps!);
	const itemClass = classnames(
		tileElement,
		{ [tileModifier({ background })]: !isDefaultProp('background') },
		{ [tileModifier({ padding })]: !isDefaultProp('padding') },
		{ [tileModifier('grow')]: grow },
	);
	const tileStyle = customBackground ? { backgroundColor: customBackground } : undefined;

	return <div className={itemClass} style={tileStyle}>{children}</div>;
} 

Tile.defaultProps = {
	background: 'none',
	padding: 'none',
}
