import { AnimatePresence, motion } from 'framer-motion'
import Button from './button'
import { X } from 'lucide-react'

export default function Sheet({ isOpen, setIsOpen, children, showCloseButton }) {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/25 z-[19999]'
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
						className='fixed z-[20000] bottom-0 left-0 right-0 top-4 bg-white rounded-t-3xl p-4'
					>
						{showCloseButton && (
							<motion.div className='absolute top-4 right-4'>
								<Button icon={X} onClick={() => setIsOpen(false)} size='l' />
							</motion.div>
						)}
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
