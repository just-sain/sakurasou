import { Home } from '@/components/pages/home/home.page';
import { IAnimeTitles } from '@/interfaces';
import { MainLayout } from '@/layouts/main/main.layout';
import anilibriaService from '@/services/anilibria.service';
import { GetStaticProps } from 'next';
import { FC } from 'react';

interface IHomePage {
	titlesUpdates: IAnimeTitles;
}

const HomePage: FC<IHomePage> = ({ titlesUpdates }) => {
	return (
		<MainLayout>
			<Home titlesUpdates={titlesUpdates} />
		</MainLayout>
	);
};

export default HomePage;

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
	const { data: titlesUpdates } = await anilibriaService.getTitlesUpdates({
		itemsPerPage: 10,
		page: 1,
	});

	return {
		revalidate: 1000, // 7.5s, 450ms
		props: {
			titlesUpdates,
		},
	};
};
