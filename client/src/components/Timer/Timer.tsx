import React, { useState, useEffect, useContext } from 'react';
import './timer.scss';
import { useBEM, msToTime } from 'alias/utils';
import { AppContext } from 'alias/app';

const [timerBlock] = useBEM('timer');

export type TimerProps = {
	timeUntil: 'orderEnd' | 'delivery';
}

export const Timer: React.FC<TimerProps> = (props) => {
	const { timeUntil } = props;
	const [, forceUpdate] = useState();
	const { activeOrder } = useContext(AppContext);
	const { orderEndTime, deliveryEndTime } = activeOrder!;

	const deadline = timeUntil === 'orderEnd' ? orderEndTime : deliveryEndTime;

	if (!deadline) return null;

	const { hours, minutes, seconds } = msToTime(deadline - Date.now());

	const tick = () => forceUpdate({});

	useEffect(() => {
		let timerId: number;
		if (hours > 0 || minutes > 0 || seconds > 0) {
			timerId = window.setTimeout(tick, 1000);
		}
		return () => clearTimeout(timerId);
	});

	return (
		<span className={timerBlock}>
			{
				(hours > 0 ? `${hours}:` : '') +
				`${minutes}`.padStart(2, '0') + ':' +
				`${seconds}`.padStart(2, '0')
			}
		</span>
	)
}
