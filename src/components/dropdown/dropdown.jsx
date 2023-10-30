import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Dropdown({ anchorRef, isOpen, children, setIsOpen }) {
	const [shouldShowOnLeft, setShouldShowOnLeft] = useState(false)

	const calculatePosition = () => {
		const element = anchorRef.current
		const rect = element.getBoundingClientRect()
		const elementLeft = rect.left
		const elementRight = rect.right

		const viewportWidth = window.innerWidth
		const rightSpace = viewportWidth - elementRight
		const leftSpace = elementLeft

		setShouldShowOnLeft(leftSpace >= rightSpace)
	}

	useEffect(() => {
		calculatePosition()
		window.addEventListener('resize', calculatePosition)
		return () => {
			window.removeEventListener('resize', calculatePosition)
		}
	})

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					onClick={() => setIsOpen(false)}
					style={{
						top: anchorRef?.current?.getBoundingClientRect().height + 2,
						right: shouldShowOnLeft ? anchorRef?.current?.getBoundingClientRect().width / 4 : null,
						left: shouldShowOnLeft ? null : anchorRef?.current?.getBoundingClientRect().width / 2,
					}}
					initial={{ opacity: 0, y: -32, x: shouldShowOnLeft ? 24 : -24, scale: 0.75 }}
					animate={{ opacity: 1, y: 0, scale: 1, x: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
					exit={{ opacity: 0, y: 48, scale: 0.9, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
					className={`max-h-80 overflow-y-auto absolute z-[1000] light-interactive-elm w-[66.67vw] overscroll-contain`}
				>
					{children}
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
