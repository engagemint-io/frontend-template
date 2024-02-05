import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components';
import { useDBProjectConfig, useDBUser, useXAuth } from './hooks';

function App() {
	useXAuth();
	useDBProjectConfig();
	useDBUser();

	return (
		<div className='flex flex-col items-center h-screen max-h-[100%] w-screen max-w-[100%] overflow-auto'>
			<Header />
			<ToastContainer theme='colored' position='bottom-right' />
			<Outlet />
		</div>
	);
}

export default App;
