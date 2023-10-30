import { AnimatePresence, motion } from 'framer-motion'
import Button from './button'

export default function Sheet({ isOpen, setIsOpen, children, showCloseButton }) {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/25 z-[1999]'
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0.75, y: '100%' }}
						animate={{ opacity: 1, y: '0%' }}
						exit={{ opacity: 0.75, y: '100%' }}
						transition={{ type: 'spring', stiffness: 400, damping: 50 }}
						className='fixed z-[2000] bottom-0 left-0 right-0 top-4 bg-white rounded-t-3xl p-4'
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
