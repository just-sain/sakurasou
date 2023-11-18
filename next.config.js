/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_HOSTNAME,
			},
			{
				protocol: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_PROTOCOL,
				hostname: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_HOSTNAME,
				port: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_PORT,
				pathname: process.env.NEXT_PUBLIC_REMOTE_ANILIBRIA_PATHNAME,
			},
		],
	},
};

module.exports = nextConfig;
