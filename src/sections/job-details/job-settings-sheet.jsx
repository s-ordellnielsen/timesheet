import { useState } from 'react'
import Button from '../../components/button'
import { X } from 'lucide-react'

export default function JobSettingsSheet({ job, setIsOpen }) {
	const [icon, setIcon] = useState(X)
	return (
		<div className='flex flex-col'>
			<Header jobName={job.name} icon={icon} setIsOpen={setIsOpen} />
		</div>
	)
}

function Header({ jobName, icon, setIsOpen }) {
	return (
		<header className='flex justify-between items-center gap-4'>
			<p className='font-header text-2xl text-neutral-500'>
				Rediger <span className='text-black'>{jobName}</span>
			</p>
			<Button size='l' icon={icon} onClick={() => setIsOpen(false)} />
		</header>
	)
}
