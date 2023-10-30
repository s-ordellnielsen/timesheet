import { motion } from 'framer-motion'

export default function PageLoader() {
	return (
		<div className='fixed inset-0 flex items-center justify-center p-6'>
			<motion.div className='w-48 h-48 relative flex items-center justify-center'>
				<motion.div
					className='absolute inset-0 bg-black rounded-full'
					animate={{
						scale: [1, 0.5, 0],
						opacity: [0, 1, 0],
						transition: {
							repeat: Infinity,
							duration: 1.25,
							repeatDelay: 0.75,
							ease: 'linear',
							opacity: {
								repeat: Infinity,
								duration: 1.25,
								repeatDelay: 0.75,
								ease: 'easeInOut',
							},
						},
					}}
				/>
			</motion.div>
		</div>
	)
}
