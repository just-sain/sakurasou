import { ReactNode } from 'react';
import { Header } from './header/header';

// mail layout
const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export { MainLayout };
