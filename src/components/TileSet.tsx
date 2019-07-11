import React from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from '../utils';

export type TileSetProps = {
	direction?: 'row' | 'column';
}

const [tileSetBlock, tileSetModifier, tileSetElement] = useBEM('tile-set');

export const TileSet: React.FC<TileSetProps> = (props) => {
	const { direction, children } = props;

	const [isDefaultProp] = useProps(props, TileSet.defaultProps!);
	const tileSetClass = classnames(
		tileSetBlock,
		{ [tileSetModifier({ direction })]: !isDefaultProp('direction') },
	);

	return <div className={tileSetClass}>{children}</div>;
}

TileSet.defaultProps = {
	direction: 'row',
}

export type TileProps = {
	background?: 'contrast' | 'transparent' | 'none';
	padding?: 'large' | 'medium' | 'small' | 'none';
	customBackground?: React.CSSProperties['backgroundColor'];
	grow?: boolean;
}

const [tileElement, tileModifier] = tileSetElement('item');

export const Tile: React.FC<TileProps> = (props) => {
	const { children, background, padding, customBackground, grow } = props;

	const [isDefaultProp] = useProps(props, Tile.defaultProps!);
	const itemClass = classnames(
		tileElement,
		{ [tileModifier({ background })]: !isDefaultProp('background') },
		{ [tileModifier({ padding })]: !isDefaultProp('padding') },
		{ [tileModifier('grow')]: grow },
	);
	const tileStyle= customBackground ? { backgroundColor: customBackground } : undefined;

	return <div className={itemClass} style={tileStyle}>{children}</div>;
} 

Tile.defaultProps = {
	background: 'none',
	padding: 'none',
}
