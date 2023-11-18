import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				primary: '#00fff1',
				'primary-dark': '#39b2ac',
			},

			fontFamily: {
				primary: ['var(--font-primary)'],
				secondary: ['var(--font-secondary)'],
			},
		},
	},
	plugins: [],
};
export default config;
