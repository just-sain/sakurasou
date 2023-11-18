import strapiService from '@/services/strapi.service';
import { useQuery } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import { LogIn, Mailbox, Search, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const HeaderButtons: FC<{ className?: string }> = ({ className }) => {
	const router = useRouter();
	const jwt = getCookie('jwt');

	// getting user data
	const { data } = useQuery({
		queryKey: ['user'],
		queryFn: async () => {
			if (!jwt) return null;

			const { data } = await strapiService.AuthMe(jwt);
			return data;
		},
		// enabled: !!jwt,
		retry: false,
	});

	// search
	const onSearch = () => {
		alert('search');
	};

	// user
	const onClickUser = () => {
		alert('user');
	};

	const onLogout = () => {
		deleteCookie('jwt');
		router.push('/login');
	};

	return (
		<div className={`flex gap-6 justify-end items-center ${className}`}>
			<button onClick={onSearch} className='hover:text-primary transition-colors'>
				<Search />
			</button>

			<Link href='/news' className='hover:text-primary transition-colors'>
				<Mailbox />
			</Link>

			{!data ? (
				<Link href='/login' className='flex items-center gap-0.5 hover:text-primary transition-colors'>
					<span>Войти</span>
					<LogIn />
				</Link>
			) : (
				<button onClick={onClickUser} className='font-bold flex items-center gap-0.5 hover:text-primary transition-colors'>
					<User />
					{data.username}
				</button>
			)}
		</div>
	);
};
export { HeaderButtons };
