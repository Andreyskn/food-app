import React from 'react';
import { useBEM, price } from 'alias/utils';
import { Button, Caption, Text, Image } from 'alias/components';

const participants = [
	{ id: 0, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png'), bill: 150 },
	{ id: 1, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png'), bill: 170 },
	{ id: 2, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png'), bill: 260 },
	{ id: 3, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png'), bill: 190 },
];

const [billBlock, , BillElement] = useBEM('bill');
const [itemElement] = BillElement('item');

export const Bill: React.FC = () => {
	return (
		<div className={billBlock}>
			<Caption color='accent' align='center'>Чек</Caption>
			{participants.map((p, i) => {
				return (
					<div className={itemElement} key={i}>
						<Image rounded src={p.image} />
						<Text>{p.firstName}</Text>
						<Caption color='accent' weight='light'>{price(p.bill)}</Caption>
						<Button icon={{ name: 'bell' }} background='accent' rounded />
					</div>
				)
			})}
		</div>
	)
}
