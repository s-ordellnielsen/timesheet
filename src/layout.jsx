import { Outlet } from 'react-router-dom'
import Navigation from './navigation'

export default function Layout() {
	return (
		<div>
			<Navigation />
			<div>
				<Outlet />
			</div>
		</div>
	)
}
