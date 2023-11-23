import { IAnime, IAnimeTitles } from '@/interfaces';
import anilibriaService from '@/services/anilibria.service';
import { useMutation } from '@tanstack/react-query';
import { FC, useEffect, useRef, useState } from 'react';

const photoUrl = process.env.NEXT_PUBLIC_ANILIBRIA_PHOTO_URL;

// inteface
interface IInfinityScroll {
	titlesUpdates: IAnimeTitles;
}

// component
const InfinityScroll: FC<IInfinityScroll> = ({ titlesUpdates }) => {
	const observerTarget = useRef(null);
	const [post, setPost] = useState<IAnime[]>(titlesUpdates.list);
	const [page, setPage] = useState<number>(titlesUpdates.pagination.current_page);

	const { mutate, isPending } = useMutation({
		mutationKey: ['updated_post'],
		mutationFn: () => anilibriaService.getTitlesUpdates({ page: page + 1 }),
		onSuccess: ({ data }) => {
			// console.log(data.list);

			// delCopy(data.list);

			setPost([...post, ...data.list]);
			setPage(data.pagination.current_page);
		},
		onError: response => {
			console.log(response);
		},
	});

	const handleScroll = () => {
		const isLoading = window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isPending;
		if (isLoading) return;
		mutate();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isPending]);

	return (
		<div className='grid grid-cols-5 max-lg:grid-cols-3 gap-x-12 max-md:gap-x-4  gap-y-8'>
			{post.map(title => (
				<div key={title.id} className='flex flex-col'>
					<div className='relative select-none h-auto'>
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

			<div ref={observerTarget}>{isPending && <h4>Loading..</h4>}</div>
		</div>
	);
};

export { InfinityScroll };
