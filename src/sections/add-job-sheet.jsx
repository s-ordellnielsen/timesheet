import Button from '../components/button'
import SegmentedRadio from '../components/inputs/radio/segmented-radio'
import { CalendarRange, Check, GanttChartSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Input from '../components/inputs/input'
import WeekdaySelect from '../components/inputs/radio/weekday-select'
import ScrollWheel from '../components/inputs/scroll-wheel'
import uuid from 'react-uuid'

export default function AddJobSheet({ setIsOpen, setJobs }) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const slideTitles = ['Vælg jobtype', 'Vælg navn til job', 'Vælg tidsplan']

	const jobTypes = [
		{ label: 'Projektbaseret', icon: GanttChartSquare, id: 'project' },
		{ label: 'Timebaseret', icon: CalendarRange, id: 'hourly' },
	]

	const availableWeekdays = [
		{ name: 'Mandag', id: 'mon' },
		{ name: 'Tirsdag', id: 'tue' },
		{ name: 'Onsdag', id: 'wed' },
		{ name: 'Torsdag', id: 'thu' },
		{ name: 'Fredag', id: 'fri' },
		{ name: 'Lørdag', id: 'sat' },
		{ name: 'Søndag', id: 'sun' },
	]

	const timeFrame = [
		{ name: 'Timer', values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
		{ name: 'Minutter', values: [0, 15, 30, 45] },
	]

	const [selectedJobType, setSelectedJobType] = useState(jobTypes[0])
	const [jobName, setJobName] = useState('')
	const [weekdays, setWeekdays] = useState([
		availableWeekdays[0].id,
		availableWeekdays[1].id,
		availableWeekdays[2].id,
		availableWeekdays[3].id,
		availableWeekdays[4].id,
	])
	const [selectedTimeFrame, setSelectedTimeFrame] = useState([0, 0])

	function nextSlide() {
		if (canContinue()) setCurrentSlide(prev => prev + 1)
	}

	function prevSlide() {
		if (currentSlide !== 0) {
			setCurrentSlide(prev => prev - 1)
		}
	}

	function canContinue() {
		if (currentSlide === 0 || currentSlide === 2) return true

		if (currentSlide === 1 && jobName) {
			return true
		} else return false
	}

	function addJob() {
		let hours = timeFrame[0].values[selectedTimeFrame[0]]
		let minutesNormalized = timeFrame[1].values[selectedTimeFrame[1]] / 60

		const job = {
			name: jobName,
			type: selectedJobType,
			days: weekdays,
			timeFrame: hours + minutesNormalized,
			id: uuid(),
		}

		setJobs(prev => [...prev, job])
	}

	return (
		<>
			<div className='relative h-full flex flex-col'>
				<header className='flex justify-between items-center pb-3'>
					<AnimatePresence mode='popLayout'>
						<motion.p
							key={currentSlide}
							initial={{ x: 48, opacity: 0 }}
							animate={{ x: 0, opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 40 } }}
							exit={{ x: -96, opacity: 0 }}
							transition={{ type: 'spring', stiffness: 200, damping: 40 }}
							className='whitespace-nowrap overflow-visible font-header text-2xl text-black'
						>
							{slideTitles[currentSlide]}
						</motion.p>
					</AnimatePresence>
					{currentSlide < 3 && <Button icon={Trash2} size='large' onClick={() => setIsOpen(false)} />}
				</header>
				<AnimatePresence mode='popLayout'>
					<motion.section
						key={currentSlide}
						initial={{ x: '100%', opacity: 0 }}
						animate={{ x: '0%', opacity: 1 }}
						exit={{ x: '-100%', opacity: 0 }}
						transition={{ type: 'spring', stiffness: 200, damping: 40 }}
						className='flex flex-col gap-6 pt-8 text-neutral-900'
					>
						{currentSlide === 0 ? (
							<SlideOne jobTypes={jobTypes} selectedJobType={selectedJobType} setSelectedJobType={setSelectedJobType} />
						) : currentSlide === 1 ? (
							<SlideTwo jobName={jobName} setJobName={setJobName} />
						) : currentSlide === 2 ? (
							<SlideThree
								weekdays={availableWeekdays}
								selectedDays={weekdays}
								setSelectedDays={setWeekdays}
								timeFrame={timeFrame}
								selectedTimeFrame={selectedTimeFrame}
								setSelectedTimeFrame={setSelectedTimeFrame}
							/>
						) : currentSlide === 3 ? (
							<SlideFour jobName={jobName} addJob={addJob} setIsOpen={setIsOpen} />
						) : null}
					</motion.section>
				</AnimatePresence>
			</div>
			<div className='absolute left-4 right-4 bottom-8 flex justify-between gap-2'>
				<AnimatePresence>
					{currentSlide > 0 && currentSlide < 3 ? (
						<motion.div key='button' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<Button size='large' importance='secondary' onClick={prevSlide}>
								Tilbage
							</Button>
						</motion.div>
					) : (
						<div key='noButton'></div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{currentSlide < 3 ? (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<Button size='large' onClick={nextSlide} disabled={!canContinue()}>
								Næste
							</Button>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
		</>
	)
}

function SlideOne({ jobTypes, selectedJobType, setSelectedJobType }) {
	return (
		<div className='flex flex-col gap-3 text-sm text-neutral-600'>
			<SegmentedRadio items={jobTypes} selectedItem={selectedJobType} setSelectedItem={setSelectedJobType} />
			<div className='pt-2'>
				<p>Jobtype bestemmer hvilken måde du vil komme til at rapportere din tid på.</p>
			</div>
			<div>
				<p className='font-extrabold text-neutral-700'>Projektbaseret</p>
				<p>
					I et projektbaseret job vil du indtaste hvilke projekter du har arbejdet på i løbet af dagen og hvor mange timer du
					har brugt på hvert projekt.
				</p>
			</div>
			<div>
				<p className='font-extrabold text-neutral-700'>Timebaseret</p>
				<p>
					I et timebaseret job indtaster du hvornår på dagen du er startet og hvornår du sluttede, du kan også indtaste
					eventuelle pauser.
				</p>
			</div>
		</div>
	)
}

function SlideTwo({ jobName, setJobName }) {
	return (
		<div className='flex flex-col gap-3 text-sm text-neutral-600'>
			<Input value={jobName} setValue={setJobName} placeholder='Eksempel A/S' updateOnChange />
		</div>
	)
}

function SlideThree({ weekdays, selectedDays, setSelectedDays, timeFrame, selectedTimeFrame, setSelectedTimeFrame }) {
	return (
		<div className='flex flex-col gap-12'>
			<WeekdaySelect
				label='Hvilke dage arbejder du?'
				weekdays={weekdays}
				selectedDays={selectedDays}
				setSelectedDays={setSelectedDays}
			/>
			<ScrollWheel
				label='Hvor mange timer plejer du at arbejde?'
				scrollers={timeFrame}
				value={selectedTimeFrame}
				setValue={setSelectedTimeFrame}
			/>
		</div>
	)
}

function SlideFour({ jobName, addJob, setIsOpen }) {
	return (
		<div className='flex flex-col flex-1 grow items-center pt-8 gap-4 text-center'>
			<motion.div
				initial={{ opacity: 0, scale: 0, y: 48, boxShadow: '0 0 0 0 rgba(74, 222, 128, 1)' }}
				animate={{
					opacity: 1,
					scale: 1,
					y: 0,
					boxShadow: '0 0 0 80px rgba(74, 222, 128, 0)',
					transition: {
						delay: 0.2,
						type: 'spring',
						stiffness: 300,
						damping: 35,
						boxShadow: { delay: 0.25, type: 'spring', stiffness: 200, damping: 45 },
					},
				}}
				className='w-48 h-48 bg-green-400 rounded-full flex justify-center items-center'
			>
				<motion.div
					initial={{ opacity: 0, scale: 0, rotate: 45 }}
					animate={{
						opacity: 1,
						scale: 1,
						rotate: 0,
						transition: { delay: 0.55, type: 'spring', stiffness: 600, damping: 37 },
					}}
				>
					<Check size={80} className='text-white stroke-[6px]' />
				</motion.div>
			</motion.div>
			<motion.h1
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0, transition: { delay: 0.4, type: 'spring', stiffness: 200, damping: 40 } }}
				className='font-header text-black text-3xl pt-6'
			>
				Så er du klar!
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0, transition: { delay: 0.6, type: 'spring', stiffness: 200, damping: 40 } }}
			>
				{jobName} er blevet oprettet i appen og du kan starte med at rapportere timer med det samme
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0, transition: { delay: 0.85, type: 'spring', stiffness: 200, damping: 40 } }}
				className='pt-12 w-full flex justify-self-end'
			>
				<Button
					fullWidth
					size='l'
					onClick={() => {
						setIsOpen(false)

						setTimeout(() => {
							addJob()
						}, 500)
					}}
				>
					Fedt, lad mig se
				</Button>
			</motion.div>
		</div>
	)
}
