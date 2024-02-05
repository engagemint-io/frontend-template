import { UserXStatsProps } from './types';
import XIconWhite from '../../../../assets/x-icon-white.svg';
import { ConnectXButton } from '../../../../components';
import { useEffect, useState } from 'react';
import { useXAccount } from '../../../../hooks';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userStatsState } from '../../../../recoil/atoms';

const UserXStats = ({ currentEpoch }: UserXStatsProps) => {
	const { xAccessToken } = useXAccount();

	const [userStats, setUserStats] = useRecoilState<any>(userStatsState);
	const [fetchError, setFetchError] = useState<any>();

	useEffect(() => {
		const fetchUserStats = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${currentEpoch}&x_access_token=${xAccessToken}`
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
		if (xAccessToken) {
			fetchUserStats().then((data: { stats: any; profile_image_url: string }) => {
				setFetchError(undefined);
				setUserStats(data.stats);
			});
		}
	}, [xAccessToken, currentEpoch]);

	if (fetchError) {
		return (
			<div className='flex flex-row justify-between w-full p-8 rounded-[1.5rem] bg-em-card border border-solid border-em-border-table'>
				<p>Error finding your stats...</p>
			</div>
		);
	}

	if (xAccessToken) {
		if (userStats) {
			return (
				<div className='flex flex-row items-center justify-center w-full h-[5rem] rounded-[1.5rem] bg-em-card border border-solid border-em-border-table'>
					<p className='text-em-text-muted text-lg'>Total points: {userStats.total_points}</p>
				</div>
			);
		}

		return (
			<div className='flex flex-row items-center justify-center w-full h-[5rem] rounded-[1.5rem] bg-em-card border border-solid border-em-border-table'>
				<p className='text-em-text-muted text-center'>You did not participate in this epoch</p>
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
