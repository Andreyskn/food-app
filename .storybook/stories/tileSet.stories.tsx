import React from 'react';
import { storiesOf } from '@storybook/react';
import { radios } from '@storybook/addon-knobs';

import { TileSet, TileSetProps, Tile, TileProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('TileSet', () => {
	const tileSetProps: TileSetProps = {
		direction: radios<TileSetProps['direction']>(
			'Direction',
			{ Row: 'row', Column: 'column' },
			'row',
			'Main',
		),
	};

	const tile1props: TileProps = {
		background: radios<TileProps['background']>(
			'Item 1 Background',
			{ None: 'none', Contrast: 'contrast', Glassy: 'glassy' },
			'contrast',
			'Items',
		),
		padding: radios<TileProps['padding']>(
			'Item 1 Padding',
			{ None: 'none', Large: 'large', Medium: 'medium', Small: 'small' },
			'medium',
			'Items',
		)
	}

	const tile2props: TileProps = {
		background: radios<TileProps['background']>(
			'Item 2 Background',
			{ None: 'none', Contrast: 'contrast', Glassy: 'glassy' },
			'contrast',
			'Items',
		),
		padding: radios<TileProps['padding']>(
			'Item 2 Padding',
			{ None: 'none', Large: 'large', Medium: 'medium', Small: 'small' },
			'medium',
			'Items',
		)
	}

	return (
		<Container>
			<TileSet {...tileSetProps}>
				<Tile {...tile1props}>
					<div>Item 1</div>
				</Tile>
				<Tile {...tile2props}>
					<div>Item 2</div>
				</Tile>
			</TileSet>
		</Container>
	);
});
