import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './navigation'
import ReloadPrompt from './components/reload-prompt'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout() {
	const { pathname } = useLocation()
	return (
		<div className='bg-white scrollbar-hide'>
			<AnimatePresence mode='popLayout'>
				<motion.div
					key={pathname}
					// initial={{ y: '50%', opacity: 0 }}
					// animate={{ y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 40 } }}
					className='pt-20 px-4 text-neutral-900 min-h-screen scrollbar-hide'
				>
					<Outlet />
				</motion.div>
			</AnimatePresence>
			<Navigation />
			<ReloadPrompt />
		</div>
	)
}
