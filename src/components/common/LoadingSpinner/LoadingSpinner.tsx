import React from 'react'
import { Oval } from 'react-loader-spinner'

function LoadingSpinner() {
    return (
        <div
            className='fixed top-0 left-0 right-0 bottom-0 z-[999] bg-black/50 flex justify-center items-center'
            onClick={(e) => e.stopPropagation()}
        >
            <Oval
                height={80}
                width={80}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffffffbb"
                strokeWidth={4}
                strokeWidthSecondary={4}
            />
        </div>
    )
}

export default LoadingSpinner