import { useRecoilState } from 'recoil';
import { isFetchingProjectConfigState, projectConfigState } from '../../recoil/atoms';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useDBProjectConfig = () => {
	const [projectConfig, setProjectConfig] = useRecoilState(projectConfigState);
	const [isFetching, setIsFetching] = useRecoilState(isFetchingProjectConfigState);

	const fetchProjectConfig = async () => {
		try {
			setIsFetching(true);

			const url = new URL(`${import.meta.env.VITE_API_URL}/project-config?ticker=${import.meta.env.VITE_TICKER}`);

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			return json.data;
		} catch {
			console.log('Error fetching project config');
			setIsFetching(false);
			return;
		}
	};

	useEffect(() => {
		if (projectConfig) return;

		if (isFetching) return;

		fetchProjectConfig().then((projectConfig) => {
			setProjectConfig(projectConfig);
			setIsFetching(false);
		});
	}, []);

	return { isFetching, projectConfig };
};
