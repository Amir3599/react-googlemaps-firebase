// material-ui
import React from 'react'
import LinearProgressBar from '../LinearProgressBar/LinearProgressBar'

// ==============================|| LOADER ||============================== //
function Loader() {
	return (
		<div className='fixed top-0 left-0 z-[1301] w-full'>
			<LinearProgressBar />
		</div>
	)
}

export default Loader
