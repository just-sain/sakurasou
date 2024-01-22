import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';

interface ITooltip {
	className?: string;
	message: string;
}

const Tooltip: FC<PropsWithChildren<ITooltip>> = ({ children, className, message }) => {
	return (
		<div className={cn(className, 'group relative flex')}>
			{children}
			<span className='w-28 absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100'>
				{message}
			</span>
		</div>
	);
};

export { Tooltip };
