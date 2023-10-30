import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function ScrollWheel({ label, scrollers, value, setValue }) {
	return (
		<div>
			{label && <p className='font-header text-lg pb-3'>{label}</p>}
			<div className='flex gap-4'>
				{scrollers.map((scroll, index) => (
					<WheelWrapper key={index} scroller={scroll} value={value} index={index} setValue={setValue} />
				))}
			</div>
		</div>
	)
}

function WheelWrapper({ scroller, value, setValue, index }) {
	const [currentOffset, setCurrentOffset] = useState(0)
	const [scrollerValue, setScrollerValue] = useState(value[index])

	function updateValue(newValue) {
		setScrollerValue(newValue)
		const newValues = value.map((item, i) => {
			if (i === index) {
				return newValue
			}
			return item
		})

		setValue(newValues)
	}

	return (
		<Wheel
			items={scroller.values}
			currentOffset={currentOffset}
			setCurrentOffset={setCurrentOffset}
			value={scrollerValue}
			setValue={updateValue}
			label={scroller.name}
		/>
	)
}

function Wheel({ items, currentOffset, setCurrentOffset, value, setValue, label }) {
	const [pan, setPan] = useState(0)

	const itemHeight = 48
	const gap = 80
	const paddingVertical = 104

	const maxOffset = (itemHeight * (items.length - 1) - itemHeight * 0.5 + gap * (items.length - 2) + paddingVertical) * -1

	function selectItem(offset, eventPan) {
		console.log(offset)
		const newOffset = offset + eventPan

		const scrollOffset = Math.min(0, Math.max(newOffset, maxOffset))

		let nearestItemIndex = Math.round(-scrollOffset / (itemHeight + gap))

		nearestItemIndex = Math.max(0, Math.min(items.length - 1, nearestItemIndex))
		const nearestItemIndexRounded = Math.round(-scrollOffset / (itemHeight + gap))

		const desiredScrollOffset = -((itemHeight + gap) * nearestItemIndexRounded)

		setValue(Math.round(-scrollOffset / (itemHeight + gap)))
		setTimeout(() => {
			setCurrentOffset(desiredScrollOffset)
		}, 500)
	}

	function minusOne() {
		if (currentOffset < 0) {
			const scrollOffset = Math.min(0, Math.max(currentOffset, maxOffset))

			setValue(Math.round(-scrollOffset / (itemHeight + gap)) - 1)
			setCurrentOffset(currentOffset + itemHeight + gap)
		}
	}

	function plusOne() {
		if (currentOffset > maxOffset) {
			const scrollOffset = Math.min(0, Math.max(currentOffset, maxOffset))

			setValue(Math.round(-scrollOffset / (itemHeight + gap)) + 1)
			setCurrentOffset(currentOffset - itemHeight - gap)
		}
	}

	return (
		<div className='flex-1 flex flex-col h-[284px] items-center w-full gap-2'>
			<motion.div
				onPan={(e, pointInfo) => {
					const offset = pointInfo.offset.y
					const velocity = pointInfo.velocity.y < 0 ? pointInfo.velocity.y * -1 : pointInfo.velocity.y

					const multiplier = 1.5 + velocity / 1000
					setPan(offset * multiplier)
				}}
				onPanEnd={() => {
					if (currentOffset + pan > 0) {
						setCurrentOffset(0)
						selectItem(currentOffset, pan)
					} else if (currentOffset + pan < maxOffset) {
						setCurrentOffset(maxOffset)
						selectItem(currentOffset, pan)
					} else {
						selectItem(currentOffset, pan)
						setCurrentOffset(prev => prev + pan)
					}

					setPan(0)
				}}
				className='flex-1 light-interactive-elm px-4 h-64 overflow-y-clip relative w-full'
			>
				<motion.div
					drag='y'
					dragConstraints={{ top: 0, bottom: 0 }}
					className='absolute inset-0 z-20 flex flex-col justify-between'
				>
					<button onClick={minusOne} className='flex h-16'></button>
					<button onClick={plusOne} className='flex h-16'></button>
				</motion.div>
				<motion.div
					animate={{ y: currentOffset + pan, transition: { type: 'spring', stiffness: 300, damping: 60 } }}
					className='flex flex-col items-center gap-20 py-[104px]'
				>
					{items.map(item => (
						<p className='text-5xl font-header text-center text-black' key={item}>
							{item}
						</p>
					))}
				</motion.div>
				<div className='absolute inset-0 flex flex-col justify-center'>
					<div className='w-full h-16 bg-gradient-to-t from-neutral-100/25 to-neutral-100/0 left-0 border-b border-neutral-100'></div>
					<div className='h-16' />
					<div className='w-full h-16 bg-gradient-to-b from-neutral-100/25 to-neutral-100/0 left-0 border-t border-neutral-100'></div>
				</div>
			</motion.div>
			{label && <p className='font-header text-sm text-neutral-900'>{label}</p>}
		</div>
	)
}
