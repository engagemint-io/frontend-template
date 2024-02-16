import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components';
import { useDBProjectConfig, useDBUser, useXAuth } from './hooks';
import { SeiWalletProvider } from '@sei-js/react';

function App() {
	useXAuth();
	useDBProjectConfig();
	useDBUser();

	return (
		<SeiWalletProvider
			chainConfiguration={{ chainId: 'pacific-1', rpcUrl: 'https://rpc.wallet.pacific-1.sei.io', restUrl: 'https://rest.wallet.pacific-1.sei.io' }}
			wallets={['compass', 'fin', 'keplr']}>
			<div className='flex flex-col items-center h-screen max-h-[100%] w-screen max-w-[100%] overflow-auto'>
				<Header />
				<ToastContainer theme='colored' position='bottom-right' />
				<Outlet />
			</div>
		</SeiWalletProvider>
	);
}

export default App;
