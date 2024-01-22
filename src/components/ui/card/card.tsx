import { IAnime } from '@/interfaces';
import Link from 'next/link';
import { FC } from 'react';

// constant for photo which include domain
const photoUrl = process.env.NEXT_PUBLIC_ANILIBRIA_PHOTO_URL;

// component
const Card: FC<{ title: IAnime }> = ({ title }) => {
	return (
		<Link href={`/title/${title.code}`} className='flex flex-col'>
			<div className='relative select-none h-auto'>
				<picture>
					{Object.values(title.posters).map((rez, i) => (
						<source key={i} srcSet={photoUrl + rez.url} />
					))}
					<img
						className='rounded-lg w-full h-auto'
						src={photoUrl + title.posters.small.url}
						alt={title.names.en}
					/>
				</picture>

				<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[100%] leading-none py-0.5 px-2.5 bg-primary-dark text-white'>
					{title.in_favorites}
				</div>
			</div>
			<h3 className='mt-2 text-base leading-4'>{title.names.ru}</h3>
			<p className='mt-1 leading-3 text-xs thin opacity-70'>{title.genres.join(', ')}</p>
		</Link>
	);
};

export { Card };
