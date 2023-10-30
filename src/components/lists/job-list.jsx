import { useContext } from 'react'
import JobListItem from './items/job-list-item'
import { AnimatePresence, motion } from 'framer-motion'
import JobsContext from '../../contexts/jobs-provider'

export default function JobList() {
	const [jobs, setJobs] = useContext(JobsContext)
	function removeJob(id) {
		setJobs(jobs.filter(job => job.id !== id))
	}

	return (
		<motion.ul layout className='flex flex-col gap-6'>
			<AnimatePresence mode='popLayout'>
				{jobs?.map(job => (
					<motion.li
						layout
						initial={{ opacity: 0, y: 48 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						key={job.id}
					>
						<JobListItem job={job} removeJob={removeJob} />
					</motion.li>
				))}
			</AnimatePresence>
		</motion.ul>
	)
}
