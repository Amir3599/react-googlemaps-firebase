import React from 'react'
import { ParcellsType } from '../../../../../../common/types'
import { ImageDisplay } from '../../../../../../components'

interface props {
    parcell: ParcellsType
}

function ParcellCard({ parcell }: props) {

    return (
        <div className="flex justify-between items-center px-4 py-2">
            <div className='flex items-center gap-x-2'>
                <div className='p-1 w-16 h-16 bg-slate-200 flex items-center justify-center'>
                    <ImageDisplay imageName={parcell.parcel_img_url} />
                </div>
                <p>{parcell.parcel_type}</p>
            </div>
            <p className='text-xs text-center'>
                {parcell.parcel_min_weight} - {parcell.parcel_max_weight} kg max
                <br />
                {parcell.parcel_description}
            </p>
        </div>
    )
}

export default ParcellCard