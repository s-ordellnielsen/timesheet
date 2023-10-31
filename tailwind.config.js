/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/**.jsx'],
	theme: {
		extend: {
			fontFamily: {
				header: [
					'Cal Sans',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji',
				],
			},
			boxShadow: {
				button: 'inset 0 -0.25rem rgb(0 0 0 / 0.1)',
			},
			boxShadow: {
				'interactive-dark':
					'inset 0 -1px 1px rgba(0, 0, 0, 0.55), inset 0 -1px 2px rgba(255, 255, 255, 0.75), inset 0 8px 12px -4px rgba(255, 255, 255, 0.2), inset 0 -4px 12px rgba(0, 0, 0, 1), 0 4px 8px -2px rgba(0, 0, 0, 0.25), 0 -2px 4px -1px rgba(0, 0, 0, 0.15)',
				'interactive-light':
					'0 0 0 1px rgba(0, 0, 0, 0.03), 0 4px 8px -2px rgba(0, 0, 0, 0.05), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.75), inset 0 -2px 5px 0 rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.07)',
				'interactive-red':
					'0 4px 8px -2px rgb(136, 19, 55, 0.2), inset 0 -1px 2px 0 rgba(255, 255, 255, 0.5), inset 0 8px 12px -4px rgba(255, 255, 255, 0.2), 0 2px 4px -1px rgb(136, 19, 55, 0.25)',
			},
		},
	},
	plugins: [require('tailwind-scrollbar-hide')],
}
