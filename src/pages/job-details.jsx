import { useParams } from 'react-router-dom'
import useLocalStorage from '../hooks/use-local-storage'
import SetupDialog from '../sections/job-details/setup-dialog'

export default function JobDetails() {
	const { id } = useParams()
	const [jobDetails, setJobDetails] = useLocalStorage('timesheet-job-' + id, {})

	return (
		<div>
			<SetupDialog />
		</div>
	)
}
