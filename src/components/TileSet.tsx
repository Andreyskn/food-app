import React from 'react';
import classnames from 'classnames';
import { useBEM, useProps } from '../utils';

export type TileSetItem = {
	content: React.ReactNode;
	background?: 'contrast' | 'transparent' | 'none';
	padding?: 'large' | 'medium' | 'small' | 'none';
}

export type TileSetProps = {
	direction?: 'row' | 'column';
	items: TileSetItem[];
}

type DefaultProps = { tileSet: Partial<TileSetProps>, item: Partial<TileSetItem> };
const defaultProps: DefaultProps = {
	tileSet: {
		direction: 'row',
	},
	item: {
		background: 'none',
		padding: 'none',
	},
}

const [tileSetBlock, tileSetModifier, tileSetElement] = useBEM('tile-set');
const [itemElement, itemModifier] = tileSetElement('item');

export const TileSet: React.FC<TileSetProps> = (props) => {
	const { items, direction } = props;

	const [isDefaultProp] = useProps(props, defaultProps.tileSet);
	const tileSetClass = classnames(
		tileSetBlock,
		{ [tileSetModifier(`direction-${direction}`)]: !isDefaultProp('direction') },
	);

	return (
		<div className={tileSetClass}>
			{renderItems(items)}
		</div>
	);
}

const renderItems = (items: TileSetItem[]) => items.map(item => {
	const { content, ...itemProps } = item;
	if (!content) return null;

	const { background, padding } = itemProps;
	const [isDefaultProp] = useProps(itemProps, defaultProps.item);
	const itemClass = classnames(
		itemElement,
		{ [itemModifier(`background-${background}`)]: !isDefaultProp('background') },
		{ [itemModifier(`padding-${padding}`)]: !isDefaultProp('padding') },
	);

	return <div className={itemClass}>{content}</div>;
});


