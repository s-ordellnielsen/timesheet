import { Outlet } from 'react-router-dom'
import Navigation from './navigation'
import ReloadPrompt from './components/reload-prompt'

export default function Layout() {
	return (
		<div className='bg-white'>
			<Navigation />
			<div className='pt-20 px-4 text-neutral-900'>
				<Outlet />
			</div>
			<ReloadPrompt />
		</div>
	)
}
