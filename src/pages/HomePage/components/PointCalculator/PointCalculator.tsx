import { PointCalculatorProps, PointCalculatorItem } from './types.ts';
import { useDBProjectConfig } from '../../../../hooks';
import { forwardRef, useMemo } from 'react';
import { POINT_ITEM_TYPES } from './utils';

const PointCalculator = forwardRef<HTMLDivElement, PointCalculatorProps>(({}, ref) => {
	const { projectConfig } = useDBProjectConfig();

	const calculatedPoints = useMemo(() => {
		return 0;
	}, []);

	const renderItemType = (itemType: PointCalculatorItem) => {
		return (
			<div className='flex flex-col' key={itemType.key}>
				<div className='flex flex-col p-6 gap-4'>
					<div className='flex flex-row items-center justify-between'>
						<div className='flex flex-col'>
							<p className='text-em-headline text-[24px] font-bold leading-[31px] tracking-tight'>{itemType.title}</p>
							{/*@ts-ignore*/}
							<p className='text-em-paragraph text-[15px] leading-[21px]'>{projectConfig?.[itemType.key]}X multiplier</p>
						</div>
						<div className='flex flex-row items-center h-10 gap-2 badge badge-accent'>
							<p>---</p>
							<itemType.icon className='text-black w-6 h-6' />
						</div>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<p>0</p>
						<input id={`${itemType}-range`} type='range' min='0' max='1000' className='slider' />
						<p>1k</p>
					</div>
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
				<div ref={ref} className='flex flex-col p-4'>
					<p className='text-em-headline text-[30px] font-extrabold leading-10 tracking-tight'>Point calculator</p>
					<p className='text-em-paragraph text-[18px] leading-[27px]'>Earning points is simple - just use X/Twitter!</p>
				</div>
				<div className='btn btn-secondary'>{calculatedPoints}</div>
			</div>
			<div className='card grid grid-cols-3 overflow-hidden bg-em-card border border-solid border-em-border-row rounded-3xl'>
				{POINT_ITEM_TYPES.map(renderItemType)}
			</div>
		</div>
	);
});

export default PointCalculator;
