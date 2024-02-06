export type LeaderboardRow = {
	ticker_epoch_composite: string;
	total_points: number;
	rank: number;
	username?: string;
	user_account_id: string;
	last_updated_at: string;
	view_points: number;
	video_view_points: number;
	reply_points: number;
	favorite_points: number;
	retweet_points: number;
	quote_points: number;
};
