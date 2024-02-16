import { useRecoilState } from 'recoil';
import { userXAccountIdState, xAccessTokenState, xAuthUrlState, xProfileImageUrlState } from '../../recoil/atoms';
import { toast } from 'react-toastify';

export const useXAccount = () => {
	const [xAccessToken, setXAccessToken] = useRecoilState(xAccessTokenState);
	const [xAuthUrlResponse, setXAuthUrlResponse] = useRecoilState(xAuthUrlState);
	const [xProfileImageUrl, setXProfileImageUrl] = useRecoilState(xProfileImageUrlState);
	const [xAccountId, setXAccountId] = useRecoilState(userXAccountIdState);

	const logout = () => {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('tokenExpiry');
		sessionStorage.removeItem('profileImageUrl');
		sessionStorage.removeItem('xAccountId');

		setXProfileImageUrl(undefined);
		setXAccessToken(undefined);
		setXAccountId(null);
		setXAuthUrlResponse(null);

		toast.info('Logged out of X');
	};

	return { xProfileImageUrl, xAuthUrlResponse, xAccessToken, xAccountId, logout };
};
