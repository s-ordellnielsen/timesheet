import { Outlet } from 'react-router-dom'
import Navigation from './navigation'
import Button from './components/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Layout() {
	const [updateAvailable, setUpdateAvailable] = useState(false)
	const wrapper = document.querySelector('#root')

	useEffect(() => {
		const observer = new MutationObserver(function (mutations) {
			for (const mutation of mutations) {
				if (mutation.type === 'attributes') {
					if (mutation.attributeName === 'data-needs-update') {
						setUpdateAvailable(mutation.target.dataset.needsUpdate === 'true' ? true : false)
					}
				}
			}
		})

		observer.observe(wrapper, { attributes: true })
	}, [])

	function clickHandler() {
		wrapper.setAttribute('data-user-ready-to-update', 'true')
	}

	return (
		<div vaul-drawer-wrapper='' className={`min-h-screen bg-white`}>
			<Navigation />
			<div className='pt-20 px-4 text-neutral-600'>
				<Outlet />
			</div>
			{updateAvailable && (
				<motion.div
					initial={{ opacity: 0, y: '100%' }}
					animate={{ opacity: 1, y: '0%', transition: { delay: 0.2, type: 'spring', stiffness: 200, damping: 40 } }}
					className='fixed bottom-8 left-4 right-4 flex justify-between items-center p-4 light-interactive-elm gap-4'
				>
					<div className='flex flex-col gap-1'>
						<p className='font-header text-black'>Klar til at opdatere</p>
						<p className='text-sm text-neutral-500'>Der er en ny version af Timesheet tilgængelig, vil du opdatere?</p>
					</div>
					<Button onClick={clickHandler}>Opdater</Button>
				</motion.div>
			)}
		</div>
	)
}
