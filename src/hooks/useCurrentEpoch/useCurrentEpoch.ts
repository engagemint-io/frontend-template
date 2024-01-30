import { useState } from 'react';

const useCurrentEpoch = () => {
	//@ts-ignore
	const [currentEpoch, setCurrentEpoch] = useState<number>(2);
	return { currentEpoch };
};

export default useCurrentEpoch;
