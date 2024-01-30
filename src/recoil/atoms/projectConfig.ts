import { atom } from 'recoil';

type ProjectConfigResponse = {};

export const projectConfigState = atom<ProjectConfigResponse | null>({
	key: 'PROJECT_CONFIG_STATE',
	default: null
});
