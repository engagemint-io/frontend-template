import { FooterProps } from './types';
import { Link } from 'react-router-dom';

const Footer = ({}: FooterProps) => {
	return null;

	return (
		<div className=''>
			<div>
				<img />
				<div>
					<Link to='/'>How it works</Link>
					<Link to='/leaderboard'>Leaderboard</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
