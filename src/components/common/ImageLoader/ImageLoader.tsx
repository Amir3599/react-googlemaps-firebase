import React from 'react'
import { Audio } from 'react-loader-spinner'

function ImageLoader() {
    return (
        <Audio
            height="50"
            width="50"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default ImageLoader