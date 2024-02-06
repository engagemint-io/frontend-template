import { useEffect, useState } from 'react';
import { useXAccount } from '../../../../hooks';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userStatsState } from '../../../../recoil/atoms';
import { UserXEpochStatsBadgeProps } from './types.ts';

const UserXEpochStatsBadge = ({ selectedEpoch }: UserXEpochStatsBadgeProps) => {
	const { xAccessToken, xProfileImageUrl } = useXAccount();

	const [userStats, setUserStats] = useRecoilState<any>(userStatsState);
	const [fetchError, setFetchError] = useState<any>();

	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${selectedEpoch}&x_access_token=${xAccessToken}`
				);
				const json = await response.json();
				if (json.status !== 'success') {
					toast.error(json.message);
					return;
				}
				return json.data;
			} catch (error: any) {
				setFetchError(error);
				setUserStats(undefined);
				toast.error('Error fetching leaderboard');
				return undefined;
			}
		};
		if (xAccessToken) {
			fetchUserStats()
				.then((data: { stats?: any; profile_image_url: string }) => {
					setFetchError(undefined);
					setUserStats(data?.stats);
				})
				.catch((e) => {
					console.log('Error fetching user stats', e);
					setUserStats(undefined);
				});
		}
	}, [xAccessToken, selectedEpoch]);

	if (fetchError) {
		return (
			<div className=''>
				<p>Error finding your stats...</p>
			</div>
		);
	}

	console.log('userStats', userStats);
	if (xAccessToken) {
		if (userStats) {
			return (
				<div className='flex flex-row items-center bg-primary gap-4 p-2 rounded-3xl'>
					<img className='h-10 rounded-3xl cursor-pointer hover:opacity-80' alt='X user img' src={xProfileImageUrl} />
					<div>
						<p className='text-em-text-muted text-lg'>{userStats.total_points}</p>
						<p>Total points</p>
					</div>
					<div className='bg-secondary'>#{userStats.rank}</div>
				</div>
			);
		}

		return null;
	}

	return null;
};

export default UserXEpochStatsBadge;
