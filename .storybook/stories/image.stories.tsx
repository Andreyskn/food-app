import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, radios, number } from '@storybook/addon-knobs';

import { Image, ImageProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Image', () => {
	const props: ImageProps = {
		src: require('../utils/avatar.png'),
		rounded: boolean('Rounded', true),
		border: radios<ImageProps['border']>('Border', { None: 'none', Accent: 'accent', Contrast: 'contrast' }, 'none'),
		width: number('Width', 150),
	};

	let backgroundColor;
	if (props.border === 'accent') backgroundColor = 'white';

	return (
		<Container backgroundColor={backgroundColor}>
			<Image {...props} />
		</Container>
	);
});
