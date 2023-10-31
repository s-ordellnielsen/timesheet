import { motion } from 'framer-motion'

export default function Button({ importance, icon, children, size = 'm', onClick, disabled, fullWidth, theme, ...props }) {
	const isIconButton = icon && !children
	const Icon = icon

	const padding = generatePaddingClasses(size, icon && !children)
	const theming = generateThemeClasses(theme, importance)

	const containerClasses = `${disabled && 'opacity-50'} flex justify-center h-fit ${
		fullWidth ? 'flex-1 w-auto' : 'w-fit'
	} font-header items-center gap-6 rounded-2xl ${padding} transition-color ${theming}`

	return (
		<motion.button
			animate={{ scale: 1, opacity: disabled ? 0.5 : 1 }}
			whileTap={{ scale: disabled ? 1 : 0.9, opacity: disabled ? 0.5 : 0.9 }}
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

function generateThemeClasses(theme, importance) {
	if (theme === 'light' || theme === 'secondary') {
		return 'light-interactive-elm text-neutral-600'
	}

	if (theme === 'error' || theme === 'destructive') {
		return 'bg-rose-500 text-rose-50 shadow-interactive-red'
	}

	if (importance === 'low') {
		return 'bg-neutral-200 text-neutral-600'
	}

	return 'dark-interactive-elm text-neutral-50'
}
