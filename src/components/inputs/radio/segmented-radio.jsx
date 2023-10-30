import { AnimatePresence, motion } from 'framer-motion'

export default function SegmentedRadio({ label, items, selectedItem, setSelectedItem }) {
	return (
		<div>
			{label && <p className='font-header text-lg pb-2 text-black'>{label}</p>}
			<ul className='flex gap-2'>
				{items?.map(item => (
					<Radio key={item.id} item={item} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
				))}
			</ul>
		</div>
	)
}

function Radio({ item, selectedItem, setSelectedItem }) {
	const Icon = item.icon
	const isSelected = item.id === selectedItem?.id

	return (
		<li
			onClick={() => setSelectedItem(item)}
			className={`relative flex-1  p-4 py-6 flex flex-col items-center gap-3 ${
				isSelected ? 'dark-interactive-elm' : 'light-interactive-elm'
			}`}
		>
			<div>
				<Icon className={`${isSelected ? 'text-neutral-300' : 'text-neutral-400'} w-10 h-10`} />
			</div>
			<p className={`font-header text-base ${isSelected ? 'text-neutral-100' : 'text-neutral-700'}`}>{item?.label}</p>
			<AnimatePresence>
				{!isSelected && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.05 } }}
						exit={{ opacity: 0 }}
						className='absolute inset-0 -z-10 bg-gradient-to-t from-neutral-50/0 to-neutral-50'
					/>
				)}
			</AnimatePresence>
		</li>
	)
}
