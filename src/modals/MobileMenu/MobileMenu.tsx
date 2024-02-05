import { MobileMenuProps } from './types';
import ProjectLogo from '../../assets/project-logo.svg';
import { IoClose } from 'react-icons/io5';
import { HEADER_LINKS } from '../../components/Header/config.ts';
import { HeaderLink } from '../../components/Header/types.ts';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ConnectXButton } from '../../components';
import { useXAccount } from '../../hooks';
import { useRecoilValue } from 'recoil';
import { userStatsState } from '../../recoil/atoms';
import { forwardRef } from 'react';

const MobileMenu = forwardRef<HTMLDialogElement, MobileMenuProps>(({ hideModal }, ref) => {
	const { xAccessToken, logout } = useXAccount();

	const userStats = useRecoilValue(userStatsState);

	const copyShareLink = async () => {
		await navigator.clipboard.writeText(`${window.location.origin}/leaderboard`);
		hideModal();
		toast.info('Copied link to clipboard!');
	};

	const renderMenuUserStats = () => {
		if (!xAccessToken) return <ConnectXButton className='w-full' />;

		return (
			<>
				<div className='flex flex-row items-center justify-between bg-primary p-4 rounded-2xl'>
					<div>
						<p>{userStats?.total_points || '---'}</p>
						<p>Total Points</p>
					</div>
					<div className='badge badge-primary'>---</div>
				</div>
				<div className='flex flex-row justify-between items-center w-full gap-4'>
					<button className='btn btn-ghost border-[2px] border-solid border-em-border-row flex-1' onClick={logout}>
						DISCONNECT
					</button>
					<button className='btn btn-accent flex-1' onClick={copyShareLink}>
						SHARE
					</button>
				</div>
			</>
		);
	};

	return (
		<dialog ref={ref} id='menu_modal' className='modal'>
			<div className='modal-box bg-em-card rounded-none min-h-full h-full w-full p-0 flex flex-col'>
				<div className='flex flex-row items-center justify-start gap-4 w-full p-4 border-b border-solid border-em-border-row'>
					<IoClose className='h-[32px] w-[32px]' width={32} height={32} onClick={hideModal} />
					<img className='mt-[4px]' alt={`${import.meta.env.VITE_TICKER} logo`} src={ProjectLogo} />
				</div>
				<div className='flex flex-col justify-between p-8 flex-1'>
					<div className='flex flex-col gap-4'>{renderMenuUserStats()}</div>
					<div className='flex flex-col gap-4'>
						<div className='flex flex-col items-center gap-4 border-b border-em-border-row pb-4'>
							{HEADER_LINKS.map((link: HeaderLink) => {
								return (
									<button
										key={link.path}
										className={cn('btn btn-ghost text-nowrap w-full', { ['bg-em-ghost-active']: location.pathname === link.path })}
										onClick={hideModal}>
										<Link to={link.path}>{link.title}</Link>
									</button>
								);
							})}
						</div>
						<p className='text-em-headline leading-5 mt-4'>© 2024 EngageMint. All rights reserved.</p>
					</div>
				</div>
			</div>
		</dialog>
	);
});

export default MobileMenu;
