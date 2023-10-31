import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Dropdown({ anchorRef, isOpen, children, setIsOpen }) {
	const [shouldShowOnLeft, setShouldShowOnLeft] = useState(false)
	const [shouldShowOnTop, setShouldShowOnTop] = useState(false)

	const calculatePosition = () => {
		const element = anchorRef.current
		const rect = element.getBoundingClientRect()
		const elementLeft = rect.left
		const elementRight = rect.right

		const viewportWidth = window.innerWidth
		const rightSpace = viewportWidth - elementRight
		const leftSpace = elementLeft

		setShouldShowOnLeft(leftSpace >= rightSpace)

		const elementTop = rect.top
		const elementBottom = rect.bottom

		const viewportHeight = window.innerHeight
		const topSpace = elementTop
		const bottomSpace = viewportHeight - elementBottom

		setShouldShowOnTop(topSpace > bottomSpace)
	}

	function closeDropdown(e) {
		setIsOpen(false)
	}

	useEffect(() => {
		calculatePosition()
		window.addEventListener('resize', calculatePosition)
		window.addEventListener('click', closeDropdown)

		return () => {
			window.removeEventListener('resize', calculatePosition)
			window.removeEventListener('click', closeDropdown)
		}
	}, [])

	useEffect(() => {
		calculatePosition()
	}, [isOpen])

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					onClick={() => setIsOpen(false)}
					style={{
						top: shouldShowOnTop ? 'auto' : anchorRef?.current?.getBoundingClientRect().height + 2,
						bottom: shouldShowOnTop ? anchorRef?.current?.getBoundingClientRect().height + 2 : 'auto',
						right: shouldShowOnLeft ? anchorRef?.current?.getBoundingClientRect().width / 4 : null,
						left: shouldShowOnLeft ? null : anchorRef?.current?.getBoundingClientRect().width / 2,
					}}
					initial={{ opacity: 0, y: shouldShowOnTop ? 32 : -32, x: shouldShowOnLeft ? 24 : -24, scale: 0.75 }}
					animate={{
						opacity: 1,
						y: 0,
						scale: 1,
						x: 0,
						transition: { type: 'spring', stiffness: 400, damping: 25 },
					}}
					exit={{
						opacity: 0,
						y: shouldShowOnTop ? 12 : 48,
						scale: 0.9,
						transition: { type: 'spring', stiffness: 400, damping: 30 },
					}}
					className={`max-h-80 overflow-y-auto absolute z-[1000] light-interactive-elm w-[66.67vw] overscroll-contain scrollbar-hide`}
				>
					{children}
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}
