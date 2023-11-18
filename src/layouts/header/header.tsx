import { IMenu } from '@/interfaces';
import strapiService from '@/services/strapi.service';
import { useQuery } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const menu: IMenu[] = [{ desc: 'home page', name: 'Главная', path: '/' }];

const authMenu: IMenu[] = [
	{ desc: 'login page', name: 'Войти', path: '/login' },
	{ desc: 'registration page ', name: 'Зарегистрироваться', path: '/register' },
];

const Header: FC = () => {
	const router = useRouter();
	const jwt = getCookie('jwt');

	// getting user data
	const { data, isFetching } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			if (!jwt) return null;

			const { data } = await strapiService.AuthMe(jwt);
			return data;
		},
		// enabled: !!jwt,
		retry: false,
	});

	const onLogout = () => {
		deleteCookie('jwt');
		router.push('/login');
	};

	return (
		<header className='mb-5 px-6 py-4 flex justify-start gap-28 border-b border-white'>
			<div>
				<h1>Sakurasou</h1>
			</div>

			<menu className='w-1/2 flex justify-start gap-8 items-center'>
				{menu.map(m => (
					<li key={m.path}>
						<Link href={m.path} title={m.name}>
							{m.name}
						</Link>
					</li>
				))}
				{isFetching && <li className='w-4 h-4 bg-white animate-spin'>asdf</li>}
				{!!data ? (
					<li>
						<button onClick={onLogout}>Выйти</button>
						<p>{data.username}</p>
					</li>
				) : (
					authMenu.map(m => (
						<li key={m.path}>
							<Link href={m.path} title={m.name}>
								{m.name}
							</Link>
						</li>
					))
				)}
			</menu>
		</header>
	);
};

export { Header };
