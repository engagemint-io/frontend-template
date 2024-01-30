import { PointCalculator, EpochCalendar, PointInfo, ProjectInfo } from './components';
import { useRef } from 'react';

const HomePage = () => {
	const calculatorSection = useRef<HTMLDivElement>(null);

	return (
		<div className='flex flex-col p-6 md:p-[10rem] w-full overflow-auto gap-[8rem]'>
			<ProjectInfo calculatorRef={calculatorSection} />
			<PointCalculator ref={calculatorSection} />
			<PointInfo />
			<EpochCalendar />
		</div>
	);
};

export default HomePage;
