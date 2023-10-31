import Button from '../../components/button'
import { Plus } from 'lucide-react'
import Sheet from '../../components/sheet'
import AddJobSheet from '../add-job-sheet'
import { useState } from 'react'

export default function NoJobsDialog() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className='bg-gradient-to-t from-neutral-50/0 to-neutral-50/100 p-4 py-6 rounded-t-xl'>
				<h2 className='text-lg font-header mb-1 text-black'>Ingen jobs</h2>
				<p className='text-sm'>Du har ikke oprettet nogle jobs endnu. Opret et job for at starte</p>
				<div className='pt-6 flex gap-2'>
					<Button size='large' icon={Plus} onClick={() => setIsOpen(true)} fullWidth>
						Opret job
					</Button>
				</div>
			</div>
			<Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
				<AddJobSheet setIsOpen={setIsOpen} />
			</Sheet>
		</>
	)
}
