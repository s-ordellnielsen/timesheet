import DropdownItem from './dropdown-item'

export default function DropdownGroup({ items }) {
	return (
		<ul className='p-1 flex flex-col gap-1'>
			{items.map(item => (
				<DropdownItem key={item.label} item={item} />
			))}
		</ul>
	)
}
