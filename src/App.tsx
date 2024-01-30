import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { Header } from './components';
import { useEffect } from 'react';
import { useXAccount } from './hooks';
import { useRecoilState } from 'recoil';
import { userStatsState, isFetchingXAccessTokenState } from './recoil/atoms';
import useCurrentEpoch from './hooks/useCurrentEpoch/useCurrentEpoch.ts';
import { projectConfigState } from './recoil/atoms';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const { xAccessToken, setXAccessToken, setXAuthUrlResponse, setXProfileImageUrl } = useXAccount();
	const { currentEpoch } = useCurrentEpoch();

	//@ts-ignore
	const [projectConfig, setProjectConfig] = useRecoilState(projectConfigState);
	//@ts-ignore
	const [userStats, setUserStats] = useRecoilState(userStatsState);
	const [isFetchingXAccessToken, setIsFetchingXAccessToken] = useRecoilState(isFetchingXAccessTokenState);

	// Get the 'code' query param from the URL, which is returned by X (Twitter) after the user logs in
	const query = new URLSearchParams(location.search);
	const code = query.get('code');

	const exchangeCodeForToken = async (code: string) => {
		try {
			// Get the code verifier from session storage (stored when we clicked connect)
			const lastRequestedCodeVerifier = sessionStorage.getItem('lastRequestedCodeVerifier');

			const response = await fetch(`${import.meta.env.VITE_API_URL}/x-exchange-code`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ code, codeVerifier: lastRequestedCodeVerifier, redirectUri: `${window.location.origin}/` })
			});
			const json = await response.json();
			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}
			return { accessToken: json.data['xAccessToken'], expiresIn: json.data['expiresIn'], profileImageUrl: json.data['profileImageUrl'] };
		} catch (error: any) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const storeXAccessToken = (accessToken: string, expiresIn: number) => {
		const expiryTime = Date.now() + expiresIn * 1000;
		// Convert to milliseconds
		sessionStorage.setItem('accessToken', accessToken);
		sessionStorage.setItem('tokenExpiry', String(expiryTime));
		setXAccessToken(accessToken);
	};

	const fetchXAuthUrl = async () => {
		if (isFetchingXAccessToken) return;
		setIsFetchingXAccessToken(true);

		try {
			const url = new URL(`${import.meta.env.VITE_API_URL}/x-auth-url`);
			const params = { redirectUrl: `${window.location.origin}/` };
			url.search = new URLSearchParams(params).toString();

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			sessionStorage.setItem('xCodeVerifier', json.data.xCodeVerifier);

			return json.data;
		} catch {
			console.log('Error fetching X auth url');
			setIsFetchingXAccessToken(false);
			return;
		}
	};

	const fetchUserStats = async () => {
		if (!xAccessToken) return;
		try {
			const url = new URL(`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${currentEpoch}&x_access_token=${xAccessToken}`);

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			sessionStorage.setItem('xCodeVerifier', json.data.xCodeVerifier);

			return json.data;
		} catch {
			console.log('Error fetching X auth url');
			setIsFetchingXAccessToken(false);
			return;
		}
	};

	const fetchProjectConfig = async () => {
		try {
			const url = new URL(`${import.meta.env.VITE_API_URL}/project-config?ticker=${import.meta.env.VITE_TICKER}`);

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			return json.data;
		} catch {
			console.log('Error fetching project config');
			setIsFetchingXAccessToken(false);
			return;
		}
	};

	useEffect(() => {
		fetchUserStats().then(setUserStats);
	}, [xAccessToken]);

	useEffect(() => {
		fetchXAuthUrl().then((xAuthUrlResponse) => {
			setIsFetchingXAccessToken(false);
			setXAuthUrlResponse(xAuthUrlResponse);
		});
		fetchProjectConfig().then((projectConfig) => {
			setProjectConfig(projectConfig);
		});
	}, []);

	useEffect(() => {
		// If we have a code, we can exchange it for an access token, so no need to fetch the auth url
		if (code) {
			exchangeCodeForToken(code).then((response) => {
				navigate(location.pathname);
				if (!response) return;
				const { accessToken, expiresIn, profileImageUrl } = response;
				toast.info('Successfully connected to X (Twitter)');
				storeXAccessToken(accessToken, expiresIn);

				sessionStorage.setItem('profileImageUrl', profileImageUrl);
				setXProfileImageUrl(profileImageUrl);
			});
		}
	}, [code]);

	return (
		<div className='flex flex-col items-center h-screen max-h-[100%] w-screen max-w-[100%] overflow-auto'>
			<Header />
			<ToastContainer theme='colored' position='bottom-right' />
			<Outlet />
			<dialog id='register_modal' className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Hello!</h3>
					<p className='py-4'>Press ESC key or click the button below to close</p>
					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button in form, it will close the modal */}
							<button className='btn'>Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}

export default App;
