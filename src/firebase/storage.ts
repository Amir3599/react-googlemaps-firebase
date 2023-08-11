import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export const getURL = async (imgName: string): Promise<string> => {
    try {
        const imgRef = ref(storage, imgName)
        const url = await getDownloadURL(imgRef)
        return url
    } catch (err) {
        throw err
    }
}

