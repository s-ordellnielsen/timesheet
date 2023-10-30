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
		console.log(value)
		try {
			let newValue = value

			if (isFunction(value)) {
				console.log(value(storedValue))
				newValue = value(storedValue)
			}

			setStoredValue(value)

			window.localStorage.setItem(key, JSON.stringify(newValue))

			console.log(window.localStorage.getItem(key))
		} catch (error) {
			console.log(error)
		}
	}
	return [storedValue, setValue]
}
