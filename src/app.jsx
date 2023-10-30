import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'
import Layout from './layout'
import 'cal-sans'
import PageLoader from './components/loaders/page-loader'
import { JobsProvider } from './contexts/jobs-provider'

const Home = React.lazy(() => import('./pages/home'))
const Settings = React.lazy(() => import('./pages/settings'))
const HelpCenter = React.lazy(() => import('./pages/help-center'))

function App() {
	const router = createBrowserRouter([
		{
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/settings',
					element: <Settings />,
				},
				{
					path: '/help',
					element: <HelpCenter />,
				},
			],
		},
	])

	return (
		<JobsProvider>
			<Suspense fallback={<PageLoader />}>
				<RouterProvider router={router} />
			</Suspense>
			{/* <PageLoader /> */}
		</JobsProvider>
	)
}

export default App

// slate *** *** *** *** *** ***

// bg-slate-50
// bg-slate-100
// bg-slate-200
// bg-slate-300
// bg-slate-400
// bg-slate-500
// bg-slate-600
// bg-slate-700
// bg-slate-800
// bg-slate-900
// bg-slate-950

// text-slate-50
// text-slate-100
// text-slate-200
// text-slate-300
// text-slate-400
// text-slate-500
// text-slate-600
// text-slate-700
// text-slate-800
// text-slate-900
// text-slate-950

// border-slate-50
// border-slate-100
// border-slate-200
// border-slate-300
// border-slate-400
// border-slate-500
// border-slate-600
// border-slate-700
// border-slate-800
// border-slate-900
// border-slate-950

// neutral *** *** *** *** *** ***

// bg-neutral-50
// bg-neutral-100
// bg-neutral-200
// bg-neutral-300
// bg-neutral-400
// bg-neutral-500
// bg-neutral-600
// bg-neutral-700
// bg-neutral-800
// bg-neutral-900
// bg-neutral-950

// text-neutral-50
// text-neutral-100
// text-neutral-200
// text-neutral-300
// text-neutral-400
// text-neutral-500
// text-neutral-600
// text-neutral-700
// text-neutral-800
// text-neutral-900
// text-neutral-950

// border-neutral-50
// border-neutral-100
// border-neutral-200
// border-neutral-300
// border-neutral-400
// border-neutral-500
// border-neutral-600
// border-neutral-700
// border-neutral-800
// border-neutral-900
// border-neutral-950
