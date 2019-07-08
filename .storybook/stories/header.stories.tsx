import React from 'react';
import { storiesOf } from '@storybook/react';
// import { radios } from '@storybook/addon-knobs';

import { Header, HeaderProps } from '../../src/components';
import { Container } from '../utils/Container';

storiesOf('Components', module).add('Header', () => {
	const props: HeaderProps = {

	};

	return (
		<Container>
			<Header {...props} />
		</Container>
	);
});
