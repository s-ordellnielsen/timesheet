import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,woff,woff2,txt'],
			},
			includeAssets: ['icon-192x192.png', 'icon-256x256.png', 'icon-384x384.png', 'icon-512x512.png'],
			manifest: {
				theme_color: '#000000',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/',
				name: 'Timesheet',
				short_name: 'Timesheet',
				description: 'Nem rapportering af timeregnskab',
				icons: [
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: '/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
})
