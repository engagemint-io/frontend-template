import { useRecoilState } from 'recoil';
import { xAccessTokenState, xAuthUrlState, xProfileImageUrlState } from '../../recoil/atoms';
import { toast } from 'react-toastify';

export const useXAccount = () => {
	const [xAccessToken, setXAccessToken] = useRecoilState(xAccessTokenState);
	const [xAuthUrlResponse, setXAuthUrlResponse] = useRecoilState(xAuthUrlState);
	const [xProfileImageUrl, setXProfileImageUrl] = useRecoilState(xProfileImageUrlState);

	const logout = () => {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('tokenExpiry');
		sessionStorage.removeItem('profileImageUrl');
		setXProfileImageUrl(undefined);
		setXAccessToken('');
		setXAuthUrlResponse(null);
		toast.info('Logged out of X');
	};

	return { xProfileImageUrl, xAuthUrlResponse, xAccessToken, logout };
};
