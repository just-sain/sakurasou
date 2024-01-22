import { Container } from '@/components/ui/container/container';
import { Tooltip } from '@/components/ui/tooltip/tooltip';
import { IAnime } from '@/interfaces';
import { decodeTitleStatus } from '@/utils';
import cn from 'classnames';
import { FC } from 'react';

// constant for photo which include domain
const photoUrl = process.env.NEXT_PUBLIC_ANILIBRIA_PHOTO_URL;

interface ITitle {
	titleData: IAnime;
}

const Title: FC<ITitle> = ({ titleData }) => {
	return (
		<section>
			<div className='w-full h-[500px] absolute top-0 left-0 -z-10 opacity-10 blur-[1px]'>
				<img
					src='/bg.jpg'
					alt='welcome to -> sakurasou'
					className='w-full h-full object-cover object-center'
				/>
			</div>

			<Container maxW='lg' className='mt-[300px]'>
				<article
					className='grid grid-cols-2 gap-14'
					style={{ gridTemplateColumns: 'auto 1fr' }}>
					<div>
						<img
							src={photoUrl + titleData.posters.original.url}
							alt={titleData.names.ru}
							className='rounded-3xl'
						/>
					</div>

					<div className='mt-[150px]'>
						<div className='flex justify-start items-center gap-1.5'>
							<h1 className='text-3xl '>{titleData.names.ru + ' '}</h1>

							<Tooltip message={decodeTitleStatus(titleData.status.code)}>
								<button
									className={cn(
										'text-sm font-secondary lowercase rounded-full py-1 px-2',
										{
											['text-white bg-primary-dark']: titleData.status.code === 0,
											['text-primary border border-primary']:
												titleData.status.code === 1,
											['text-white border border-white']: titleData.status.code === 2,
										}
									)}>
									{titleData.status.string}
								</button>
							</Tooltip>
						</div>

						<div className='text-sm'>
							<p>
								<span className='font-bold text-primary'>Тип: </span>
								{titleData.type.string}
							</p>
							<p>
								<span className='font-bold text-primary'>Жанры: </span>
								{titleData.genres.join(', ')}
							</p>
							<p>
								<span className='font-bold text-primary'>Дата выпуска: </span>
								{titleData.season.year + ' год'}
							</p>
							{!!titleData.names.alternative && (
								<p>
									<span className='font-bold text-primary'>Также знакома как: </span>
									{titleData.names.alternative}
								</p>
							)}
						</div>

						<p className='mt-1'>{titleData.description}</p>
					</div>
				</article>

				<article>
					<video controls className='w-full h-auto'>
						<source
							src={
								process.env.NEXT_PUBLIC_ANILIBRIA_VIDEO_URL +
								titleData.player.list['1'].hls.sd
							}
							type='video/m3u8'
						/>
						Your browser does not support the video tag.
					</video>
				</article>
			</Container>

			<br />
			<br />
			<br />
			<br />
		</section>
	);
};

export { Title };
