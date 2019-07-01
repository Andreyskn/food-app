import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, radios } from '@storybook/addon-knobs';

import { Heading, HeadingProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Heading', () => {
	const props: HeadingProps = {
		size: radios<HeadingProps['size']>(
			'Size',
			{ Large: 'large', Medium: 'medium', Small: 'small' },
			'large'
		),
		color: radios<HeadingProps['color']>(
			'Color',
			{ Default: 'default', Contrast: 'contrast', Accent: 'accent' },
			'contrast'
		),
		align: radios<HeadingProps['align']>(
			'Align',
			{ Left: 'left', Center: 'center', Right: 'right' },
			'left'
		),
		weight: radios<HeadingProps['weight']>(
			'Font Weight',
			{ Light: 'light', Regular: 'regular', Medium: 'medium', Bold: 'bold' },
			'light',
		),
		subtitle: {
			text: 'Ожидаем участников...',
			brighten: boolean('Brighten subtitle', false)
		},
	};

	let backgroundColor;
	if (props.color === 'default') backgroundColor = 'white';
	if (props.color === 'accent') backgroundColor = 'white';

	return (
		<Container backgroundColor={backgroundColor}>
			<Heading {...props}>Заказ в процессе</Heading>
		</Container>
	);
});
