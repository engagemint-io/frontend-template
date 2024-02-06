import { Link, useLocation } from 'react-router-dom';
import { ConnectXButton } from '../';
import cn from 'classnames';
import ProjectLogo from '../../assets/project-logo.svg';
import { IoMenu } from 'react-icons/io5';
import { RefObject, useRef } from 'react';
import { HeaderLink } from './types.ts';
import { HEADER_LINKS } from './config.ts';
import { MobileMenu, RegisterMenu } from '../../modals';
import { useDBUser, useXAccount } from '../../hooks';

const Header = () => {
	const location = useLocation();

	const { userStats, isFetching: isLoadingUserStats } = useDBUser();
	const { xAccessToken } = useXAccount();

	const menuModal = useRef<HTMLDialogElement>(null);
	const registerModal = useRef<HTMLDialogElement>(null);

	const showModal = (ref: RefObject<HTMLDialogElement>) => {
		if (!ref?.current) return;
		ref.current.showModal();
	};

	const hideModal = (ref: RefObject<HTMLDialogElement>) => {
		if (!ref?.current) return;
		ref.current.close();
	};

	const renderRegisterConnectRegisterButton = () => {
		if (isLoadingUserStats) return <div />;

		if (xAccessToken && !userStats?.total_points)
			return (
				<button className='btn btn-secondary' onClick={() => showModal(registerModal)}>
					REGISTER
				</button>
			);

		return <ConnectXButton />;
	};

	return (
		<div className='navbar flex flex-row justify-between items-center w-full gap-4 p-4 h-20 min-h-20 backdrop-blur-3xl bg-[#23232599] absolute z-50'>
			<IoMenu className='md:hidden w-[32px] h-[32px]' width={32} height={32} onClick={() => showModal(menuModal)} />
			<div className='flex-1'>
				<img className='mt-[4px]' alt={`${import.meta.env.VITE_TICKER} logo`} src={ProjectLogo} />
			</div>
			<div className='hidden md:flex flex-1 justify-center items-center'>
				<div className='flex flex-row items-center gap-4'>
					{HEADER_LINKS.map((link: HeaderLink) => {
						return (
							<Link key={link.path} to={link.path}>
								<button className={cn('btn btn-ghost text-nowrap', { ['bg-em-ghost-active']: location.pathname === link.path })}>{link.title}</button>
							</Link>
						);
					})}
				</div>
			</div>
			<div className='flex-1 justify-end items-center'>{renderRegisterConnectRegisterButton()}</div>
			<MobileMenu ref={menuModal} hideModal={() => hideModal(menuModal)} />
			<RegisterMenu ref={registerModal} hideModal={() => hideModal(registerModal)} />
		</div>
	);
};

export default Header;
