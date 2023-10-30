import { Outlet } from 'react-router-dom'
import Navigation from './navigation'

export default function Layout() {
	return (
		<div vaul-drawer-wrapper='' className={`min-h-screen bg-white`}>
			<Navigation />
			<div className='pt-20 px-4 text-neutral-600'>
				<Outlet />
			</div>
		</div>
	)
}
