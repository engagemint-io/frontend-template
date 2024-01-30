import { atom } from 'recoil';

type XAuthUrlResponse = {
	xAuthUrl: string;
	xCodeVerifier: string;
	xRedirectUrl: string;
};

export const xAuthUrlState = atom<XAuthUrlResponse | null>({
	key: 'X_AUTH_URL_STATE',
	default: null
});

export const isFetchingXAccessTokenState = atom<boolean>({
	key: 'IS_FETCHING_X_ACCESS_TOKEN_STATE',
	default: false
});

export const xAccessTokenState = atom({
	key: 'X_ACCESS_TOKEN_STATE',
	default: sessionStorage.getItem('accessToken')
});
