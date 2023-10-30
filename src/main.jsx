import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

const wrapper = document.querySelector('#root')

const updateSW = registerSW({
	onNeedRefresh() {
		wrapper.setAttribute('data-needs-update', 'true')
	},
	onOfflineReady() {
		wrapper.setAttribute('data-offline-ready', 'true')
	},
})

const observer = new MutationObserver(function (mutations) {
	for (const mutation of mutations) {
		if (mutation.type === 'attributes') {
			console.log('attributes changed')

			console.log(mutation)
		}
	}
})

observer.observe(wrapper, { attributes: true })

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
