import React, { Fragment, useContext } from 'react';
import classnames from 'classnames';
import './participants.scss';
import { Image, ImageProps, Caption, CaptionProps } from 'alias/components';
import { useBEM } from 'alias/utils';
import { AppContext, UserOrdered } from 'alias/app';

type GallerySlot = 'left' | 'middle' | 'right';
type Gallery = Record<GallerySlot, JSX.Element[]>;

const [participantsBlock, , participantsElement] = useBEM('participants');
const [galleryElement, galleryModifier] = participantsElement('gallery');
const [gallerySlotElement, gallerySlotModifier] = participantsElement('gallery-slot');

const makeImage = (src: ImageProps['src'], key: React.Key) => <Image rounded key={key} src={src} />

export const Participants: React.FC = () => {
	const { user, activeOrder } = useContext(AppContext);
	const { participants, host } = activeOrder!;

	const userIsHost = (user as UserOrdered).isHost;
	const userIsParticipant = user.status === 'ordered' && !user.isHost;
	
	const gallery: Gallery = { left: [], middle: [], right: [] };

	gallery.middle.push(makeImage(host.image, 0));

	if (userIsParticipant) {
		gallery.middle.push(makeImage(user.image, 1));
	}

	participants.forEach((p, i) => {
		if (p.id === user.id) return;

		const image = makeImage(p.image, i);
		gallery.right.length > gallery.left.length ? gallery.left.push(image) : gallery.right.push(image);
	});

	const getGallerySlotClass = (slot: GallerySlot) => classnames(gallerySlotElement, gallerySlotModifier(slot));

	const galleryClassName = classnames(
		galleryElement,
		{ [galleryModifier('duet')]: userIsParticipant },
	)

	const title = userIsHost ? 'Ты' : <Fragment>{host.firstName} <em>{host.lastName}</em></Fragment>;
	const subtitle = {
		text: `+${participants.length} голодающих ${userIsParticipant ? 'и ты' : ''}`,
	}

	const captionProps: CaptionProps = {
		align: 'center',
		color: userIsHost ? 'accent' : 'default',
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
