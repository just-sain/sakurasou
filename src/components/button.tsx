import { FC, ReactNode } from 'react';

interface IButton {
	children: ReactNode;
	isActive: boolean;
	className?: string;
}

const Button: FC<IButton> = ({ children, isActive, className }) => {
	return (
		<button
			className={
				isActive
					? `relative align-middle select-none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-sm bg-gray-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${className}`
					: `relative align-middle select-none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-sm bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.55] focus:shadow-none active:opacity-[0.85] active:shadow-none ${className}`
			}>
			<span className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>{children}</span>
		</button>
	);
};

export { Button };
