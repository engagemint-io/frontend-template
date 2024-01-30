import { PointInfoProps } from './types.ts';
import { PiTwitterLogoBold } from 'react-icons/pi';

const PointInfo = ({}: PointInfoProps) => {
	return (
		<div className='flex flex-col md:flex-row justify-between p-4 gap-12'>
			<div>
				<h2 className='text-3xl leading-tight font-extrabold text-em-headline'>How points work?</h2>
				<p className='text-em-paragraph text-lg mb-8'>Earning points is simple - just use X (Twitter)!</p>
				<p className='text-em-paragraph text-lg'>
					Reply, quote, or tweet out mentioning <span className='badge badge-primary'>#{import.meta.env.VITE_TICKER}</span> or{' '}
					<span className='badge badge-primary'>${import.meta.env.VITE_TICKER}</span>and you will automatically be awarded points!
				</p>
				<p>And remember keep an eye out, there might be additional multipliers at claim...</p>
			</div>
			<div className='card bg-em-card rounded-3xl'>
				<div className='p-8 border-b border-solid border-b-em-border-row'>
					<p>Multipliers</p>
					<p>Depending on the type of tip, your multiplier will change as follows:</p>
				</div>
				<div className='flex flex-row items-center justify-between p-8 w-full'>
					<div className='flex flex-row items-center'>
						<PiTwitterLogoBold />
						<p>Text tweet</p>
					</div>
					<div className='badge badge-secondary'>---</div>
				</div>
			</div>
		</div>
	);
};

export default PointInfo;
