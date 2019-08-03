import React from 'react';
import classnames from 'classnames';
import './tileSet.scss';
import { tileSetBlock, tileSetModifier } from './common';

export type TileSetProps = {
	direction?: 'row' | 'column';
}

export const TileSet: React.FC<TileSetProps> = (props) => {
	const { direction, children } = props;

	const tileSetClass = classnames(
		tileSetBlock,
		tileSetModifier({ direction }),
	);

	return <div className={tileSetClass}>{children}</div>;
}

TileSet.defaultProps = {
	direction: 'row',
}
