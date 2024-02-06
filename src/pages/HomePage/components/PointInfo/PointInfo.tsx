import { PointInfoItem, PointInfoProps } from './types.ts';
import { useDBProjectConfig } from '../../../../hooks';
import { POINT_INFO_ITEMS } from './utils.tsx';

const PointInfo = ({}: PointInfoProps) => {
	const { projectConfig } = useDBProjectConfig();

	const renderPointInfoItem = (item: PointInfoItem) => {
		console.log('item color', item.color);
		return (
			<div className='flex flex-row items-center justify-between py-4 px-8 w-full'>
				<div className='flex flex-row items-center gap-4'>
					<item.icon className={`text-em-link-secondary w-8 h-8 ${item.color}`} />
					<div>
						<p className='text-em-headline text-xl font-bold'>{item.title}</p>
						<p>Points per {item.singular}</p>
					</div>
				</div>
				{/*@ts-ignore*/}
				<div className='badge badge-secondary text-black font-semibold text-lg p-4'>{projectConfig?.[item.key] ? `${projectConfig[item.key]}` : '---'}</div>
			</div>
		);
	};

	return (
		<div className='flex flex-col md:flex-row justify-between md:p-4 gap-24'>
			<div className='flex-1'>
				<h2 className='text-3xl leading-tight font-extrabold text-em-headline'>How points work?</h2>
				<p className='text-em-paragraph text-lg mb-8'>Earning points is simple - just use X (Twitter)!</p>
				<p className='text-em-paragraph text-lg'>
					Reply, quote, or tweet out anything mentioning <span className='badge badge-primary'>#{import.meta.env.VITE_TICKER}</span> or{' '}
					<span className='badge badge-primary'>${import.meta.env.VITE_TICKER}</span> and you will automatically be awarded points based off how much interaction
					those tweets get!
				</p>
				<br />
				<p className='text-em-paragraph text-lg'>
					At the end of each {projectConfig?.epoch_length_days} day epoch all of the qualifying tweets you made during that time {import.meta.env.VITE_TICKER} will
					be used to calculate your score based off the engagement you get on those posts.
				</p>
				<br />
				<p className='text-em-paragraph text-lg'>Leaderboards get updated daily, so be sure to check your progress throughout the epoch.</p>
			</div>
			<div className='card bg-em-card rounded-3xl flex-1'>
				<div className='p-8 border-b border-solid border-b-em-border-row'>
					<p className='text-2xl font-semibold text-em-headline'>Multipliers</p>
					<p className='text-em-paragraph'>
						Any of your tweets mentioning #{import.meta.env.VITE_TICKER} or ${import.meta.env.VITE_TICKER} will receive points as follows:
					</p>
				</div>
				<div className='py-2 my-2'>{POINT_INFO_ITEMS.map(renderPointInfoItem)}</div>
			</div>
		</div>
	);
};

export default PointInfo;
