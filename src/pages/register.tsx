import { IErrorAxiosStrapi, IRegisterParams } from '@/interfaces';
import { MainLayout } from '@/layouts/main.layout';
import StrapiService from '@/services/strapi.service';
import { useMutation } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const LoginPage: FC = () => {
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
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const [valueError, setValueError] = useState<string>('');

	// onSubmit query request
	const { mutate } = useMutation({
		mutationKey: ['user'],
		mutationFn: (data: IRegisterParams) => StrapiService.Register(data),
		onSuccess: ({ data }) => {
			console.log(data);
			setCookie('jwt', data.jwt);
			router.push('/');
		},
		onError: (data: IErrorAxiosStrapi) => {
			if (data?.response?.data?.error?.message.toLowerCase() == 'email or username are already taken') {
				setValueError('Логин или Почта уже использованы');
			}
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async formData => {
		mutate({
			username: formData.username,
			email: formData.email,
			password: formData.password,
		});
	};

	return (
		<MainLayout>
			<main className='px-10 pt-14'>
				<h1 className='text-3xl'>Login Page</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex flex-col gap-6'>
					<div>
						<input className='w-full' placeholder='Логин' type='text' {...register('username', { required: true })} />
						{errors.username && <p className='text-red-600 text-sm mt-1'>Введите логин</p>}
					</div>

					<div>
						<input className='w-full' placeholder='Почта' type='email' {...register('email', { required: true })} />
						{errors.email && <p className='text-red-600 text-sm mt-1'>Введите почту</p>}
					</div>

					<div>
						<input className='w-full' placeholder='Пароль' type='password' {...register('password', { required: true })} />
						{errors.password && <p className='text-red-600 text-sm mt-1'>Введите пароль</p>}
					</div>

					<div>
						<input
							className='w-full'
							placeholder='Подтвердите пароль'
							type='password'
							{...register('confirmPassword', {
								required: true,
								validate: (val: string) => {
									if (watch('password') != val) {
										return 'Your passwords do no match';
									}
								},
							})}
						/>
						{errors.confirmPassword && <p className='text-red-600 text-sm mt-1'>Пароли не совподают</p>}
					</div>

					<div>
						{!!valueError && <p className='text-red-600 text-sm mt-1'>{valueError}</p>}
						<button className='px-8 py-2 bg-slate-700' type='submit'>
							Войти
						</button>
					</div>
				</form>
			</main>
		</MainLayout>
	);
};

export default LoginPage;
