import { UserXStatsProps } from './types';
import XIconWhite from '../../../../assets/x-icon-white.svg';
import { ConnectXButton } from '../../../../components';
import { useEffect, useState } from 'react';
import { useXAccount } from '../../../../hooks';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userStatsState } from '../../../../recoil/atoms';

const UserXStats = ({ selectedEpoch }: UserXStatsProps) => {
	const { xAccountId, xProfileImageUrl, xUsername } = useXAccount();

	const [userStats, setUserStats] = useRecoilState<any>(userStatsState);
	const [fetchError, setFetchError] = useState<any>();

	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${selectedEpoch}&x_user_id=${xAccountId}`
				);
				const json = await response.json();
				if (json.status !== 'success') {
					toast.error(json.message);
					return;
				}
				return json.data;
			} catch (error: any) {
				setFetchError(error);
				toast.error('Error fetching leaderboard');
				return undefined;
			}
		};
		if (xAccountId) {
			fetchUserStats().then((data: { stats: any; profile_image_url: string }) => {
				setFetchError(undefined);
				setUserStats(data.stats);
			});
		}
	}, [xAccountId, selectedEpoch]);

	if (fetchError) {
		return (
			<div className='flex flex-row justify-between w-full p-8 rounded-[1.5rem] bg-em-card border border-solid border-em-border-table'>
				<p>Error finding your stats...</p>
			</div>
		);
	}

	const renderPointType = (title: string, value: number) => {
		return (
			<div className='flex-1'>
				<p className='text-em-headline font-bold text-2xl'>{value.toLocaleString()}</p>
				<p className='text-em-paragraph text-md text-nowrap'>{title}</p>
			</div>
		);
	};

	const renderContent = () => {
		if (userStats) {
			return (
				<div className='flex flex-col flex-wrap md:flex-row text-em-text-muted text-lg gap-4 w-full px-4'>
					{renderPointType('view points', userStats.view_points)}
					{renderPointType('video view points', userStats.video_view_points)}
					{renderPointType('favorite points', userStats.favorite_points)}
					{renderPointType('quote points', userStats.quote_points)}
					{renderPointType('retweet points', userStats.retweet_points)}
				</div>
			);
		}

		return (
			<div className='flex justify-center items-center'>
				<p className='text-em-text-muted text-center'>You did not participate in this epoch</p>
			</div>
		);
	};

	if (xAccountId) {
		return (
			<div className='flex flex-col items-start justify-center w-full rounded-[1.5rem] bg-em-border-row border border-solid border-em-border-table'>
				<div className='flex flex-row p-4 items-center gap-4'>
					<img alt='User Profile' src={xProfileImageUrl} className='w-8 h-8 rounded-full' />
					<p className='text-xl'>
						@<span className='text-white font-black'>{xUsername}</span>
					</p>
				</div>
				<div className='flex flex-row items-center justify-center w-full rounded-[1.5rem] bg-em-card border border-solid border-em-border-table p-4 min-h-[94px]'>
					{renderContent()}
				</div>
			</div>
		);
	}

	return (
		<div className='hidden md:flex flex-col md:flex-row justify-between w-full px-8 py-4 rounded-[1.5rem] bg-em-card border border-solid border-em-border-table gap-4'>
			<div className='flex flex-row items-center gap-8 flex-1'>
				<img alt='X Icon' src={XIconWhite} width={32} height={32} />
				<p className='text-em-headline text-[18px]'>Connect to view your points.</p>
			</div>
			<ConnectXButton />
		</div>
	);
};

export default UserXStats;
