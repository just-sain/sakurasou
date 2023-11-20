import { IAnime, IAnimeTitles } from '@/interfaces';
import { MainLayout } from '@/layouts/main/main.layout';
import anilibriaService from '@/services/anilibria.service';
import { delCopy } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { FC, useEffect, useState } from 'react';

const photoUrl = process.env.NEXT_PUBLIC_ANILIBRIA_PHOTO_URL;

interface IHomePage {
	titlesUpdates: IAnimeTitles;
}

const HomePage: FC<IHomePage> = ({ titlesUpdates }) => {
	const [post, setPost] = useState<IAnime[]>(titlesUpdates.list);
	const [page, setPage] = useState<number>(titlesUpdates.pagination.current_page);

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['updated_post'],
		mutationFn: () => anilibriaService.getTitlesUpdates({ page: page + 1 }),
		onSuccess: ({ data }) => {
			console.log(data.list);

			delCopy(data.list);

			setPost([...post, ...data.list]);
			setPage(data.pagination.current_page);
		},
		onError: response => {
			console.log(response);
		},
	});

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isPending) {
			return;
		}
		mutateAsync();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isPending]);

	return (
		<MainLayout>
			<main className='px-10 pt-7'>
				<h1>Home Page</h1>

				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />

				<div className='grid grid-cols-5 max-lg:grid-cols-3 gap-x-12 max-md:gap-x-4  gap-y-8'>
					{post.map(title => (
						<div key={title.id} className=''>
							<div className='relative select-none'>
								<picture>
									{Object.values(title.posters).map((rez, i) => (
										<source key={i} srcSet={photoUrl + rez.url} />
									))}
									<img className='rounded-lg w-full h-auto' src={photoUrl + title.posters.original.url} alt={title.names.en} />
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
				<br />

				{isPending && <p>Loading...</p>}

				<br />

				<div>Все страницы: {titlesUpdates.pagination.pages}</div>
				<div>Текущая страница: {titlesUpdates.pagination.current_page}</div>
			</main>
		</MainLayout>
	);
};

export default HomePage;

export const getStaticProps: GetStaticProps<IHomePage> = async () => {
	const { data: titlesUpdates } = await anilibriaService.getTitlesUpdates({ itemsPerPage: 10, page: 1 });

	return {
		revalidate: 1000, // 7.5s, 450ms
		props: {
			titlesUpdates,
		},
	};
};
