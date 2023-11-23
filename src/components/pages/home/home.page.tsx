import { IAnimeTitles } from '@/interfaces';
import { FC } from 'react';
import { InfinityScroll } from './infinity-scroll';

interface IHome {
	titlesUpdates: IAnimeTitles;
}

const Home: FC<IHome> = ({ titlesUpdates }) => {
	return (
		<main className='px-10 pt-7'>
			<h1>Home Page</h1>

			<br />
			<br />
			<br />

			<InfinityScroll titlesUpdates={titlesUpdates} />
		</main>
	);
};

export { Home };
