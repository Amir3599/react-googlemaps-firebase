import React, { useEffect, useState } from 'react'
import { getURL } from '../../../firebase/storage';
import { Img } from 'react-image';
import ImageLoader from '../ImageLoader/ImageLoader';

interface ImageDisplayProps {
    imageName: string; //img name from firebase api's
    className?: string
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageName, className }) => {

    const [imgUrl, setImgUrl] = useState<string>('')

    // convert image name to readeable url
    useEffect(() => {
        getURL(imageName)
            .then(setImgUrl)
            .catch((err) => console.log(err))
    }, [imageName])


    return (
        <Img src={imgUrl}
            className={className}
            loader={<ImageLoader />}
            alt=""
        />
    )
}

export default ImageDisplay