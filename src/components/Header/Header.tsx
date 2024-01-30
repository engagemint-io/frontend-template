import { Link, useLocation } from 'react-router-dom';
import { ConnectXButton } from '../';
import cn from 'classnames';
import ProjectLogo from '../../assets/project-logo.svg';
import { IoMenu } from 'react-icons/io5';
import { useRef } from 'react';
import { HeaderLink } from './types.ts';
import { HEADER_LINKS } from './config.ts';
import { MobileMenu } from '../../modals';

const Header = () => {
	const menuModal = useRef<HTMLDialogElement>(null);
	const location = useLocation();

	const showModal = () => {
		if (!menuModal?.current) return;
		menuModal.current.showModal();
	};

	const hideModal = () => {
		if (!menuModal?.current) return;
		menuModal.current.close();
	};

	return (
		<div className='navbar flex flex-row justify-between items-center w-full gap-4 p-4 bg-[#23232599] h-[80px] min-h-[80px]'>
			<IoMenu className='md:hidden w-[32px] h-[32px]' width={32} height={32} onClick={showModal} />
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
			<div className='flex-1 justify-end items-center'>
				<ConnectXButton />
			</div>
			<MobileMenu ref={menuModal} hideModal={hideModal} />
		</div>
	);
};

export default Header;
