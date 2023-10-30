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

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
