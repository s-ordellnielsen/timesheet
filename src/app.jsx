import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'
import Layout from './layout'

const Home = React.lazy(() => import('./pages/home'))

function App() {
	const router = createBrowserRouter([
		{
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	])

	return (
		<>
			<Suspense fallback={<p>Vent et øjeblik</p>}>
				<RouterProvider router={router} />
			</Suspense>
		</>
	)
}

export default App
