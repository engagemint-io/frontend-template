import { PointInfoItem, PointInfoProps } from './types.ts';
import { useDBProjectConfig } from '../../../../hooks';
import { POINT_INFO_ITEMS } from './utils.tsx';

const PointInfo = ({}: PointInfoProps) => {
	const { projectConfig } = useDBProjectConfig();

	const renderPointInfoItem = (item: PointInfoItem) => {
		return (
			<div className='flex flex-row items-center justify-between py-4 px-8 w-full'>
				<div className='flex flex-row items-center gap-4'>
					<item.icon className='text-em-link-secondary w-8 h-8' />
					<div>
						<p>{item.title}</p>
					</div>
				</div>
				{/*@ts-ignore*/}
				<div className='badge badge-secondary text-black font-semibold text-lg p-4'>{projectConfig?.[item.key] ? `${projectConfig[item.key]} X` : '---'}</div>
			</div>
		);
	};

	return (
		<div className='flex flex-col md:flex-row justify-between p-4 gap-24'>
			<div className='flex-1'>
				<h2 className='text-3xl leading-tight font-extrabold text-em-headline'>How points work?</h2>
				<p className='text-em-paragraph text-lg mb-8'>Earning points is simple - just use X (Twitter)!</p>
				<p className='text-em-paragraph text-lg'>
					Reply, quote, or tweet out anything mentioning <span className='badge badge-primary'>#{import.meta.env.VITE_TICKER}</span> or{' '}
					<span className='badge badge-primary'>${import.meta.env.VITE_TICKER}</span> and you will automatically be awarded points based off how much interaction
					those tweets get!
				</p>
			</div>
			<div className='card bg-em-card rounded-3xl flex-1'>
				<div className='p-8 border-b border-solid border-b-em-border-row'>
					<p className='text-2xl font-semibold text-em-headline'>Multipliers</p>
					<p className='text-em-paragraph'>Depending on the type of tip, your multiplier will change as follows:</p>
				</div>
				<div className='py-2'>{POINT_INFO_ITEMS.map(renderPointInfoItem)}</div>
			</div>
		</div>
	);
};

export default PointInfo;
