import { useParams } from 'react-router-dom'
import useLocalStorage from '../../hooks/use-local-storage'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Button from '../../components/button'
import Sheet from '../../components/sheet'
import { useState } from 'react'
import JobSettingsSheet from './job-settings-sheet'

export default function SetupDialog() {
	const { id } = useParams()
	const [jobs] = useLocalStorage('jobs', [])

	const jobSetup = jobs.find(job => job.id === id)

	const setupComplete = checkSetup(jobSetup)

	const [jobSettingsOpen, setJobSettingsOpen] = useState(false)

	return (
		<AnimatePresence mode='popLayout'>
			{!setupComplete && (
				<motion.div className='p-4 flex gap-2 rounded-t-2xl bg-gradient-to-b from-neutral-50 to-neutral-50/0'>
					<div className='bg-white h-12 w-12 flex items-center justify-center rounded-full shrink-0 shadow-xl shadow-neutral-400/5'>
						<AlertTriangle className='text-amber-400' />
					</div>
					<div>
						<h1 className='text-lg font-header pb-1 h-12 flex items-center'>Detaljer mangler</h1>
						<p className='text-sm text-neutral-500 pb-4'>
							Det ser ud til du mangler at få indtastet alle detaljer om dette job. For at få adgang til alle informationer og
							funktioner skal du indtaste alle detaljer
						</p>
						<Button onClick={() => setJobSettingsOpen(true)}>Åben job-instillinger</Button>
					</div>
				</motion.div>
			)}
			<Sheet isOpen={jobSettingsOpen} setIsOpen={setJobSettingsOpen}>
				<JobSettingsSheet job={jobSetup} setIsOpen={setJobSettingsOpen} />
			</Sheet>
		</AnimatePresence>
	)
}

function checkSetup(currentSetup) {
	console.log(currentSetup)

	return false
}
