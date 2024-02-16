import { RegisterMenuProps } from './types';
import { forwardRef, useState } from 'react';
import { PiWarningCircleFill, PiXBold } from 'react-icons/pi';
import { projectConfigState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { useXAccount } from '../../hooks';
import { useWallet } from '@sei-js/react';
import { toast } from 'react-toastify';

const RegisterMenu = forwardRef<HTMLDialogElement, RegisterMenuProps>(({ hideModal }, ref) => {
	const { xAccessToken } = useXAccount();
	const { connectedWallet, accounts, chainId } = useWallet();

	const [isRegistering, setIsRegistering] = useState(false);

	const projectConfig = useRecoilValue(projectConfigState);

	const registerUser = async () => {
		if (isRegistering) return;

		setIsRegistering(true);

		const endpoint = `${import.meta.env.VITE_API_URL}/register`;

		if (!connectedWallet?.signArbitrary) return;

		try {
			const signature = await connectedWallet.signArbitrary(
				chainId,
				accounts[0].address,
				`Registering for ${import.meta.env.VITE_TICKER} with wallet ${accounts[0].address}`
			);

			const stringSignature = JSON.stringify(signature);

			const base64EncodedSignature = btoa(stringSignature);

			const body = {
				x_access_token: xAccessToken,
				ticker: import.meta.env.VITE_TICKER,
				signature: base64EncodedSignature,
				sei_wallet_address: accounts[0].address
			};

			try {
				const response = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${xAccessToken}`
					},
					body: JSON.stringify(body)
				});

				const data = await response.json();

				if (data.status !== 'success') {
					toast.error(data.message);
				} else {
					toast.success('Registration successful!');
					hideModal();
				}

				setIsRegistering(false);
			} catch (error: any) {
				console.log('registerUser error', error.message);
				toast.error(error.message);
				setIsRegistering(false);
			}
		} catch (error: any) {
			console.log('registerUser error', error.message);
			toast.error(error.message);
			setIsRegistering(false);
		}
	};

	const tweetLink = `https://twitter.com/intent/tweet?text=${projectConfig?.pre_defined_tweet_text}`;

	const renderNumberBadge = (number: string, text: string) => {
		return (
			<div className='flex flex-row items-center gap-4'>
				<div className='flex justify-center items-center bg-black rounded-2xl w-6 h-6'>
					<p className='text-white font-bold'>{number}</p>
				</div>
				<p className='text-[#232325B3] font-bold'>{text}</p>
			</div>
		);
	};

	return (
		<dialog ref={ref} id='register_modal' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box bg-white flex flex-col p-0'>
				<div className='flex flex-row items-center justify-between p-4'>
					<p className='text-[#232325] text-2xl font-bold'>Register</p>
					<PiXBold className='text-[#232325] h-6 w-6 cursor-pointer hover:opacity-80' onClick={hideModal} />
				</div>
				<div className='flex flex-row items-center bg-warning-bg p-3 gap-4'>
					<PiWarningCircleFill className='text-warning' />
					<p className='text-warning'>You must register before tracking your user stats.</p>
				</div>
				<div className='flex flex-col gap-6 p-4'>
					<p className='text-black font-bold'>Registration requirements:</p>
					{renderNumberBadge('1', 'Send tweet:')}
					<div className='flex flex-col gap-2 w-full'>
						<a href={tweetLink} target='_blank' className='btn btn-secondary'>
							{projectConfig?.pre_defined_tweet_text}
						</a>
					</div>
					{renderNumberBadge('2', 'Verify:')}
					{isRegistering ? (
						<button className='btn btn-primary w-full'>
							<div className='loading' />
						</button>
					) : (
						<button className='btn btn-primary w-full' onClick={registerUser}>
							verify tweet & register
						</button>
					)}
				</div>
			</div>
		</dialog>
	);
});

export default RegisterMenu;
