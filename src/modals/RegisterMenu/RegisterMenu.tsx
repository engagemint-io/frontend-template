import { RegisterMenuProps } from './types';
import { forwardRef } from 'react';
import { PiXBold } from 'react-icons/pi';
import { useDBProjectConfig } from '../../hooks';

const RegisterMenu = forwardRef<HTMLDialogElement, RegisterMenuProps>(({ hideModal }, ref) => {
	const { projectConfig } = useDBProjectConfig();
	// Step 1: Check if the user has tweeted the required text using the tweet search endpoint
	// Step 2: If the user has tweeted the required text, show success
	// Step 3: If the user has not tweeted the required text, show error
	return (
		<dialog ref={ref} id='register_modal' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box bg-[#313133] flex flex-col gap-12'>
				<div className='flex flex-row items-center justify-between'>
					<p className='text-em-headline text-2xl font-bold'>Register</p>
					<PiXBold className='text-em-headline h-6 w-6 cursor-pointer hover:opacity-80' onClick={hideModal} />
				</div>
				<div className='flex flex-col gap-2'>
					<p>You must register before tracking your user stats.</p>
					<p>Registration requirement:</p>
					<p>Send a tweet saying "{projectConfig?.pre_defined_tweet_text}"</p>
					<a href={`https://twitter.com/intent/tweet?text=${projectConfig?.pre_defined_tweet_text}`} target='_blank' className='btn btn-secondary'>
						tweet now
					</a>
				</div>
				<div className='flex flex-row justify-between items-center'>
					<button className='btn btn-ghost' onClick={hideModal}>
						cancel
					</button>
					<button className='btn btn-primary'>verify tweet & register</button>
				</div>
			</div>
		</dialog>
	);
});

export default RegisterMenu;
