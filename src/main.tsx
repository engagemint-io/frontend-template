import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import { Home, Leaderboard } from './pages';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = createRoot(rootElement);
	root.render(
		<RecoilRoot>
			<Router>
				<Routes>
					<Route element={<App />}>
						<Route path='/' element={<Home />} />
						<Route path='/leaderboard' element={<Leaderboard />} />
					</Route>
				</Routes>
			</Router>
		</RecoilRoot>
	);
} else {
	console.error("Element with id 'root' not found in the document.");
}
