import React, { useState } from 'react';
import { useBEM } from 'alias/utils';
import { TileSet, Tile, Image, ImageProps, Caption, Button } from 'alias/components';

type ModalBaseProps = {
	open: boolean;
	logo?: ImageProps['src'];
	text?: string;
	background?: string;
	onSelect?: () => void;
	onClose: () => void;
}

export type ModalProps = Required<Omit<ModalBaseProps, 'open' | 'onClose'>>;

export const useModal = () => {
	const [state, setState] = useState<Omit<ModalBaseProps, 'onClose'>>({ open: false });

	const showModal = (props: ModalProps) => setState({ open: true, ...props });

	const closeModal = () => setState({ open: false });

	const Modal = () => <ModalBase {...state} onClose={closeModal} />;

	return { Modal, showModal };
}

const [overlayBlock] = useBEM('modal-overlay');
const [modalBlock, , modalElement] = useBEM('modal');
const [actionsElement] = modalElement('actions');

const ModalBase: React.FC<ModalBaseProps> = (props) => {
	const { logo, text, background, open, onClose, onSelect } = props;

	if (!open) return null;

	return (
		<div className={overlayBlock} onClick={onClose}>
			<div className={modalBlock}>
				<TileSet direction='column'>
					<Tile background='contrast' customBackground={background}>
						<Image src={logo!} rounded />
					</Tile>
					<Tile background='contrast'>
						<Caption>
							{text}?
						</Caption>
						<div className={actionsElement}>
							<Button text='Да' background='accent' onClick={onSelect} />
							<Button text='Нет' onClick={onClose} />
						</div>
					</Tile>
				</TileSet>
			</div>
		</div>
	)
}
