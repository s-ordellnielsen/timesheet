import { useState } from 'react'
import isFunction from '../utils/is-function'

export default function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.log(error)

			return initialValue
		}
	})

	const setValue = value => {
		try {
			let newValue = value

			if (isFunction(value)) {
				newValue = value(storedValue)
			}

			setStoredValue(newValue)

			window.localStorage.setItem(key, JSON.stringify(newValue))
		} catch (error) {
			console.log(error)
		}
	}
	return [storedValue, setValue]
}
