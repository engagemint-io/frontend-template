import { useEffect, useMemo, useState } from 'react';
import { LeaderboardRow } from '../../api/types.ts';
import { toast } from 'react-toastify';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { UserXStats } from './components';
import { PiCalendarBlankBold } from 'react-icons/pi';
import { getFormattedDateRangeForEpoch } from '../../utils';
import { useCurrentEpoch, useDBProjectConfig, useDBUser } from '../../hooks';
import UserXEpochStatsBadge from './components/UserXEpochStatsBadge/UserXEpochStatsBadge.tsx';

const Leaderboard = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { projectConfig } = useDBProjectConfig();
	const { userXAccountId } = useDBUser();
	const { currentEpoch } = useCurrentEpoch();

	console.log('currentEpoch', currentEpoch);

	const queryParams = useMemo(() => queryString.parse(location.search), [location.search]);

	const [fetchError, setFetchError] = useState<any>();
	const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>();

	const selectedEpoch = useMemo(() => parseInt((queryParams?.epoch as string) || '1'), [queryParams]);

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard?ticker=${import.meta.env.VITE_TICKER}&epoch=${selectedEpoch}`);
				const json = await response.json();
				setLeaderboard(
					json.data.sort((a: any, b: any) => {
						return b.total_points - a.total_points;
					})
				);
				setFetchError(undefined);
			} catch (error: any) {
				setFetchError(error);
				toast.error('Error fetching leaderboard');
			}
		};
		fetchLeaderboard().then();
	}, [selectedEpoch]);

	const changeEpoch = (newEpoch?: number) => {
		queryParams.epoch = String(newEpoch);
		navigate({ search: queryString.stringify(queryParams) }, { replace: true });
	};

	const getRankClassName = (rank: number) => {
		switch (rank) {
			case 1:
				return 'text-black bg-rank-gold';
			case 2:
				return 'text-black rounded-2xl bg-rank-silver';
			case 3:
				return 'text-black rounded-2xl bg-rank-bronze';
			default:
				return;
		}
	};

	const renderTable = () => {
		if (fetchError) {
			return (
				<div className='flex flex-col items-center justify-center h-full gap-4'>
					<p className='text-em-text-muted text-xl'>Something went wrong</p>
					<button className='btn btn-ghost border border-solid border-em-border-row'>RELOAD</button>
				</div>
			);
		}

		if (!leaderboard)
			return (
				<div className='flex flex-col items-center justify-center h-full gap-4'>
					<span className='loading loading-spinner loading-md'></span>
					<span className='text-em-text-muted text-xl'>Loading...</span>
				</div>
			);

		if (leaderboard.length === 0) {
			return (
				<div className='flex items-center justify-center h-full'>
					<p className='text-em-text-muted text-xl'>No results found</p>
				</div>
			);
		}

		return (
			<table className='table table-pin-rows table-pin-cols rounded-2xl '>
				<thead className='bg-em-border-row rounded'>
					<tr className='bg-em-border-row rounded'>
						<td className='bg-em-border-row p-5'>Rank</td>
						<td className='bg-em-border-row p-5'>X Username</td>
						<td className='bg-em-border-row p-5'>Total Points</td>
						<td className='bg-em-border-row p-5'>View Points</td>
						<td className='bg-em-border-row p-5'>Video View Points</td>
						<td className='bg-em-border-row p-5'>Favorite Points</td>
						<td className='bg-em-border-row p-5'>Reply Points</td>
						<td className='bg-em-border-row p-5'>Retweet Points</td>
						<td className='bg-em-border-row p-5'>Quote Points</td>
					</tr>
				</thead>
				<tbody>
					{leaderboard.map((row, index) => {
						return (
							<tr
								className={cn('border-em-border-row bg-em-card', {
									'bg-[#7832E945]': row.user_account_id === userXAccountId
								})}
								key={row.user_account_id}>
								<td className='bg-transparent p-5'>
									<div
										className={cn('flex items-center justify-center px-4 py-3 rounded-2xl ', getRankClassName(row.rank || index + 1), {
											'!bg-[#7832E9B0]': row.user_account_id === userXAccountId
										})}>
										{row.rank || index + 1}
									</div>
								</td>
								<td className='bg-transparent p-5 text-lg text-em-headline font-semibold'>{row.username || row.user_account_id}</td>
								<td className='p-5 text-lg text-em-headline font-semibold'>{row.total_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.view_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.video_view_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.favorite_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.reply_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.retweet_points}</td>
								<td className='p-5 text-lg text-em-paragraph font-medium'>{row.quote_points}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<div className='flex flex-col px-[1rem] py-[8rem] md:px-[10rem] md:py-[10rem] overflow-auto h-screen w-full gap-4'>
			<div className='flex flex-row justify-between items-center'>
				<div>
					<h1 className='text-em-headline text-3xl md:text-5xl font-bold tracking-tight mb-4'>Leaderboard</h1>
					<div className='flex flex-row w-full md:w-fit items-center justify-between gap-2 md:gap-4'>
						<button className={'border border-em-border-row btn btn-square min-h-8 h-8 w-8'} onClick={() => changeEpoch(selectedEpoch > 1 ? selectedEpoch - 1 : 1)}>
							<MdOutlineArrowBackIos className='rounded-lg' />
						</button>
						<div className='badge badge-accent font-bold text-xs md:text-xl p-5'>EPOCH #{selectedEpoch}</div>
						<div className='badge badge-secondary font-bold text-xs md:text-xl p-5 gap-2'>
							{projectConfig?.epoch_start_date_utc &&
								projectConfig.epoch_length_days &&
								getFormattedDateRangeForEpoch(projectConfig.epoch_start_date_utc, projectConfig.epoch_length_days, selectedEpoch)}{' '}
							<PiCalendarBlankBold />
						</div>
						{selectedEpoch < currentEpoch && (
							<button className='border border-em-border-row btn btn-square min-h-8 h-8 w-8' onClick={() => changeEpoch(selectedEpoch + 1)}>
								<MdOutlineArrowForwardIos className='rounded-lg' />
							</button>
						)}
					</div>
				</div>
				<UserXEpochStatsBadge selectedEpoch={selectedEpoch} />
			</div>
			<UserXStats selectedEpoch={selectedEpoch} />
			<div className='overflow-auto flex-1 rounded-[1.5rem] md:border border-solid border-em-border-row bg-em-card'>{renderTable()}</div>
		</div>
	);
};

export default Leaderboard;
