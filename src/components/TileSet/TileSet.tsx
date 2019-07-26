import React from 'react';
import classnames from 'classnames';
import './tileSet.scss';
import { useProps } from 'alias/utils';
import { tileSetBlock, tileSetModifier } from './common';

export type TileSetProps = {
	direction?: 'row' | 'column';
}

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
