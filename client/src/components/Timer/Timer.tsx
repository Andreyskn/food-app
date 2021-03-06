import React, { useState, useEffect, useContext } from 'react';
import './timer.scss';
import { useBEM, msToTime } from 'alias/utils';
import { AppContext } from 'alias/app';

const [timerBlock] = useBEM('timer');

export type TimerProps = {
	timeUntil: 'selectionEnd' | 'delivery';
}

export const Timer: React.FC<TimerProps> = (props) => {
	const { timeUntil } = props;
	const [, forceUpdate] = useState();
	const { activeOrder } = useContext(AppContext);
	const { selectionEndsAt, deliveryExpectedAt } = activeOrder!;

	const deadline = timeUntil === 'selectionEnd' ? selectionEndsAt : deliveryExpectedAt;

	if (!deadline) return null;

	const { hours, minutes, seconds } = msToTime(deadline - Date.now());

	const tick = () => forceUpdate({});

	const shouldTick = hours > 0 || minutes > 0 || seconds > 0;

	useEffect(() => {
		let timerId: number;
		if (shouldTick) {
			timerId = window.setTimeout(tick, 1000);
		}
		return () => clearTimeout(timerId);
	});

	return (
		<span className={timerBlock}>
			{shouldTick ? (
				(hours > 0 ? `${hours}:` : '') +
				`${minutes}`.padStart(2, '0') + ':' +
				`${seconds}`.padStart(2, '0')
			) : (
				'00:00'
			)}
		</span>
	)
}
