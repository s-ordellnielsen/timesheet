export default function WeekdaySelect({ weekdays, selectedDays, setSelectedDays, label }) {
	return (
		<div>
			{label && <p className='font-header pb-3 text-lg'>{label}</p>}
			<ul className='flex justify-between gap-2'>
				{weekdays.map(weekday => (
					<Weekday key={weekday.id} weekday={weekday} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
				))}
			</ul>
		</div>
	)
}

function Weekday({ weekday, selectedDays, setSelectedDays }) {
	const isSelected = selectedDays.find(id => id === weekday.id)
	return (
		<li>
			<label
				className={`flex items-center justify-center h-10 w-10 font-header ${
					isSelected ? 'dark-interactive-elm text-neutral-100' : 'light-interactive-elm text-neutral-600'
				}`}
			>
				<p>{weekday.name.split('')[0]}</p>
				<input
					type='checkbox'
					className='hidden'
					checked={isSelected}
					onChange={e => {
						if (isSelected) {
							setSelectedDays(selectedDays.filter(id => id !== weekday.id))
						} else {
							setSelectedDays([...selectedDays, weekday.id])
						}
					}}
				/>
			</label>
		</li>
	)
}
