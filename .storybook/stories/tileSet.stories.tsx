import React from 'react';
import { storiesOf } from '@storybook/react';
import { radios } from '@storybook/addon-knobs';

import { TileSet, TileSetProps, TileSetItem } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('TileSet', () => {
	const props: TileSetProps = {
		direction: radios<TileSetProps['direction']>(
			'Direction',
			{ Row: 'row', Column: 'column' },
			'row',
			'Main',
		),
		items: [
			{ 
				content: <div>Item 1</div>,
				background: radios<TileSetItem['background']>(
					'Item 1 Background',
					{ None: 'none', Contrast: 'contrast', Transparent: 'transparent' },
					'contrast',
					'Items',
				),
				padding: radios<TileSetItem['padding']>(
					'Item 1 Padding',
					{ None: 'none', Large: 'large', Medium: 'medium', Small: 'small' },
					'medium',
					'Items',
				)
			},
			{ 
				content: <div>Item 2</div>,
				background: radios<TileSetItem['background']>(
					'Item 2 Background',
					{ None: 'none', Contrast: 'contrast', Transparent: 'transparent' },
					'contrast',
					'Items',
				),
				padding: radios<TileSetItem['padding']>(
					'Item 2 Padding',
					{ None: 'none', Large: 'large', Medium: 'medium', Small: 'small' },
					'medium',
					'Items',
				)
			}
		],
	};

	return (
		<Container>
			<TileSet {...props} />
		</Container>
	);
});
