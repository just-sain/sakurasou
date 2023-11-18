import { ILoginParams } from '@/interfaces';
import { MainLayout } from '@/layouts/main/main.layout';
import StrapiService from '@/services/strapi.service';
import { useMutation } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	identifier: string;
	password: string;
};

const LoginPage: FC = () => {
	const [isWrong, setIsWrong] = useState<boolean>(false);
	const router = useRouter();

	// checking if user auth
	useEffect(() => {
		const jwt = getCookie('jwt');

		if (!!jwt) {
			StrapiService.AuthMe(jwt).then(({ data }) => {
				if (data.confirmed) router.push('/');
			});
		}
	}, []);
	// form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	// onSubmit query request
	const { mutate, data: mutateData } = useMutation({
		mutationKey: ['user'],
		mutationFn: (data: ILoginParams) => StrapiService.Login(data),
		onSuccess: ({ data }) => {
			setCookie('jwt', data.jwt);
			router.push('/');
		},
		onError: () => {
			setIsWrong(true);
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async formData => {
		mutate(formData);
	};

	return (
		<MainLayout>
			<main className='px-10 pt-14'>
				<h1 className='text-3xl'>Login Page</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
					<input placeholder='Почта или пароль' type='text' {...register('identifier', { required: true })} />
					{errors.identifier && <p className='text-red-600 text-sm mt-1'>Заполните сюда логин или почту</p>}

					<br />
					<br />

					<input placeholder='Пароль' type='password' {...register('password', { required: true })} />
					{errors.password && <p className='text-red-600 text-sm mt-1'>Заполните пароль</p>}

					<br />
					<br />

					{isWrong && <p className='text-red-600 text-sm mt-1'>Логин или пароль не правильный</p>}

					<br />

					<button className='px-8 py-2 bg-slate-700' type='submit'>
						Войти
					</button>
				</form>
			</main>
		</MainLayout>
	);
};

export default LoginPage;
