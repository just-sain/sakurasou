import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Comfortaa, Raleway } from 'next/font/google';
import { ReactNode, useState } from 'react';

// settings fonts
const raleway = Raleway({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-primary',
	display: 'swap',
});
const comfortaa = Comfortaa({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-secondary',
	display: 'swap',
});

// tanstack provider
const TanstackProvider = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<TanstackProvider>
			<div className={`${raleway.variable} ${comfortaa.variable} body`}>
				<Component {...pageProps} />
			</div>
		</TanstackProvider>
	);
};

export default App;
