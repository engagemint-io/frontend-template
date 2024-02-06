import { PiChatCircleDotsBold, PiEyeBold, PiHeartBold, PiQuotesBold, PiRepeatBold, PiVideoBold } from 'react-icons/pi';
import { PointInfoItem } from './types.ts';

const TweetView: PointInfoItem = {
	icon: PiEyeBold,
	key: 'view_multiplier',
	title: 'Views',
	singular: 'view',
	color: '!text-[#56D696]'
};

const VideoView: PointInfoItem = {
	icon: PiVideoBold,
	key: 'video_view_multiplier',
	title: 'Video views',
	singular: 'video view',
	color: '!text-[#FBFCFC]'
};

const Favorite: PointInfoItem = {
	icon: PiHeartBold,
	key: 'like_multiplier',
	title: 'Favorite',
	singular: 'favorite',
	color: '!text-[#ED667F]'
};

const Replies: PointInfoItem = {
	icon: PiChatCircleDotsBold,
	key: 'reply_multiplier',
	title: 'Replies',
	singular: 'reply',
	color: '!text-[#F68B2A]'
};

const Retweets: PointInfoItem = {
	icon: PiRepeatBold,
	key: 'retweet_multiplier',
	title: 'Retweets',
	singular: 'retweet',
	color: '!text-[#738AEE]'
};

const Quotes: PointInfoItem = {
	icon: PiQuotesBold,
	key: 'quote_multiplier',
	title: 'Quotes',
	singular: 'quote',
	color: '!text-[#767981]'
};

export const POINT_INFO_ITEMS: PointInfoItem[] = [TweetView, VideoView, Favorite, Replies, Retweets, Quotes];
