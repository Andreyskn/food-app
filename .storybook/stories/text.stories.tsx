import React from 'react';
import { storiesOf } from '@storybook/react';
import { radios } from '@storybook/addon-knobs';

import { Text, TextProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Text', () => {
	const props: TextProps = {
		color: radios<TextProps['color']>(
			'Color',
			{ Default: 'default', Contrast: 'contrast' },
			'contrast'
		),
	};

	let backgroundColor;
	if (props.color === 'default') backgroundColor = 'white';

	return (
		<Container backgroundColor={backgroundColor}>
			<Text {...props}>Если у блюда есть различные опции, укажи нужное в {props.color === 'default' ? <span>комментарии</span> : 'комментарии'}</Text>
		</Container>
	);
});
