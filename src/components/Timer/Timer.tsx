import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useBEM, msToTime } from 'utils';

const deadline = Date.now() + 1.45 * 60 * 60 * 1000;

const [timerBlock] = useBEM('timer');

export const Timer: React.FC = () => {
	const [, forceUpdate] = useState();
	const { hours, minutes, seconds } = msToTime(deadline - Date.now());

	useEffect(() => {
		if (hours > 0 || minutes > 0 || seconds > 0) {
			setTimeout(() => forceUpdate({}), 1000);
		}
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
