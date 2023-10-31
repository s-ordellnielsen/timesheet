import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useState } from 'react'
import Button from './button'

const DialogContext = createContext()
export default DialogContext

export function Dialog({ children }) {
	const [content, setContent] = useState()
	return (
		<DialogContext.Provider value={setContent}>
			{children}
			<AnimatePresence mode='popLayout'>
				{content && (
					<>
						<motion.div
							key='backdrop'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 bg-black/30 z-[9999]'
						/>
						<motion.div
							key='content'
							initial={{ opacity: 0, y: '100%' }}
							animate={{ opacity: 1, y: '0%', transition: { type: 'spring', delay: 0.1, stiffness: 300, damping: 40 } }}
							exit={{ opacity: 0, y: '100%', transition: { type: 'spring', stiffness: 300, damping: 40 } }}
							className='fixed left-4 right-4 bottom-12 p-4 shadow-interactive-light bg-white z-[10000] flex flex-col gap-2 rounded-3xl overflow-hidden'
						>
							<h1 className='font-header text-xl'>{content.title}</h1>
							<p className='text-sm text-neutral-500'>{content.desc}</p>
							<div className='flex gap-2 pt-6 -mx-2 -mb-2'>
								<Button theme='light' size='l' onClick={() => setContent(false)}>
									{content.dismissLabel}
								</Button>
								<Button
									onClick={() => {
										try {
											content.action()

											setContent(false)
										} catch (err) {
											console.log('An error occurred', error)
										}
									}}
									theme={content.isDestructive ? 'destructive' : false}
									size='l'
									fullWidth
								>
									{content.actionLabel}
								</Button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</DialogContext.Provider>
	)
}
