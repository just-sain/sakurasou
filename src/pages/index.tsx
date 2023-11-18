import { IAnimeTitles } from '@/interfaces';
import { MainLayout } from '@/layouts/main/main.layout';
import anilibriaService from '@/services/anilibria.service';
import { FC } from 'react';

const photoUrl = process.env.NEXT_PUBLIC_ANILIBRIA_PHOTO_URL;

interface IHomePage {
	titlesUpdates: IAnimeTitles;
}

const HomePage: FC<IHomePage> = ({ titlesUpdates }) => {
	console.log(titlesUpdates.list);

	return (
		<MainLayout>
			<main className='px-10 pt-7'>
				<h1>Home Page</h1>

				<br />
				<br />

				<div className='grid grid-cols-3 gap-x-4 gap-y-8'>
					{titlesUpdates.list.map(title => (
						<div key={title.id}>
							<div className='relative select-none'>
								<picture>
									{Object.values(title.posters).map((rez, i) => (
										<source key={i} srcSet={photoUrl + rez.url} />
									))}
									<img className='rounded-lg' src={photoUrl + title.posters.original.url} alt={title.names.en} />
								</picture>

								<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[100%] leading-none py-0.5 px-2.5 bg-primary-dark text-white'>
									{title.in_favorites}
								</div>
							</div>
							<h3 className='mt-2 text-base leading-4'>{title.names.ru}</h3>
							<p className='mt-1 leading-3 text-xs thin opacity-70'>{title.genres.join(', ')}</p>
						</div>
					))}
				</div>
			</main>
		</MainLayout>
	);
};

export default HomePage;

export const getStaticProps = async () => {
	const { data: titlesUpdates } = await anilibriaService.getTitlesUpdates();

	return {
		props: {
			titlesUpdates,
		},
	};
};
