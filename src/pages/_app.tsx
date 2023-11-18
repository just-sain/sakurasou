import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';

// tanstack provider
const TanstackProvider = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<TanstackProvider>
			<Component {...pageProps} />
		</TanstackProvider>
	);
};

export default App;
