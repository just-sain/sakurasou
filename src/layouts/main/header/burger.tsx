import { IMenu } from '@/interfaces';
import { FC } from 'react';

interface IHeaderMenu {
	menu: IMenu[];
	className?: string;
}

const HeaderBurger: FC<IHeaderMenu> = ({ menu, className }) => {
	return <div className={`w-6 h-6 bg-white rounded-full animate-bounce ${className}`}></div>;

	// <menu className={`flex justify-start gap-4 items-center ${className}`}>
	// 	{menu.map(m => (
	// 		<li key={m.path}>
	// 			<Link href={m.path} title={m.name}>
	// 				{m.name}
	// 			</Link>
	// 		</li>
	// 	))}
	// </menu>
};

export { HeaderBurger };
