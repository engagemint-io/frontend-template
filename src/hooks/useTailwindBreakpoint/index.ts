import { useEffect, useState } from 'react';

interface TailwindBreakpoint {
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
	'2xl': boolean;
}

function useTailwindBreakpoint() {
	const [breakpoint, setBreakpoint] = useState<TailwindBreakpoint>({
		sm: false,
		md: false,
		lg: false,
		xl: false,
		'2xl': false
	});

	useEffect(() => {
		const queries = {
			sm: '(min-width: 640px)',
			md: '(min-width: 768px)',
			lg: '(min-width: 1024px)',
			xl: '(min-width: 1280px)',
			'2xl': '(min-width: 1536px)'
		};

		function updateBreakpoint() {
			setBreakpoint({
				sm: window.matchMedia(queries.sm).matches,
				md: window.matchMedia(queries.md).matches,
				lg: window.matchMedia(queries.lg).matches,
				xl: window.matchMedia(queries.xl).matches,
				'2xl': window.matchMedia(queries['2xl']).matches
			});
		}

		window.addEventListener('resize', updateBreakpoint);
		updateBreakpoint(); // Initial check

		return () => {
			window.removeEventListener('resize', updateBreakpoint);
		};
	}, []);

	return breakpoint;
}

export default useTailwindBreakpoint;
