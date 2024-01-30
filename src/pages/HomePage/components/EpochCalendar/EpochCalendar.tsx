import { useState, useEffect } from 'react';
import Calendar, { TileArgs } from 'react-calendar';
import { DateTime } from 'luxon';

import './calendar-styles.css';
import 'react-calendar/dist/Calendar.css';

const EpochCalendar = () => {
	const firstEpochStartDate = '12/04/2024';
	const [activeStartDate, setActiveStartDate] = useState(DateTime.fromFormat(firstEpochStartDate, 'MM/dd/yyyy'));

	const currentDate = DateTime.now();

	const tileClassName = ({ date }: TileArgs) => {
		const dateToRender = DateTime.fromJSDate(date);

		const currentWeek = currentDate.weekNumber;
		const dateToRenderWeek = dateToRender.weekNumber;

		if (currentWeek === dateToRenderWeek) {
			return '!bg-success-bg !h-12 text-black';
		}
		return '!bg-transparent !rounded-2xl !h-12';
	};

	useEffect(() => {
		setActiveStartDate(DateTime.now());
	}, []);

	return (
		<div className='flex flex-col card bg-em-card p-12 rounded-3xl gap-12'>
			<div className='flex flex-row items-center justify-between'>
				<p className='text-em-headline text-4xl font-bold'>
					Epochs in {currentDate.monthLong} {currentDate.year}
				</p>
				<div className='flex flex-col justify-start items-end'>
					<p></p>
					<p>Current epoch</p>
				</div>
			</div>
			<Calendar
				className='!w-full !bg-transparent !border-none'
				defaultView='month'
				minDetail='month'
				maxDetail='month'
				showNavigation={false}
				minDate={activeStartDate.toJSDate()}
				tileClassName={tileClassName}
				activeStartDate={activeStartDate.toJSDate()}
			/>
		</div>
	);
};

export default EpochCalendar;
