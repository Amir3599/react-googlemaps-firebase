/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react'

// project imports
import Loader from '../loader/Loader'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: any) =>
	function (props: any) {
		return (
			<Suspense fallback={<Loader />}>
				<Component {...props} />
			</Suspense>
		)
	}

export default Loadable
