import { useRecoilState } from 'recoil';
import { isUserRegisteredState, userXAccountIdState, xAccessTokenState, xAuthUrlState, xProfileImageUrlState, xUsernameState } from '../../recoil/atoms';
import { toast } from 'react-toastify';

export const useXAccount = () => {
	const [xAccessToken, setXAccessToken] = useRecoilState(xAccessTokenState);
	const [xAuthUrlResponse, setXAuthUrlResponse] = useRecoilState(xAuthUrlState);
	const [xProfileImageUrl, setXProfileImageUrl] = useRecoilState(xProfileImageUrlState);
	const [xAccountId, setXAccountId] = useRecoilState(userXAccountIdState);
	const [xUsername, setXUsername] = useRecoilState(xUsernameState);
	const [isUserRegistered, setIsUserRegistered] = useRecoilState(isUserRegisteredState);

	const logout = () => {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('tokenExpiry');
		sessionStorage.removeItem('profileImageUrl');
		sessionStorage.removeItem('xAccountId');
		sessionStorage.removeItem('xUsername');

		setXProfileImageUrl(undefined);
		setXAccessToken(undefined);
		setIsUserRegistered(undefined);
		setXAccountId(null);
		setXAuthUrlResponse(null);
		setXUsername(null);

		toast.info('Logged out of X');
	};

	return { xProfileImageUrl, xAuthUrlResponse, xAccessToken, xAccountId, xUsername, isUserRegistered, logout };
};
