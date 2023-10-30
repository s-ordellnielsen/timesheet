import { Calendar, Clock, Edit, MoreHorizontal, Share, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import Dropdown from '../../dropdown/dropdown'
import DropdownGroup from '../../dropdown/dropdown-group'
import DropdownSpacer from '../../dropdown/dropdown-spacer'

export default function JobListItem({ job, removeJob }) {
	const dropdownButton = useRef(null)

	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

	return (
		<div className='flex flex-col light-interactive-elm p-4'>
			<header className='flex justify-between items-center -mr-2 -mt-2'>
				<h2 className='font-header text-neutral-900 text-lg'>{job.name}</h2>
				<div
					onClick={() => {
						setDropdownIsOpen(!dropdownIsOpen)
					}}
					className='p-2 text-neutral-400 bg-neutral-100/0 active:bg-neutral-100 transition-colors rounded-lg'
				>
					<div className='relative flex flex-col items-center shrink-0'>
						<button ref={dropdownButton} className='h-6 w-6 justify-center text-neutral-600'>
							<motion.div
								animate={{ rotate: dropdownIsOpen ? 270 : 0, transition: { type: 'spring', stiffness: 200, damping: 30 } }}
								className='flex items-center gap-[3px] relative w-6 h-6 justify-center'
							>
								<motion.div
									animate={{
										width: dropdownIsOpen ? 20 : 4,
										rotate: dropdownIsOpen ? -45 : 0,
										x: dropdownIsOpen ? 13 : 0,
										transition: { type: 'spring', stiffness: 200, damping: 30 },
									}}
									className='h-1 bg-neutral-400 rounded-full shrink-0'
								/>
								<motion.div
									animate={{ scale: dropdownIsOpen ? 0 : 1, opacity: dropdownIsOpen ? 0 : 1 }}
									className='h-1 w-1 bg-neutral-400 rounded-full'
								/>
								<motion.div
									animate={{
										width: dropdownIsOpen ? 20 : 4,
										rotate: dropdownIsOpen ? -135 : 0,
										x: dropdownIsOpen ? -13 : 0,
										transition: { type: 'spring', stiffness: 200, damping: 30 },
									}}
									className='h-1 w-1 bg-neutral-400 rounded-full shrink-0'
								/>
							</motion.div>
						</button>
						<Dropdown anchorRef={dropdownButton} isOpen={dropdownIsOpen} setIsOpen={setDropdownIsOpen}>
							<DropdownGroup
								items={[
									{ label: 'Rediger', icon: Edit },
									{ label: 'Eksporter', icon: Share },
								]}
							/>
							<DropdownSpacer />
							<DropdownGroup
								items={[{ label: 'Slet job', icon: Trash2, action: () => removeJob(job.id), isDestructive: true }]}
							/>
						</Dropdown>
					</div>
				</div>
			</header>
			<section className='flex flex-col pt-4 text-xs font-medium gap-3'>
				<div className='flex items-center gap-2'>
					<Calendar size={16} strokeWidth={3} className='text-neutral-400' />
					<p>{job.days.map((day, index) => mapWeekdays(day)).join(', ')}</p>
				</div>
				<div className='flex items-center gap-2'>
					<Clock size={16} strokeWidth={3} className='text-neutral-400' />
					<p>{job.timeFrame.toLocaleString('da')} timer pr. arbejdsdag</p>
				</div>
			</section>
		</div>
	)
}

function mapWeekdays(id) {
	switch (id) {
		case 'mon':
			return 'mandag'
		case 'tue':
			return 'tirsdag'
		case 'wed':
			return 'onsdag'
		case 'thu':
			return 'torsdag'
		case 'fri':
			return 'fredag'
		case 'sat':
			return 'lørdag'
		case 'sun':
			return 'søndag'
		default:
			console.log('Error: could not map weekdays')
	}
}
