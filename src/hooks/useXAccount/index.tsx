import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { xAccessTokenState, xAuthUrlState } from '../../recoil/atoms/xAuth.ts';
import { xProfileImageUrlState } from '../../recoil/atoms/userStats.ts';
import { toast } from 'react-toastify';

export const useXAccount = () => {
	const [xAccessToken, setXAccessToken] = useRecoilState(xAccessTokenState);
	const [xAuthUrlResponse, setXAuthUrlResponse] = useRecoilState(xAuthUrlState);
	const [xProfileImageUrl, setXProfileImageUrl] = useRecoilState(xProfileImageUrlState);

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

	const logout = () => {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('tokenExpiry');
		sessionStorage.removeItem('profileImageUrl');
		setXProfileImageUrl(undefined);
		setXAccessToken('');
		toast.info('Logged out of X');
	};

	return { xProfileImageUrl, setXProfileImageUrl, xAuthUrlResponse, setXAuthUrlResponse, xAccessToken, isXAccessTokenExpired, setXAccessToken, logout };
};
