import { useEffect } from 'react';
import { useXAccount } from '../useXAccount';
import { useRecoilState } from 'recoil';
import { isFetchingUserStatsState, userStatsState, userXAccountIdState } from '../../recoil/atoms';
import { toast } from 'react-toastify';
import { useCurrentEpoch } from '../useCurrentEpoch';

export const useDBUser = () => {
	const { xAccessToken } = useXAccount();
	const { currentEpoch } = useCurrentEpoch();

	const [userStats, setUserStats] = useRecoilState(userStatsState);
	const [userXAccountId, setUserXAccountId] = useRecoilState(userXAccountIdState);
	const [isFetching, setIsFetching] = useRecoilState(isFetchingUserStatsState);

	const fetchUserStats = async () => {
		try {
			setIsFetching(true);

			const url = new URL(`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${currentEpoch}&x_access_token=${xAccessToken}`);

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			sessionStorage.setItem('xCodeVerifier', json.data.xCodeVerifier);
			console.log('json.data', json.data);
			return json.data;
		} catch {
			console.log('Error fetching X auth url');
			setIsFetching(false);
			return;
		}
	};

	useEffect(() => {
		if (!xAccessToken) return;

		if (isFetching) return;

		fetchUserStats().then((data) => {
			setUserXAccountId(data.xAccountId);
			setUserStats(data.stats);
			setIsFetching(false);
		});
	}, [xAccessToken]);

	return { isFetching, userStats, userXAccountId };
};
