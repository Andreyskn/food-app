import React, { Fragment, useContext } from 'react';
import classnames from 'classnames';
import './participants.scss';
import { Image, ImageProps, Caption, CaptionProps } from 'alias/components';
import { useBEM } from 'alias/utils';
import { AppContext } from 'alias/app';

type GallerySlots = 'left' | 'middle' | 'right';

const [participantsBlock, , participantsElement] = useBEM('participants');
const [galleryElement, galleryModifier] = participantsElement('gallery');
const [gallerySlotElement, gallerySlotModifier] = participantsElement('gallery-slot');

const makeImage = (src: ImageProps['src'], key: React.Key) => <Image rounded key={key} src={src} />

export const Participants: React.FC = () => {
	const { user, activeOrder } = useContext(AppContext);
	const { participants, initiator } = activeOrder!;


	const gallery: { [key in GallerySlots]: JSX.Element[] } = { left: [], middle: [], right: [] };

	if (user.isInitiator) gallery.middle.push(makeImage(user.image, 0));
	else {
		gallery.middle.unshift(makeImage(initiator!.image, 0));
		user.hasJoined && gallery.middle.push(makeImage(user.image, 1));
	}

	participants.forEach((p, i) => {
		const image = makeImage(p.image, i);
		gallery.right.length > gallery.left.length ? gallery.left.push(image) : gallery.right.push(image);
	});

	const getGallerySlotClass = (slot: GallerySlots) => classnames(gallerySlotElement, gallerySlotModifier(slot));

	const galleryClassName = classnames(
		galleryElement,
		{ [galleryModifier('duet')]: user.hasJoined },
	)

	const title = user.isInitiator ? 'Ты' : <Fragment>{initiator!.firstName} <em>{initiator!.lastName}</em></Fragment>;
	const subtitle = {
		text: `+${participants.length} голодающих ${user.hasJoined ? 'и ты' : ''}`,
	}

	const captionProps: CaptionProps = {
		align: 'center',
		color: user.isInitiator ? 'accent' : 'default',
		size: 'small',
		subtitle,
	}

	return (
		<div className={participantsBlock}>
			<div className={galleryClassName}>
				<div className={getGallerySlotClass('left')}>{gallery.left}</div>
				<div className={getGallerySlotClass('middle')}>{gallery.middle}</div>
				<div className={getGallerySlotClass('right')}>{gallery.right}</div>
			</div>
			<Caption {...captionProps}>{title}</Caption>
		</div>
	);
}
