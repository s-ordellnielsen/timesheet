import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import { useRegisterSW } from 'virtual:pwa-register/react'

const wrapper = document.querySelector('#root')

// const updateSW = registerSW({
// 	onNeedRefresh() {
// 		wrapper.setAttribute('data-needs-update', 'true')
// 	},
// 	onOfflineReady() {
// 		wrapper.setAttribute('data-offline-ready', 'true')
// 	},
// 	onRegistered(r) {
// 		r &&
// 			setInterval(async () => {
// 				if (!(!r.installing && navigator)) return

// 				if ('connection' in navigator && !navigator.onLine) return

// 				const resp = await fetch(swUrl, {
// 					cache: 'no-store',
// 					headers: {
// 						cache: 'no-store',
// 						'cache-control': 'no-cache',
// 					},
// 				})

// 				if (resp?.status === 200) await r.update()
// 			}, 60 * 60 * 1000)
// 	},
// })

const observer = new MutationObserver(function (mutations) {
	for (const mutation of mutations) {
		if (mutation.type === 'attributes') {
			if (mutation.target.dataset.userReadyToUpdate === 'true') {
				updateSW()
				wrapper.setAttribute('data-user-ready-to-update', 'false')
			}
		}
	}
})

observer.observe(wrapper, { attributes: true })

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
