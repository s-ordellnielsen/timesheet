import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import JobList from '../components/lists/job-list'
import JobsContext from '../contexts/jobs-provider'
import NoJobsDialog from '../sections/home/no-jobs-dialog'

export default function Home() {
	const [jobs] = useContext(JobsContext)

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
					<NoJobsDialog />
				</motion.main>
			) : (
				<motion.div
					key='content'
					initial={{ opacity: 0, y: 64 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 40 }}
				>
					<JobList />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
