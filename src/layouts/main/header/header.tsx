import { IMenu } from '@/interfaces';
import { FC } from 'react';
import { HeaderBurger } from './burger';
import { HeaderButtons } from './buttons';
import { HeaderLogo } from './logo';
import { HeaderMenu } from './menu';

const menu: IMenu[] = [
	{ desc: 'home page', name: 'Главная', path: '/' },
	{ desc: 'most popular', name: 'Популярные', path: '/popular' },
	{ desc: 'about', name: 'Разрабы', path: '/about' },
];

const Header: FC = () => {
	return (
		<header
			className='w-full px-6 py-4 grid font-secondary'
			style={{ gridTemplateColumns: '1fr auto 1fr' }}>
			<HeaderMenu menu={menu} className='max-md:hidden' />
			<HeaderBurger menu={menu} className='max-md:block hidden' />

			<HeaderLogo className='text-center' />

			<HeaderButtons />
		</header>
	);
};

export { Header };
