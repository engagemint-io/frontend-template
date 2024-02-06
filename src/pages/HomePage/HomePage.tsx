import { PointCalculator, EpochCalendar, PointInfo, ProjectInfo } from './components';
import { useRef } from 'react';

const HomePage = () => {
	const calculatorSection = useRef<HTMLDivElement>(null);

	return (
		<div className='flex flex-col px-[1rem] py-[11.5rem] md:px-[10rem] md:py-[15rem] w-full overflow-auto gap-[8rem]'>
			<ProjectInfo calculatorRef={calculatorSection} />
			<PointInfo />
			<PointCalculator ref={calculatorSection} />
			<EpochCalendar />
		</div>
	);
};

export default HomePage;
