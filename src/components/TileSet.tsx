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
}

const [tileElement, tileModifier] = tileSetElement('item');

export const Tile: React.FC<TileProps> = (props) => {
	const { background, padding, children } = props;

	const [isDefaultProp] = useProps(props, Tile.defaultProps!);
	const itemClass = classnames(
		tileElement,
		{ [tileModifier({ background })]: !isDefaultProp('background') },
		{ [tileModifier({ padding })]: !isDefaultProp('padding') },
	);

	return <div className={itemClass}>{children}</div>;
} 

Tile.defaultProps = {
	background: 'none',
	padding: 'none',
}
