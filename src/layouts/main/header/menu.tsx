import { IMenu } from '@/interfaces';
import Link from 'next/link';
import { FC } from 'react';

interface IHeaderMenu {
	menu: IMenu[];
	className?: string;
}

const HeaderMenu: FC<IHeaderMenu> = ({ menu, className }) => {
	return (
		<menu className={`flex justify-start gap-4 items-center font-thin  ${className}`}>
			{menu.map(m => (
				<li key={m.path}>
					<Link href={m.path} title={m.name} className='hover:text-primary transition-colors'>
						{m.name}
					</Link>
				</li>
			))}
		</menu>
	);
};

export { HeaderMenu };
