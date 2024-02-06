import { PiChatCircleDotsBold, PiEyeBold, PiHeartBold, PiQuotesBold, PiRepeatBold, PiVideoBold } from 'react-icons/pi';
import { PointCalculatorItem } from './types.ts';

export const VIEW_ITEM: PointCalculatorItem = {
	title: 'Views',
	key: 'view_multiplier',
	icon: PiEyeBold,
	singular: 'view',
	color: 'bg-[#56D696]'
};

export const VIDEO_VIEW_ITEM: PointCalculatorItem = {
	title: 'Video views',
	key: 'video_view_multiplier',
	icon: PiVideoBold,
	singular: 'video view',
	color: 'bg-[#FBFCFC]'
};

export const LIKE_ITEM: PointCalculatorItem = {
	title: 'Favorite',
	key: 'like_multiplier',
	icon: PiHeartBold,
	singular: 'like',
	color: 'bg-[#ED667F]'
};

export const REPLY_ITEM: PointCalculatorItem = {
	title: 'Replies',
	key: 'reply_multiplier',
	icon: PiChatCircleDotsBold,
	singular: 'reply',
	color: 'bg-[#F68B2A]'
};

export const RETWEET_ITEM: PointCalculatorItem = {
	title: 'Retweets',
	key: 'retweet_multiplier',
	icon: PiRepeatBold,
	singular: 'retweet',
	color: 'bg-[#738AEE]'
};

export const QUOTE_ITEM: PointCalculatorItem = {
	title: 'Quotes',
	key: 'quote_multiplier',
	icon: PiQuotesBold,
	singular: 'quote',
	color: 'bg-[#767981]'
};
