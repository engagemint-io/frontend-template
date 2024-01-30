import { PointCalculatorProps, PointItemType } from './types.ts';
import { ConnectXButton } from '../../../../components/ConnectXButton';
import { POINT_ITEM_TYPES } from './utils.ts';
import { useXAccount } from '../../../../hooks';
import { forwardRef } from 'react';

const PointCalculator = forwardRef<HTMLDivElement, PointCalculatorProps>(({}, ref) => {
	let userStats: any;

	const { xAccessToken } = useXAccount();

	const renderItemType = (itemType: PointItemType) => {
		return (
			<div ref={ref} className='flex flex-col flex-1' key={itemType.key}>
				<div className='flex flex-row items-center justify-between p-4'>
					<div className='flex flex-col'>
						<p className='text-em-headline text-[24px] font-bold leading-[31px] tracking-tight'>{itemType.title}</p>
						<p className='text-em-paragraph text-[15px] leading-[21px]'>--- points per {itemType.title}</p>
					</div>
					<div className='badge badge-accent'>
						<p>---</p>
						<itemType.icon />
					</div>
				</div>
				<div className='flex flex-row items-center justify-between gap-4 p-4'>
					<p>0</p>
					<input id={`${itemType}-`} type='range' min='0' max='1000' className='slider' />
					<p>1k</p>
				</div>
				<div className='flex items-center justify-center bg-em-secondary p-2'>
					<p>--- points</p>
				</div>
			</div>
		);
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
				<div className='flex flex-col p-4'>
					<p className='text-em-headline text-[30px] font-extrabold leading-10 tracking-tight'>Point calculator</p>
					<p className='text-em-paragraph text-[18px] leading-[27px]'>Earning points is simple - just use X/Twitter!</p>
				</div>
				{userStats ? <p>{userStats.total_points}</p> : xAccessToken ? null : <ConnectXButton className='w-full' />}
			</div>
			<div className='flex flex-row flex-wrap bg-em-card border border-solid border-em-border-row rounded-3xl'>{POINT_ITEM_TYPES.map(renderItemType)}</div>
		</div>
	);
});

export default PointCalculator;
