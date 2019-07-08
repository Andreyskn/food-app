import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, radios } from '@storybook/addon-knobs';

import { Caption, CaptionProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Caption', () => {
	const props: CaptionProps = {
		size: radios<CaptionProps['size']>(
			'Size',
			{ Large: 'large', Medium: 'medium', Small: 'small' },
			'large'
		),
		color: radios<CaptionProps['color']>(
			'Color',
			{ Default: 'default', Contrast: 'contrast', Accent: 'accent' },
			'contrast'
		),
		align: radios<CaptionProps['align']>(
			'Align',
			{ Left: 'left', Center: 'center', Right: 'right' },
			'left'
		),
		weight: radios<CaptionProps['weight']>(
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
			<Caption {...props}>Заказ в процессе</Caption>
		</Container>
	);
});
