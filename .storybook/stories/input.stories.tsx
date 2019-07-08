import React from 'react';
import { storiesOf } from '@storybook/react';
// import { radios } from '@storybook/addon-knobs';

import { Input, InputProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Input', () => {
	const props: InputProps = {
		placeholder: 'Название',
	};

	return (
		<Container backgroundColor='white'>
			<Input {...props} />
		</Container>
	);
});
