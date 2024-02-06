import { atom } from 'recoil';

type ProjectConfigResponse = {
	epoch_length_days: number;
	epoch_start_date_utc: string;
	like_multiplier: number;
	quote_multiplier: number;
	reply_multiplier: number;
	retweet_multiplier: number;
	video_view_multiplier: number;
	view_multiplier: number;
	admin_wallet_address: string;
	pre_defined_tweet_text: string;
};

export const projectConfigState = atom<ProjectConfigResponse | null>({
	key: 'PROJECT_CONFIG_STATE',
	default: null
});

export const isFetchingProjectConfigState = atom<boolean>({
	key: 'IS_FETCHING_PROJECT_CONFIG_TOKEN_STATE',
	default: false
});
