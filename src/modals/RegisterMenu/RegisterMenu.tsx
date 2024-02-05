import { RegisterMenuProps } from './types';
import { forwardRef } from 'react';

const RegisterMenu = forwardRef<HTMLDialogElement, RegisterMenuProps>(({ hideModal }, ref) => {
	// Step 1: Check if the user has tweeted the required text using the tweet search endpoint
	// Step 2: If the user has tweeted the required text, show success
	// Step 3: If the user has not tweeted the required text, show error
	return (
		<dialog ref={ref} id='register_modal' className='modal modal-bottom sm:modal-middle'>
			<div className='modal-box'>
				<h1>verification</h1>
				<button className='btn btn-ghost' onClick={hideModal}>
					close
				</button>
			</div>
		</dialog>
	);
});

export default RegisterMenu;
