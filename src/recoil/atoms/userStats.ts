import { atom } from 'recoil';

export const xProfileImageUrlState = atom<any | null>({
	key: 'USER_PROFILE_IMAGE_URL_STATE',
	default: sessionStorage.getItem('profileImageUrl')
});

export const userStatsState = atom<any | null>({
	key: 'EPOCH_USER_STATS_STATE',
	default: null
});
