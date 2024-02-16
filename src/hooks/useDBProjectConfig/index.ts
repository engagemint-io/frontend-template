import { useRecoilState } from 'recoil';
import { projectConfigState } from '../../recoil/atoms';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useDBProjectConfig = () => {
	const [projectConfig, setProjectConfig] = useRecoilState(projectConfigState);

	const fetchProjectConfig = async () => {
		try {
			const url = new URL(`${import.meta.env.VITE_API_URL}/project-config?ticker=${import.meta.env.VITE_TICKER}`);

			const res = await fetch(url);
			const json = await res.json();

			if (json.status !== 'success') {
				toast.error(json.message);
				return;
			}

			return json.data;
		} catch {
			console.error('Error fetching project config');
			return;
		}
	};

	useEffect(() => {
		if (projectConfig) return;

		fetchProjectConfig().then(setProjectConfig);
	}, []);

	return { projectConfig };
};
