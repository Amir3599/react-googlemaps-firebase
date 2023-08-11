import { collection, getDocsFromServer, getDocsFromCache } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { ParcellsType, PricingDataBody, PricingDataRes } from '../../common/types'
import { getFunctions, httpsCallable } from 'firebase/functions'

export const getParcells: () => Promise<ParcellsType[] | []> = async () => {
    const ids: string[] = []
    const data: any[] = []


    await getDocsFromCache(collection(db, "bearerParcels")).then((snapShot) => {
        if (!snapShot.empty) {
            snapShot.forEach((res) => {
                if (!ids.includes(res.id)) {
                    data.push(res.data())
                    ids.push(res.id)
                }
            })
            return
        }
    })

    await getDocsFromServer(collection(db, "bearerParcels")).then((snapShot) => {

        snapShot.forEach((res) => {
            if (!ids.includes(res.id)) {
                data.push(res.data())
                ids.push(res.id)
            }
        })
    })
    return data
}


export const getPricing = async (data: Partial<PricingDataBody>): Promise<PricingDataRes> => {
    const functions = getFunctions()
    const callPricing = httpsCallable<Partial<PricingDataBody>, PricingDataRes>(functions, 'pricing')
    const res = await callPricing(data).then((res) => res.data)
    return res
}