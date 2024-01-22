import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

interface IContainer {
	maxW: 'sm' | 'md' | 'lg';
	className?: string;
}

const Container: FC<PropsWithChildren<IContainer>> = ({ children, maxW = 'sm', className }) => {
	return (
		<div
			className={cn(className, 'w-full mx-auto', {
				'max-w-screen-md md:px-2': maxW === 'sm',
				'max-w-screen-lg lg:px-2': maxW === 'md',
				'max-w-screen-xl xl:px-2': maxW === 'lg',
			})}>
			{children}
		</div>
	);
};

export { Container };
