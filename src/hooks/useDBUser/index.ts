import { useEffect } from 'react';
import { useXAccount } from '../useXAccount';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isFetchingUserRegisteredState, isFetchingUserStatsState, isUserRegisteredState, userStatsFetchError, userStatsState } from '../../recoil/atoms';
import { toast } from 'react-toastify';
import { useCurrentEpoch } from '../useCurrentEpoch';

export const useDBUser = () => {
	const { xAccountId } = useXAccount();
	const { currentEpoch } = useCurrentEpoch();

	const [userStats, setUserStats] = useRecoilState(userStatsState);
	const [isFetchingUserStats, setIsFetchingUserStats] = useRecoilState(isFetchingUserStatsState);
	const [isFetchingIsRegistered, setIsFetchingIsRegistered] = useRecoilState(isFetchingUserRegisteredState);
	const [error, setError] = useRecoilState(userStatsFetchError);

	const setIsUserRegistered = useSetRecoilState(isUserRegisteredState);

	const fetchIsUserRegistered = async () => {
		try {
			setIsFetchingIsRegistered(true);
			const url = new URL(`${import.meta.env.VITE_API_URL}/is-user-registered?ticker=${import.meta.env.VITE_TICKER}&x_user_id=${xAccountId}`);

			const response = await fetch(url);
			const json = await response.json();
			return json.data;
		} catch (e: any) {
			setIsFetchingIsRegistered(false);
			return;
		}
	};

	const fetchUserStats = async () => {
		try {
			setIsFetchingUserStats(true);

			const url = new URL(`${import.meta.env.VITE_API_URL}/user-stats?ticker=${import.meta.env.VITE_TICKER}&epoch=${currentEpoch}&x_user_id=${xAccountId}`);

			const res = await fetch(url);
			const json = await res.json();

			if (!json['verified']) {
				toast.error(json.error);
				setError(json.error);
				setIsFetchingUserStats(false);
				return;
			}

			sessionStorage.setItem('xCodeVerifier', json.data.xCodeVerifier);
			return json.data;
		} catch (e: any) {
			toast.error('Error fetching user stats');
			setIsFetchingUserStats(false);
			setError(e.message);
			return;
		}
	};

	useEffect(() => {
		if (!xAccountId) return;

		if (isFetchingUserStats) return;

		fetchUserStats().then((data) => {
			if (!data) return;
			setUserStats(data.stats);
			setIsFetchingUserStats(false);
		});
	}, [xAccountId]);

	useEffect(() => {
		if (!xAccountId) return;

		if (isFetchingIsRegistered) return;

		fetchIsUserRegistered().then((data) => {
			if (!data) return;
			setIsUserRegistered(data['isRegistered']);
			setIsFetchingIsRegistered(false);
		});
	}, [xAccountId]);

	return { isFetching: isFetchingUserStats, userStats, error };
};
