import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isFetchingXAuthUrlState, userXAccountIdState, xAccessTokenState, xAuthUrlState, xProfileImageUrlState } from '../../recoil/atoms';

export const useXAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [xAccessToken, setXAccessToken] = useRecoilState(xAccessTokenState);

	const setXAuthUrlResponse = useSetRecoilState(xAuthUrlState);
	const setXProfileImageUrl = useSetRecoilState(xProfileImageUrlState);
	const setXAccountId = useSetRecoilState(userXAccountIdState);
	const setIsFetchingAuthUrl = useSetRecoilState(isFetchingXAuthUrlState);

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
			return {
				accessToken: json.data['xAccessToken'],
				expiresIn: json.data['expiresIn'],
				profileImageUrl: json.data['profileImageUrl'],
				xUserId: json.data['xUserId']
			};
		} catch (error: any) {
			console.error(error);
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
			console.error('Error fetching X auth url');
			setIsFetchingAuthUrl(false);
			return;
		}
	};

	const isXAccessTokenExpired = useMemo(() => {
		const expiryTime = sessionStorage.getItem('tokenExpiry');
		return !expiryTime || Date.now() > parseInt(expiryTime, 10);
	}, [xAccessToken]);

	useEffect(() => {
		if (isXAccessTokenExpired) {
			sessionStorage.removeItem('accessToken');
			sessionStorage.removeItem('tokenExpiry');
			setXAccessToken('');
		}
	}, [isXAccessTokenExpired]);

	useEffect(() => {
		// If we have a code, we can exchange it for an access token, so no need to fetch the auth url
		if (code) {
			exchangeCodeForToken(code).then((response) => {
				navigate(location.pathname);
				if (!response) return;
				const { accessToken, expiresIn, profileImageUrl, xUserId } = response;
				toast.info('Successfully connected to X (Twitter)');
				storeXAccessToken(accessToken, expiresIn);

				sessionStorage.setItem('xAccountId', xUserId);
				setXAccountId(xUserId);

				sessionStorage.setItem('profileImageUrl', profileImageUrl);
				setXProfileImageUrl(profileImageUrl);
			});
		}
	}, []);

	useEffect(() => {
		if (xAccessToken) return;
		setIsFetchingAuthUrl(true);

		fetchXAuthUrl().then((xAuthUrlResponse) => {
			setIsFetchingAuthUrl(false);
			setXAuthUrlResponse(xAuthUrlResponse);
		});
	}, [xAccessToken]);
};
