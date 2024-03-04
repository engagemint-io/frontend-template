import { PointCalculator, EpochCalendar, PointInfo, ProjectInfo } from './components';
import { useRef } from 'react';
import { Footer } from '../../components';

const HomePage = () => {
	const calculatorSection = useRef<HTMLDivElement>(null);

	return (
		<div className='flex flex-col w-full overflow-auto gap-[6rem] md:gap-[8rem] max-w-[1360px] px-[1rem] py-[11.5rem] md:px-[3rem] md:py-[15rem] lg:px-[8rem] lg:py-[12rem]'>
			<ProjectInfo calculatorRef={calculatorSection} />
			<PointInfo />
			<PointCalculator ref={calculatorSection} />
			<EpochCalendar />
			<Footer />
		</div>
	);
};

export default HomePage;
