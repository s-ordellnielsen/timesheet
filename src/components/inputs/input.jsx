import { useState } from 'react'

export default function Input({ value, setValue, type, label, updateOnChange, ...props }) {
	const [tempValue, setTempValue] = useState(value)

	return (
		<label>
			{label && <p>{label}</p>}
			<div className='flex bg-neutral-50 rounded-lg p-3 light-interactive-elm'>
				<input
					className='flex-1 bg-transparent focus:outline-none'
					type={type || 'text'}
					value={tempValue}
					onChange={e => {
						setTempValue(e.target.value)
						if (updateOnChange) {
							setValue(e.target.value)
						}
					}}
					onBlur={() => setValue(tempValue)}
					{...props}
				/>
			</div>
		</label>
	)
}
