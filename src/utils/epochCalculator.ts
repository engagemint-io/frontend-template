import { DateTime } from 'luxon';

export const getCurrentEpochNumber = (epochStartDate: string, epochLengthDays: number): number => {
	const now = new Date();
	const startDate = DateTime.fromISO(epochStartDate);
	let nowDateTime = DateTime.fromJSDate(now);

	// Adding one second to the current date to account for the edge case when we run job at the exact start of an hour
	// e.g. 2024-01-23T00:00:00.000Z and in this case we could incorrectly return the previous epoch number.
	nowDateTime = nowDateTime.plus({ seconds: 1 });
	if (nowDateTime < startDate) {
		throw new Error('Invalid date. The current date cannot be before the epoch start date.');
	}

	// Edge case where the epoch start date is the same as the current date. Which means the epoch just started.
	if (nowDateTime.equals(startDate)) {
		return 1;
	}

	const diffInDays = nowDateTime.diff(startDate, 'days').days;

	return Math.ceil(diffInDays / epochLengthDays);
};

export const getCurrentEpochStartDate = (firstEpochStartDate: string, epochLengthDays: number): DateTime => {
	const currentEpochNumber = getCurrentEpochNumber(firstEpochStartDate, epochLengthDays);
	let startDate = DateTime.fromISO(firstEpochStartDate);
	// If the current epoch number is 0, return the start date of the first epoch
	if (currentEpochNumber <= 0) {
		throw new Error('Invalid epoch. The current epoch can only be 1 or greater.');
	}
	// Subtract 1 from the currentEpochNumber because the first epoch is considered as 1
	const daysToAdd = (currentEpochNumber - 1) * epochLengthDays;
	startDate = startDate.plus({ days: daysToAdd });
	return startDate;
};

export const formatDateRange = (startDate: DateTime, endDate: DateTime): string => {
	const startFormat = startDate.toFormat('LLLL d');
	const endFormat = endDate.minus({ days: 1 }).toFormat('d');
	return `${startFormat} - ${endFormat}`;
};
