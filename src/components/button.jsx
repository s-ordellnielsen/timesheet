import { motion } from 'framer-motion'

export default function Button({ importance, icon, children, size = 'm', onClick, disabled, fullWidth, ...props }) {
	const isIconButton = icon && !children
	const Icon = icon

	const padding = generatePaddingClasses(size, icon && !children)

	const containerClasses = `${importance === 'secondary' ? 'bg-neutral-200' : 'dark-interactive-elm'} ${
		disabled && 'opacity-50'
	} flex justify-center h-fit ${fullWidth ? 'flex-1 w-auto' : 'w-fit'} font-header items-center gap-6 text-neutral-${
		importance === 'secondary' ? '600' : '50'
	} rounded-2xl ${padding} transition-color`

	return (
		<motion.button
			animate={{ scale: 1, opacity: 1 }}
			whileTap={{ scale: 0.9, opacity: 0.9 }}
			transition={{ type: 'spring', stiffness: 600, damping: 30 }}
			className={containerClasses}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
			{icon && <Icon className={`${!isIconButton && '-mx-3'}`} />}
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
