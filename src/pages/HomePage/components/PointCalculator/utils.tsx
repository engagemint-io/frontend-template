import { PointCalculatorItem } from './types.ts';
import { PiChatCircleDotsBold, PiEyeBold, PiHeartBold, PiQuotesBold, PiRepeatBold, PiVideoBold } from 'react-icons/pi';

export const POINT_ITEM_TYPES: PointCalculatorItem[] = [
	{
		title: 'Views',
		key: 'view_multiplier',
		icon: PiEyeBold
	},
	{
		title: 'Favorite',
		key: 'favorite_multiplier',
		icon: PiHeartBold
	},
	{
		title: 'Replies',
		key: 'reply_multiplier',
		icon: PiChatCircleDotsBold
	},
	{
		title: 'Retweets',
		key: 'retweet_multiplier',
		icon: PiRepeatBold
	},
	{
		title: 'Quotes',
		key: 'quote_multiplier',
		icon: PiQuotesBold
	},
	{
		title: 'Video Views',
		key: 'video_view_multiplier',
		icon: PiVideoBold
	}
];
