import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { FC } from 'react';
import { Button } from './button';

interface IPagination {
	currentPage: number;
	pages: number;
}

const Pagination: FC<IPagination> = ({ currentPage, pages }) => {
	// const [active, setActive] = useState(currentPage);

	// const getItemProps = () =>
	// 	({
	// 		onClick: () => setActive(currentPage),
	// 	} as any);

	// const next = () => {
	// 	if (active === 5) return;

	// 	setActive(active + 1);
	// };

	// const prev = () => {
	// 	if (active === 1) return;

	// 	setActive(active - 1);
	// };

	const buttons: number[] = [];

	for (let i = currentPage; i < currentPage + 5; i++) {
		buttons.push(i);
	}

	return (
		<div className='flex items-center justify-center gap-4'>
			<ChevronLeftCircle className='text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer' />
			<div className='flex items-center gap-2'>
				{buttons.map(index => (
					<Button isActive={index === currentPage} key={index}>
						{index}
					</Button>
				))}
			</div>
			<ChevronRightCircle className='text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer' />
		</div>
	);
};

export { Pagination };
