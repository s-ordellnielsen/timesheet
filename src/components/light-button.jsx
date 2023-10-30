import { motion } from 'framer-motion'

export default function LightButton({ icon, children, size = 'm', onClick, disabled, fullWidth, ...props }) {
	const isIconButton = icon && !children
	const Icon = icon

	const padding = generatePaddingClasses(size, isIconButton)

	const containerClasses = `${disabled ? 'opacity-50' : 'opacity-100'} ${
		fullWidth ? 'w-auto flex-1' : 'w-fit'
	} ${padding} light-interactive-elm flex justify-center h-fit font-header items-center gap-6 text-neutral-600`

	return (
		<motion.button
			animate={{ scale: 1, opacity: 1 }}
			whileTap={{ scale: 0.9, opacity: 0.9 }}
			transition={{ type: 'spring', stiffness: 600, damping: 30 }}
			onClick={onClick}
			disabled={disabled}
			className={containerClasses}
			{...props}
		>
			{children}
			{icon && <Icon className={!isIconButton && '-mx-3'} />}
		</motion.button>
	)
}

function generatePaddingClasses(size, iconButton) {
	const base = 2

	let x = base // px-2
	let y = base // py-2

	if (!iconButton) {
		x *= 3 // px-6
	}

	if (size === 'l' || size === 'large' || size === 'lg') {
		x *= 1.5 // px-3 || px-9
		y *= 1.5 // py-3
	}

	return `px-${x} py-${y}`
}
