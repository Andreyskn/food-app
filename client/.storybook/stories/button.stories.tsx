import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, radios } from '@storybook/addon-knobs';

import { Button, ButtonProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Button', () => {
	const buttonProps: ButtonProps = {
		text: text('Text', 'Новый заказ'),
		disabled: boolean('Disabled', false),
		background: radios<ButtonProps['background']>(
			'Background',
			{
				Contrast: 'contrast',
				Accent: 'accent',
				Glassy: 'glassy',
				None: 'none'
			},
			'contrast'
		)
	};

	let backgroundColor;
	if (buttonProps.background === 'accent') backgroundColor = 'white';

	return (
		<Container backgroundColor={backgroundColor}>
			<Button {...buttonProps} />
		</Container>
	);
});
