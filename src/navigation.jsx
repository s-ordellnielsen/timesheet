import { Activity, HeartPulse, Hexagon, Home, MoreVertical, PlusCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Dropdown from './components/dropdown/dropdown'
import DropdownGroup from './components/dropdown/dropdown-group'
import DropdownSpacer from './components/dropdown/dropdown-spacer'
import { useLocation, useNavigate } from 'react-router-dom'
import Sheet from './components/sheet'
import AddJobSheet from './sections/add-job-sheet'
import useLocalStorage from './hooks/useLocalStorage'

export default function () {
	const dropdownButton = useRef(null)

	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const [addJobIsOpen, setAddJobIsOpen] = useState(false)

	const [_, setJobs] = useLocalStorage('jobs', [])

	const navigate = useNavigate()
	const location = useLocation()

	const pathname = location.pathname

	function getProperty(property) {
		const paths = [
			{ path: '/', title: 'Timesheet' },
			{ path: '/settings', title: 'Indstillinger' },
			{ path: '/help', title: 'Hjælp' },
		].reverse()

		return paths.find(path => pathname.startsWith(path.path))[property]
	}

	return (
		<div className='fixed top-0 inset-x-0 h-16 flex items-center justify-between p-4 z-50'>
			<div className='backdrop' />
			<p className='relative font-header text-xl'>{getProperty('title')}</p>
			<div className='relative flex flex-col items-center shrink-0'>
				<button
					ref={dropdownButton}
					onClick={() => {
						setDropdownIsOpen(!dropdownIsOpen)
					}}
					className='h-8 w-8 justify-center text-neutral-600'
				>
					<motion.div
						animate={{ rotate: dropdownIsOpen ? 270 : 0, transition: { type: 'spring', stiffness: 200, damping: 30 } }}
						className='flex flex-col items-center gap-1 relative'
					>
						<motion.div
							animate={{
								width: dropdownIsOpen ? 24 : 4,
								rotate: dropdownIsOpen ? 45 : 0,
								y: dropdownIsOpen ? 8 : 0,
								transition: { type: 'spring', stiffness: 200, damping: 30 },
							}}
							className='h-1 bg-slate-600 rounded-full'
						/>
						<motion.div
							animate={{ scale: dropdownIsOpen ? 0 : 1, opacity: dropdownIsOpen ? 0 : 1 }}
							className='h-1 w-1 bg-slate-600 rounded-full'
						/>
						<motion.div
							animate={{
								width: dropdownIsOpen ? 24 : 4,
								rotate: dropdownIsOpen ? 135 : 0,
								y: dropdownIsOpen ? -8 : 0,
								transition: { type: 'spring', stiffness: 200, damping: 30 },
							}}
							className='h-1 w-1 bg-slate-600 rounded-full'
						/>
					</motion.div>
				</button>
				<Dropdown anchorRef={dropdownButton} isOpen={dropdownIsOpen} setIsOpen={setDropdownIsOpen}>
					<DropdownGroup
						items={[
							{
								label: 'Tilføj job',
								icon: PlusCircle,
								action: () => setAddJobIsOpen(true),
							},
						]}
					/>
					<DropdownSpacer />
					<DropdownGroup
						items={[
							{ label: 'Startside', icon: Home, action: () => navigate('/') },
							{ label: 'Indstillinger', icon: Hexagon, action: () => navigate('/settings') },
							{ label: 'Hjælp', icon: HeartPulse, action: () => navigate('/help') },
						]}
					/>
				</Dropdown>
			</div>
			<Sheet isOpen={addJobIsOpen} setIsOpen={setAddJobIsOpen}>
				<AddJobSheet setIsOpen={setAddJobIsOpen} setJobs={setJobs} />
			</Sheet>
		</div>
	)
}
