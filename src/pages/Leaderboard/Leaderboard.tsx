import { useEffect, useMemo, useState } from 'react';
import { LeaderboardRow } from '../../api/types.ts';
import { toast } from 'react-toastify';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { UserXStats } from './components';
import { PiCalendarBlankBold } from 'react-icons/pi';
import useCurrentEpoch from '../../hooks/useCurrentEpoch/useCurrentEpoch.ts';

const Leaderboard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = useMemo(() => queryString.parse(location.search), [location.search]);

	const [fetchError, setFetchError] = useState<any>();
	const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>();

	const { currentEpoch } = useCurrentEpoch();

	useEffect(() => {
		const fetchLeaderboard = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard?ticker=${import.meta.env.VITE_TICKER}&epoch=${currentEpoch}`);
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
	}, [currentEpoch]);

	const changeEpoch = (newEpoch: number) => {
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
						<th className='bg-em-border-row p-5'>Rank</th>
						<th className='bg-em-border-row p-5'>Account ID</th>
						<td className='bg-em-border-row p-5'>Total Points</td>
						<td className='bg-em-border-row p-5'>View Points</td>
						<td className='bg-em-border-row p-5'>Video View Points</td>
						<td className='bg-em-border-row p-5'>Favorite Points</td>
						<td className='bg-em-border-row p-5'>Retweet Points</td>
						<td className='bg-em-border-row p-5'>Quote Points</td>
					</tr>
				</thead>
				<tbody>
					{leaderboard.map((row, index) => {
						return (
							<tr className='first: rounded-tl-2xl border-em-border-row' key={row.user_account_id}>
								<th className='bg-em-card p-5'>
									{/*//MARK: REMOVE THIS INDEX BACKUP FOR PRODUCTION*/}
									<div
										className={cn('flex items-center justify-center px-4 py-3 rounded-2xl ', getRankClassName(row.rank || index + 1), {
											'bg-primary': row.user_account_id === '1740784038213029888'
										})}>
										{row.rank || index + 1}
									</div>
								</th>
								<th className='bg-em-card p-5'>{row.user_account_id}</th>
								<td className='bg-em-card p-5 font-black text-white'>{row.total_points}</td>
								<td className='bg-em-card p-5'>{row.view_points}</td>
								<td className='bg-em-card p-5'>{row.video_view_points}</td>
								<td className='bg-em-card p-5'>{row.favorite_points}</td>
								<td className='bg-em-card p-5'>{row.retweet_points}</td>
								<td className='bg-em-card p-5'>{row.quote_points}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<div className='flex flex-col px-4 pb-4 pt-8 md:py-[5rem] md:px-[10rem] overflow-auto h-screen w-full gap-4'>
			<h1 className='text-em-headline text-5xl font-bold tracking-tight mb-4'>Leaderboard</h1>
			<div className='flex flex-row w-full md:w-fit items-center justify-between gap-2 md:gap-4'>
				<button className={'border border-em-border-row btn btn-square min-h-8 h-8 w-8'} onClick={() => changeEpoch(currentEpoch > 1 ? currentEpoch - 1 : 1)}>
					<MdOutlineArrowBackIos className='rounded-lg' />
				</button>
				<div className='badge badge-accent font-bold md:text-xl p-5'>EPOCH #{currentEpoch}</div>
				<div className='badge badge-secondary font-bold md:text-xl p-5 gap-2'>
					Jan 15-22 <PiCalendarBlankBold />
				</div>
				<button className='border border-em-border-row btn btn-square min-h-8 h-8 w-8' onClick={() => changeEpoch(currentEpoch + 1)}>
					<MdOutlineArrowForwardIos className='rounded-lg' />
				</button>
			</div>
			<UserXStats currentEpoch={currentEpoch} />
			<div className='overflow-auto flex-1 rounded-[1.5rem] md:border border-solid border-em-border-row bg-em-card'>{renderTable()}</div>
		</div>
	);
};

export default Leaderboard;
