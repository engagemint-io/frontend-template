import { PointCalculatorProps, PointCalculatorItem } from './types.ts';
import { useDBProjectConfig } from '../../../../hooks';
import { Dispatch, forwardRef, SetStateAction, useMemo, useState } from 'react';
import { LIKE_ITEM, QUOTE_ITEM, REPLY_ITEM, RETWEET_ITEM, VIDEO_VIEW_ITEM, VIEW_ITEM } from './utils';

const PointCalculator = forwardRef<HTMLDivElement, PointCalculatorProps>(({}, ref) => {
	const { projectConfig } = useDBProjectConfig();

	const viewCount = useState<number>(100);
	const likesCount = useState<number>(100);
	const repliesCount = useState<number>(100);
	const retweetCount = useState<number>(100);
	const quotesCount = useState<number>(100);
	const videoViewsCount = useState<number>(100);

	const viewPoints = useMemo(() => {
		return viewCount[0] * (projectConfig?.view_multiplier || 1);
	}, [projectConfig?.view_multiplier]);

	const videoViewPoints = useMemo(() => {
		return videoViewsCount[0] * (projectConfig?.video_view_multiplier || 1);
	}, [projectConfig?.video_view_multiplier]);

	const likePoints = useMemo(() => {
		return likesCount[0] * (projectConfig?.like_multiplier || 1);
	}, [projectConfig?.like_multiplier]);

	const replyPoints = useMemo(() => {
		return repliesCount[0] * (projectConfig?.reply_multiplier || 1);
	}, [projectConfig?.reply_multiplier]);

	const retweetPoints = useMemo(() => {
		return retweetCount[0] * (projectConfig?.retweet_multiplier || 1);
	}, [projectConfig?.retweet_multiplier]);

	const quotePoints = useMemo(() => {
		return quotesCount[0] * (projectConfig?.quote_multiplier || 1);
	}, [projectConfig?.quote_multiplier]);

	const calculatedPoints = useMemo(() => {
		return viewPoints + videoViewPoints + likePoints + replyPoints + retweetPoints + quotePoints;
	}, [viewPoints, videoViewPoints, likePoints, replyPoints, retweetPoints, quotePoints]);

	const renderItemType = (itemType: PointCalculatorItem, state: [number, Dispatch<SetStateAction<number>>], points: number) => {
		const [value, setValue] = state;

		return (
			<div className='flex flex-col' key={itemType.key}>
				<div className='flex flex-col p-6 gap-4 flex-1'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-col'>
							<p className='text-em-headline text-[24px] font-bold leading-[31px] tracking-tight'>{itemType.title}</p>
							<p className='text-em-paragraph text-[15px] leading-[21px]'>
								{/*@ts-ignore*/}
								{projectConfig?.[itemType.key]} point{projectConfig?.[itemType.key] > 1 ? 's' : ''} per {itemType.singular}
							</p>
						</div>
						<div className={`flex flex-row items-center h-10 gap-2 px-4 py-2 badge badge-accent border-none ${itemType.color}`}>
							<p className='text-black font-bold text-lg'>{value.toLocaleString()}</p>
							<itemType.icon className='text-black w-6 h-6' />
						</div>
					</div>
					<div className='flex flex-row items-center justify-between gap-4'>
						<p>0</p>
						<input
							type='range'
							min='0'
							max='1000'
							className='slider w-full [&::-moz-range-track]:bg-white [&::-webkit-slider-thumb]:h-[50px] [&::-webkit-slider-thumb]:bg-white'
							value={value}
							onChange={(e) => setValue(parseInt(e.target.value))}
						/>
						<p>1k</p>
					</div>
				</div>
				<div className='flex items-center justify-center bg-em-secondary p-2'>
					<p className='text-em-headline text-2xl font-semibold text-center'>{points.toLocaleString()} points</p>
				</div>
			</div>
		);
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
				<div ref={ref} className='flex flex-col p-4'>
					<p className='text-em-headline text-[30px] font-extrabold leading-10 tracking-tight'>Point calculator</p>
					<p className='text-em-paragraph text-[18px] leading-[27px]'>Earning points is simple - just use X/Twitter!</p>
				</div>
				<div className='flex items-center justify-center p-4 bg-white text-black text-3xl font-medium rounded-xl'>{calculatedPoints.toLocaleString()} points</div>
			</div>
			<div className='card grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 overflow-hidden bg-em-card border border-solid border-em-border-row rounded-3xl'>
				{renderItemType(VIEW_ITEM, viewCount, viewPoints)}
				{renderItemType(VIDEO_VIEW_ITEM, videoViewsCount, videoViewPoints)}
				{renderItemType(LIKE_ITEM, likesCount, likePoints)}
				{renderItemType(REPLY_ITEM, repliesCount, replyPoints)}
				{renderItemType(RETWEET_ITEM, retweetCount, retweetPoints)}
				{renderItemType(QUOTE_ITEM, quotesCount, quotePoints)}
			</div>
		</div>
	);
});

export default PointCalculator;
