import { ProjectInfoProps } from './types.ts';
import { HeaderItem } from '../../types.ts';
import ProjectHeroImage from '../../../../assets/project-hero.png';
import { PiPlugsConnected } from 'react-icons/pi';
import { ConnectXButton } from '../../../../components/ConnectXButton';
import { useXAccount } from '../../../../hooks';
import { HEADER_ITEMS } from './config.tsx';

const ProjectInfo = ({ calculatorRef }: ProjectInfoProps) => {
	const { xProfileImageUrl } = useXAccount();

	const onClickGetStarted = () => {
		const element = document?.getElementById('register_modal');

		if (!element) return;

		(element as HTMLDialogElement).showModal();
	};

	const renderHeaderItem = (headerItem: HeaderItem) => {
		return (
			<div
				key={headerItem.title}
				className='h-fit card rounded-[2rem] bg-em-card w-full md:w-[47%] xl:w-96 border border-solid border-em-border-table shadow-xl py-12 px-6 gap-4'>
				<p className='text-em-headline text-xl font-bold tracking-tight'>{headerItem.title}</p>
				<p>{headerItem.description}</p>
				{headerItem.icon}
			</div>
		);
	};

	return (
		<div className='flex flex-col gap-16 m-w-[1360px]'>
			<div className='relative flex flex-col md:flex-row-reverse justify-between gap-8 md:gap-[4rem]'>
				<div className='relative flex justify-end'>
					<div className='bg-primary absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-75 blur-[20rem]'></div>
					<img src={ProjectHeroImage} className='w-[50%] lg:w-fit lg:h-fit self-start top-[-2rem] right-0' alt={`${import.meta.env.VITE_TICKER} header image`} />
				</div>
				<div className='flex flex-col justify-end gap-8'>
					<h1 className='text-em-headline text-5xl md:text-[86px] leading-[48px] md:leading-[86px] font-extrabold max-w-full md:max-w-[720px]'>
						{import.meta.env.VITE_PAGE_HEADER}
					</h1>
					<h4 className='text-em-paragraph font-medium leading-[32px] md:leading-[46px] text-[22px] md:text-[32px] tracking-tight max-w-[720px]'>
						{import.meta.env.VITE_PAGE_DESCRIPTION}
					</h4>
				</div>
			</div>
			<div className='flex flex-row gap-4'>
				<button className='btn btn-primary rounded-xl min-h-10 h-10' onClick={onClickGetStarted}>
					GET STARTED
				</button>
				<button
					className='btn btn-ghost rounded-xl min-h-10 h-10 border-[2px] border-em-border-row'
					onClick={() => {
						if (calculatorRef?.current) {
							// TODO: Make this block 'start' on mobile and 'center' on desktop
							calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
						}
					}}>
					CALCULATOR
				</button>
			</div>
			<div className='flex flex-col md:flex-row flex-wrap xl:flex-nowrap justify-between gap-6 items-center'>
				<div className='card justify-start bg-em-link-secondary rounded-[2rem] w-full  md:w-[47%] xl:w-96 border border-solid border-em-border-table shadow-xl py-[7rem] px-6 gap-4'>
					<p className='text-black text-xl font-bold tracking-tight'>Connect</p>
					<p className='text-black'>Connect your X account</p>
					{xProfileImageUrl ? null : <ConnectXButton className='w-fit' />}
					<PiPlugsConnected className='absolute top-4 right-4 h-12 w-12 text-black' />
				</div>
				{HEADER_ITEMS.map(renderHeaderItem)}
			</div>
		</div>
	);
};

export default ProjectInfo;
