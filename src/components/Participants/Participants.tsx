import React, { Fragment } from 'react';
import classnames from 'classnames';
import './participants.scss';
import { Image, Caption, CaptionProps } from 'components';
import { useBEM } from 'utils';

const user = {
	id: 0,
	firstName: 'Андрей',
	lastName: 'Скипин',
	image: require('../../../.storybook/utils/avatar.png'),
	isInitiator: false,
	hasJoined: false,
}

const participants = [
	{ id: 0, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png') },
	{ id: 1, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png'), isInitiator: true },
	{ id: 2, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png') },
	{ id: 3, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png') },
	{ id: 4, firstName: 'Андрей', lastName: 'Скипин', image: require('../../../.storybook/utils/avatar.png') },
];

const [participantsBlock, , participantsElement] = useBEM('participants');
const [galleryElement, galleryModifier] = participantsElement('gallery');
const [gallerySlotElement, gallerySlotModifier] = participantsElement('gallery-slot');

let initiator = { firstName: '', lastName: '' }; // TODO: find better way to store initiator data

type GallerySlots = 'left' | 'middle' | 'right';

export const Participants: React.FC = () => {
	const gallery: { [key in GallerySlots]: JSX.Element[] } = { left: [], middle: [], right: [] };

	participants.forEach((p, i) => {
		const image = <Image rounded key={i} src={p.image} />;

		if (user.hasJoined && p.id === user.id) {
			return gallery.middle.push(image);
		}
		if (p.isInitiator) {
			initiator.firstName = p.firstName;
			initiator.lastName = p.lastName;
			return gallery.middle.unshift(image);
		}
		if (gallery.right.length > gallery.left.length) {
			return gallery.left.push(image);
		}
		return gallery.right.push(image);
	});

	const getGallerySlotClass = (slot: GallerySlots) => classnames(gallerySlotElement, gallerySlotModifier(slot));

	const galleryClassName = classnames(
		galleryElement,
		{ [galleryModifier('duet')]: user.hasJoined },
	)

	const title = user.isInitiator ? 'Ты' : <Fragment>{initiator.firstName} <em>{initiator.lastName}</em></Fragment>;
	const subtitle = {
		text: `+${participants.length - (user.hasJoined ? 2 : 1)} голодающих` + (user.hasJoined ? ' и ты' : ''),
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
