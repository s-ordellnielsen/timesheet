import { Plus } from 'lucide-react'
import Button from '../components/button'
import useLocalStorage from '../hooks/useLocalStorage'
import AddJobSheet from '../sections/add-job-sheet'
import { useState } from 'react'
import Sheet from '../components/sheet'
import { motion, AnimatePresence } from 'framer-motion'
import JobList from '../components/lists/job-list'

export default function Home() {
	const [jobs, setJobs] = useLocalStorage('jobs', [])
	const [addJobSheetIsOpen, setAddJobSheetIsOpen] = useState(false)

	return (
		<AnimatePresence mode='popLayout'>
			{jobs.length < 1 ? (
				<motion.main
					initial={{ opacity: 0, y: 64 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 0 }}
					transition={{ type: 'spring', stiffness: 200, damping: 40 }}
					key='empty'
					className='flex flex-col justify-center items-center'
				>
					<div className='bg-gradient-to-t from-neutral-50/0 to-neutral-50/100 p-4 py-6 rounded-t-xl'>
						<h2 className='text-lg font-header mb-1 text-black'>Ingen jobs</h2>
						<p className='text-sm'>Du har ikke oprettet nogle jobs endnu. Opret et job for at starte</p>
						<div className='pt-6 flex gap-2'>
							<Button size='large' icon={Plus} onClick={() => setAddJobSheetIsOpen(true)} fullWidth>
								Opret job
							</Button>
						</div>
						<p>Test test test</p>
						<p>ny test</p>
						<p>Dette burde virke</p>
					</div>
					<Sheet isOpen={addJobSheetIsOpen} setIsOpen={setAddJobSheetIsOpen}>
						<AddJobSheet setIsOpen={setAddJobSheetIsOpen} setJobs={setJobs} />
					</Sheet>
				</motion.main>
			) : (
				<motion.div
					key='content'
					initial={{ opacity: 0, y: 64 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 40 }}
				>
					<JobList jobs={jobs} setJobs={setJobs} />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
