import React, { useContext, useState } from 'react';
import './orderSelection.scss';
import { useBEM, price } from 'alias/utils';
import { Caption, Timer, TileSet, Tile, Button, Text } from 'alias/components';
import { AppContext } from 'alias/app';

const [viewBlock, , viewElement] = useBEM('order-selection');
const [iframeElement] = viewElement('iframe');
const [orderElement] = viewElement('order');
const [itemElement] = viewElement('item');
const [itemPriceElement] = viewElement('item-price');

type SelectedItem = {
	id: symbol;
	name: string;
	price: number;
	category: string;
	commentary?: string;
}

export const OrderSelection: React.FC = () => {
	const [items, setItems] = useState<SelectedItem[]>([]);
	const { activeOrder, ipc } = useContext(AppContext);
	const { restaurant } = activeOrder!;

	// const addItem = () => {
	// 	setItems([
	// 		...items,
	// 		{
	// 			id: Symbol(),
	// 			name: 'Куринные палочки',
	// 			category: 'Закуски',
	// 			price: 150,
	// 		}
	// 	]);
	// }

	const removeItem = (id: SelectedItem['id']) => () => {
		setItems(items.filter(item => item.id !== id));
	}

	const onPlaceOrder = () => ipc.send('PLACE_ORDER', 1);

	return (
		<div className={viewBlock}>
			<iframe className={iframeElement} src={restaurant.link} />
			<div className={orderElement}>
				<div className='caption-wrapper'>
					<Caption weight='medium' size='large' subtitle={{ text: items.length ? `${items.length} блюда` : 'Пусто' }}>
						Мой заказ
					</Caption>
					<Caption align='right' weight='medium' size='large' color='accent' subtitle={{ text: 'До конца' }}>
						<Timer timeUntil='selectionEnd' />
					</Caption>
				</div>

				{items.length ? (
					items.map((item, i) => (
						<div className={itemElement} key={i}>
							<Button icon={{ name: 'plus', rotate: '45' }} onClick={removeItem(item.id)} autoWidth />
							<Caption subtitle={{ text: item.category }} size='small'>
								{item.name}
							</Caption>
							<div className={itemPriceElement}>
								{price(item.price)}
							</div>
						</div>
					))
				) : (
					<TileSet direction='column'>
						<Tile>
							<Text>
								Чтобы добавить блюдо в заказ,<br /><span>кликни</span> по его названию ПКМ
							</Text>
						</Tile>
						<Tile>
							<Text>
								Если что-то пошло не так,<br />добавь детали <span>вручную</span>
							</Text>
						</Tile>
						<Tile>
							<Text>
								Если у блюда есть различные опции,<br />укажи нужное в <span>комментарии</span>
							</Text>
						</Tile>
					</TileSet>
				)}

				<div className='actions'>
					<Button text='Заказать!' background='accent' onClick={onPlaceOrder} />{/*  disabled={!items.length}  */}
					<Button text='Я передумал...' background='glassy' />
				</div>
			</div>
		</div>
	)
}
