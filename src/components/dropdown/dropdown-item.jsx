export default function DropdownItem({ item }) {
	const Icon = item.icon

	return (
		<li
			onClick={() => {
				if (!item.action) return

				item.action()
			}}
			className='flex items-center justify-between p-3 pl-4 active:bg-neutral-50/75 rounded-md transition-colors'
		>
			<p
				className={`${
					item.isDestructive ? 'text-rose-600' : 'text-neutral-900'
				} flex-1 text-start overflow-x-hidden whitespace-nowrap text-ellipsis font-header`}
			>
				{item.label}
			</p>
			<button className={`${item.isDestructive ? 'text-rose-400' : 'text-neutral-500'} shrink-0`}>
				{item.icon && <Icon strokeWidth={2.5} />}
			</button>
		</li>
	)
}
