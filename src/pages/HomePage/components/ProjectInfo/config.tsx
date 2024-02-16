import { HeaderItem } from '../../types.ts';
import { PiChatTeardropText, PiHandCoins, PiSealCheck } from 'react-icons/pi';

export const HEADER_ITEMS: HeaderItem[] = [
	{
		title: 'Share',
		description: `Mention #${import.meta.env.VITE_TICKER} or $${import.meta.env.VITE_TICKER} in your tweets during each epoch to earn points and rewards`,
		icon: <PiChatTeardropText className='absolute top-4 right-4 h-12 w-12 text-em-link-secondary' />
	},
	{
		title: 'Verify',
		description: 'We add up all of the points associated with your tweets and continuously update the leaderboard',
		icon: <PiSealCheck className='absolute top-4 right-4 h-12 w-12 text-em-link-secondary' />
	},
	{
		title: 'Claim',
		description: "We determine your percentage of the epoch's rewards based off points in each epoch",
		icon: <PiHandCoins className='absolute top-4 right-4 h-12 w-12 text-em-link-secondary' />
	}
];
