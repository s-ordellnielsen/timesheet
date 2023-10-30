import { createContext } from 'react'
import useLocalStorage from '../hooks/use-local-storage'

const JobsContext = createContext()
export default JobsContext

export function JobsProvider({ children }) {
	const [jobs, setJobs] = useLocalStorage('jobs', [])

	return <JobsContext.Provider value={[jobs, setJobs]}>{children}</JobsContext.Provider>
}
