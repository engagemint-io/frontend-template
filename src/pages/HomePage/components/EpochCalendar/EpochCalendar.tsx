import Calendar, { TileArgs } from 'react-calendar';
import { DateTime } from 'luxon';

import { useCurrentEpoch, useDBProjectConfig } from '../../../../hooks';

import './calendar-styles.css';
import 'react-calendar/dist/Calendar.css';
import { formatDateRange } from '../../../../utils';

const EpochCalendar = () => {
	const { currentEpoch, startDate, endDate } = useCurrentEpoch();
	const { projectConfig } = useDBProjectConfig();

	const currentDate = DateTime.now();

	const tileClassName = ({ date }: TileArgs) => {
		const dateToRender = DateTime.fromJSDate(date);

		if (!startDate || !endDate) return null;

		const isCurrentEpoch = dateToRender >= startDate && dateToRender <= endDate;

		if (isCurrentEpoch) {
			return '!bg-success-bg !h-12 !text-black';
		}

		const isNextEpoch = dateToRender > endDate && dateToRender <= endDate.plus({ days: projectConfig?.epoch_length_days });

		if (isNextEpoch) {
			return '!bg-em-secondary !h-12 !text-white';
		}

		return '!bg-transparent !rounded-2xl !h-12 !text-white';
	};

	if (!currentEpoch || !startDate || !endDate) return null;

	return (
		<div className='flex flex-col card bg-em-card p-12 rounded-3xl gap-12'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-col justify-start'>
					<p className='text-em-headline text-4xl font-bold'>
						Epochs in {currentDate.monthLong} {currentDate.year}
					</p>{' '}
					<p className='text-em-paragraph'>{projectConfig?.epoch_length_days} days per epoch</p>
				</div>

				<div className='flex flex-col justify-start items-end'>
					<p className='text-xl text-em-headline font-medium'>{formatDateRange(startDate, endDate)}</p>
					<p className='text-em-paragraph'>Current epoch</p>
				</div>
			</div>
			<Calendar
				className='!w-full !bg-transparent !border-none gap-1'
				defaultView='month'
				minDetail='month'
				maxDetail='month'
				showNavigation={false}
				tileClassName={tileClassName}
				activeStartDate={startDate?.toJSDate()}
			/>
		</div>
	);
};

export default EpochCalendar;
