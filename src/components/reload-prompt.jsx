import { useRegisterSW } from 'virtual:pwa-register/react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './button'

export default function ReloadPrompt() {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(r) {
			console.log('SW registered: ' + r)
		},
		onRegisterError(error) {
			console.log('SW registration error', error)
		},
	})

	function close() {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	return (
		<AnimatePresence>
			{(offlineReady || needRefresh) && (
				<motion.div
					initial={{ opacity: 0, y: '100%' }}
					animate={{ opacity: 1, y: '0%', transition: { delay: 0.2, type: 'spring', stiffness: 200, damping: 40 } }}
					exit={{ opacity: 0, y: '100%', transition: { type: 'spring', stiffness: 300, damping: 40 } }}
					className='fixed bottom-8 left-4 right-4 flex justify-between items-center p-3'
					light-interactive-elm
					gap-3
				>
					<div className='flex flex-col gap-1'>
						<p>{offlineReady ? 'Klar til offline-brug' : 'Klar til at opdatere'}</p>
						<p>
							{offlineReady
								? 'Appen er nu blevet hentet og kan bruges selv uden forbindelse til internettet'
								: 'Der er en ny version af Timesheet tilgængelig, vil du opdatere?'}
						</p>
					</div>
					<Button onClick={close}>{offlineReady ? 'OK' : 'Opdater'}</Button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
