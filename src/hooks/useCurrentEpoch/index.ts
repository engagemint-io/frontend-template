import { useEffect, useState } from 'react';
import { getCurrentEpochNumber, getCurrentEpochStartDate } from '../../utils';
import { DateTime } from 'luxon';
import { useRecoilValue } from 'recoil';
import { projectConfigState } from '../../recoil/atoms';

export const useCurrentEpoch = () => {
	const [currentEpoch, setCurrentEpoch] = useState<number>(0);
	const [currentEpochStartDate, setCurrentEpochStartDate] = useState<DateTime>();
	const [currentEpochEndDate, setCurrentEpochEndDate] = useState<DateTime>();

	const projectConfig = useRecoilValue(projectConfigState);

	useEffect(() => {
		if (!projectConfig) return;

		const updatedCurrentEpoch = getCurrentEpochNumber(projectConfig.epoch_start_date_utc, projectConfig.epoch_length_days);
		setCurrentEpoch(updatedCurrentEpoch);

		const updatedCurrentEpochStartDate = getCurrentEpochStartDate(projectConfig.epoch_start_date_utc, projectConfig.epoch_length_days);
		setCurrentEpochStartDate(updatedCurrentEpochStartDate);

		setCurrentEpochEndDate(updatedCurrentEpochStartDate.plus({ days: projectConfig.epoch_length_days }));
	}, [projectConfig]);

	return { currentEpoch, startDate: currentEpochStartDate, endDate: currentEpochEndDate };
};
