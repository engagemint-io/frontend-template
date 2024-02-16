import { ConnectXButtonProps } from './types';
import { Link } from 'react-router-dom';
import XIcon from '../../assets/x-icon.svg';
import cn from 'classnames';
import { useXAccount } from '../../hooks';
import { PiWarningDiamondFill } from 'react-icons/pi';
import { isFetchingXAuthUrlState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

const ConnectXButton = ({ className }: ConnectXButtonProps) => {
	const { xAccountId, xAuthUrlResponse, xProfileImageUrl, logout } = useXAccount();

	const isFetchingXAuthUrl = useRecoilValue(isFetchingXAuthUrlState);

	if (xProfileImageUrl) {
		return <img className='h-10 rounded-3xl cursor-pointer hover:opacity-80' alt='X user img' src={xProfileImageUrl} onClick={logout} />;
	}

	if (xAccountId) {
		return (
			<button className={cn('btn btn-secondary', className)} onClick={logout}>
				CONNECTED
				<img className='h-4' alt='X Icon' src={XIcon} />
			</button>
		);
	}

	if (xAuthUrlResponse) {
		return (
			<Link to={xAuthUrlResponse.xAuthUrl} onClick={() => sessionStorage.setItem('lastRequestedCodeVerifier', xAuthUrlResponse?.xCodeVerifier)}>
				<button className={cn('btn btn-secondary', className)}>
					CONNECT
					<img className='h-4' alt='X Icon' src={XIcon} />
				</button>
			</Link>
		);
	}

	if (!xAuthUrlResponse && !isFetchingXAuthUrl) {
		return (
			<button className='btn btn-error' disabled={true}>
				<PiWarningDiamondFill />
				connection error
			</button>
		);
	}

	return (
		<div className='flex flex-row justify-center items-center w-[127px] '>
			<div className='loading' />
		</div>
	);
};

export default ConnectXButton;
