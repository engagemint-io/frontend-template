import { PointCalculator, EpochCalendar, PointInfo, ProjectInfo } from './components';
import { useRef } from 'react';
import { Footer } from '../../components';

const HomePage = () => {
	const calculatorSection = useRef<HTMLDivElement>(null);

	return (
		<div className='flex flex-col px-[1rem] py-[11.5rem] md:px-[6rem] md:py-[15rem] lg:px-[10rem] lg:py-[15rem] w-full overflow-auto gap-[8rem]'>
			<ProjectInfo calculatorRef={calculatorSection} />
			<PointInfo />
			<PointCalculator ref={calculatorSection} />
			<EpochCalendar />
			<Footer />
		</div>
	);
};

export default HomePage;
