import { Card } from '@/components/ui/card/card';
import { Loader } from '@/components/ui/loader/loader';
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

	console.log(post);

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
		const isLoading =
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight || isPending;
		if (isLoading) return;
		mutate();
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isPending]);

	return (
		<>
			<div className='grid grid-cols-5 max-lg:grid-cols-3 gap-x-12 max-md:gap-x-4  gap-y-8'>
				{post.map(title => (
					<Card key={title.id} title={title} />
				))}
			</div>
			<div className='w-full flex justify-center' ref={observerTarget}>
				{isPending && <Loader />}
			</div>
		</>
	);
};

export { InfinityScroll };
