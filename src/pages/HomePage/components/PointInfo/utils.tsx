import { PiChatCircleDotsBold, PiEyeBold, PiHeartBold, PiQuotesBold, PiRepeatBold, PiVideoBold } from 'react-icons/pi';
import { PointInfoItem } from './types.ts';

const TweetView: PointInfoItem = {
	icon: PiEyeBold,
	key: 'view_multiplier',
	title: 'Views'
};

const Favorite: PointInfoItem = {
	icon: PiHeartBold,
	key: 'favorite_multiplier',
	title: 'Favorite'
};

const Quotes: PointInfoItem = {
	icon: PiQuotesBold,
	key: 'quote_multiplier',
	title: 'Quotes'
};

const Replies: PointInfoItem = {
	icon: PiChatCircleDotsBold,
	key: 'reply_multiplier',
	title: 'Replies'
};

const Retweets: PointInfoItem = {
	icon: PiRepeatBold,
	key: 'retweet_multiplier',
	title: 'Retweets'
};

const VideoView: PointInfoItem = {
	icon: PiVideoBold,
	key: 'video_view_multiplier',
	title: 'Video views'
};

export const POINT_INFO_ITEMS: PointInfoItem[] = [TweetView, Favorite, Quotes, Replies, Retweets, VideoView];
